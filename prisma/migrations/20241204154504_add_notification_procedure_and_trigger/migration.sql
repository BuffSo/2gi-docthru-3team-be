-- ===========================================
-- 알림 시스템을 위한 저장 프로시저 및 트리거
-- ===========================================

-- 저장 프로시저 정의
-- ==========================================================================================
-- 저장 프로시저: notify_user_change
-- 설명: 사용자의 작업물, 챌린지, 피드백이 변경되었을 때 알림을 생성합니다.
-- 파라미터:
--   user_id: 알림을 받을 사용자 ID
--   act_user_id: 액션을 수행한 사용자 ID (관리자 수행시 null)
--   action_table: 액션이 일어난 테이블명
--   action_type: 액션의 종류(생성, 수정, 삭제)
--   message: 알림 기본 내용(필요에 따라 커스터마이징하여 사용)
--   challenge_id: 관련 챌린지 ID (옵셔널)
--   work_id: 관련 작업물 ID (옵셔널)
--   feedback_id: 관련 피드백 ID (옵셔널)
-- ==========================================================================================

-- -----------------------------------------------
-- 1. 알림 생성 저장 프로시저: notify_user_change
-- -----------------------------------------------
CREATE OR REPLACE PROCEDURE notify_user_change(
    user_id INT,      -- 알림을 받을 사용자 ID
    act_user_id INT,  -- 액션을 수행한 사용자 ID (NULL 가능)
    action_table TEXT,
    action_type TEXT,
    message TEXT,
    challenge_id INT DEFAULT NULL,
    work_id INT DEFAULT NULL,
    feedback_id INT DEFAULT NULL
)
LANGUAGE plpgsql AS $$
BEGIN
    INSERT INTO "Notification" (
        "userId", "actUserId", "actionTable", "action", "message", "isRead", "createdAt", "challengeId", "workId", "feedbackId"
    ) VALUES (
        user_id, act_user_id, action_table, action_type, message, FALSE, NOW(), challenge_id, work_id, feedback_id
    );
END;
$$;


-- -------------------------------------------
-- 2. 챌린지 상태 변경 알림
-- -------------------------------------------

-- 2-1. 챌린지 상태 변경 저장 프로시저
CREATE OR REPLACE PROCEDURE notify_challenge_status(
    application_id INT
)
LANGUAGE plpgsql AS $$
DECLARE
    action_table TEXT := 'Challenge';
    action_type TEXT;
    act_user_id INT := NULL; -- 관리자 수행시 NULL
    user_id INT;             -- 알림을 받을 사용자 ID
    notification_message TEXT;
    challenge_id INT;
    app_status "Status";
    challenge_title TEXT;
    invalidation_comment TEXT; -- 삭제/거절 사유
BEGIN
    -- 신청 정보 가져오기
    SELECT "userId", "challengeId", "status", "invalidationComment"
    INTO user_id, challenge_id, app_status, invalidation_comment
    FROM "Application"
    WHERE id = application_id;

    IF user_id IS NULL OR challenge_id IS NULL THEN
        RETURN; -- 데이터가 부족하면 종료
    END IF;

    -- 챌린지 제목 가져오기
    SELECT "title" INTO challenge_title FROM "Challenge" WHERE id = challenge_id;
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- 상태에 따른 알림 메시지 생성
    CASE app_status
        WHEN 'Accepted' THEN
            action_type := '승인';
            notification_message := '"' || challenge_title || '" 챌린지가 승인되었습니다.';
        WHEN 'Rejected' THEN
            action_type := '거절';
            notification_message := '"' || challenge_title || '" 챌린지가 거절되었습니다.';
            IF invalidation_comment IS NOT NULL AND invalidation_comment <> '' THEN
                notification_message := notification_message || ' [거절 사유] ' || invalidation_comment;
            END IF;
        WHEN 'Invalidated' THEN
            action_type := '삭제';
            notification_message := '"' || challenge_title || '" 챌린지가 삭제되었습니다.';
            IF invalidation_comment IS NOT NULL AND invalidation_comment <> '' THEN
                notification_message := notification_message || ' [삭제 사유] ' || invalidation_comment;
            END IF;
        ELSE
            RETURN; -- 처리할 상태가 아니면 종료
    END CASE;

    -- 알림 생성
    CALL notify_user_change(
        user_id,
        act_user_id,
        action_table,
        action_type,
        notification_message,
        challenge_id,
        NULL,
        NULL
    );
END;
$$;

-- 2-2. 챌린지 상태 변경 트리거 함수
CREATE OR REPLACE FUNCTION application_status_update_notification()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW."status" IS DISTINCT FROM OLD."status" THEN
        CALL notify_challenge_status(NEW.id);
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2-3. 챌린지 상태 변경 트리거 생성
DROP TRIGGER IF EXISTS application_status_update_trigger ON "Application";
CREATE TRIGGER application_status_update_trigger
AFTER UPDATE ON "Application"
FOR EACH ROW
EXECUTE FUNCTION application_status_update_notification();


-- -------------------------------------------
-- 3. 챌린지 수정 알림
-- -------------------------------------------

-- 3-1. 챌린지 마감/수정 트리거 함수 생성
CREATE OR REPLACE FUNCTION challenge_update_and_close_notification()
RETURNS TRIGGER AS $$
DECLARE
    action_table TEXT := 'Challenge';
    action_type TEXT := '수정';
    notification_message TEXT;
    challenge_title TEXT;
    user_id INT;
    is_deleted BOOLEAN := FALSE; -- 삭제 여부 플래그
BEGIN
    -- 챌린지 제목 가져오기
    SELECT "title" INTO challenge_title FROM "Challenge" WHERE id = NEW.id;
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- 마감 알림
    IF NEW."progress" = FALSE AND OLD."progress" = TRUE THEN
        -- 삭제 여부 확인
        SELECT EXISTS (
            SELECT 1
            FROM "Application"
            WHERE "challengeId" = NEW.id AND "status" = 'Invalidated'
        ) INTO is_deleted;

        -- 알림 메시지 설정
        IF is_deleted THEN
            notification_message := '"' || challenge_title || '" 챌린지가 삭제되었습니다.';
            
            -- 참여자에게만 알림 전송
            FOR user_id IN
                (SELECT "userId" FROM "Participate" WHERE "challengeId" = NEW.id)
            LOOP
                CALL notify_user_change(
                    user_id,
                    NULL,
                    action_table,
                    '삭제',
                    notification_message,
                    NEW.id,
                    NULL,
                    NULL
                );
            END LOOP;
        ELSE
            notification_message := '"' || challenge_title || '" 챌린지가 마감되었습니다.';

            -- 신청자와 참여자에게 알림 전송
            FOR user_id IN
                (SELECT "userId" FROM "Application" WHERE "challengeId" = NEW.id
                 UNION
                 SELECT "userId" FROM "Participate" WHERE "challengeId" = NEW.id)
            LOOP
                CALL notify_user_change(
                    user_id,
                    NULL,
                    action_table,
                    '마감',
                    notification_message,
                    NEW.id,
                    NULL,
                    NULL
                );
            END LOOP;
        END IF;

    -- 수정 알림
    ELSEIF NEW."title" IS DISTINCT FROM OLD."title" OR
           NEW."description" IS DISTINCT FROM OLD."description" THEN
        notification_message := '"' || challenge_title || '" 챌린지의 내용이 수정되었습니다.';

        -- 신청자와 참여자에게 알림 전송
        FOR user_id IN
            (SELECT "userId" FROM "Application" WHERE "challengeId" = NEW.id
                UNION
                SELECT "userId" FROM "Participate" WHERE "challengeId" = NEW.id)

        LOOP
            CALL notify_user_change(
                user_id,
                NULL,
                action_table,
                action_type,
                notification_message,
                NEW.id,
                NULL,
                NULL
            );
        END LOOP;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 3-2. 챌린지 마감/수정 트리거 생성
DROP TRIGGER IF EXISTS challenge_update_and_close_trigger ON "Challenge";
CREATE TRIGGER challenge_update_and_close_trigger
AFTER UPDATE ON "Challenge"
FOR EACH ROW
EXECUTE FUNCTION challenge_update_and_close_notification();


-- -------------------------------------------
-- 4. 새로운 작업물  추가 알림 
-- -------------------------------------------

-- 4-1. 새로운 작업물 알림 저장 프로시저
CREATE OR REPLACE PROCEDURE notify_new_work(
    challenge_id INT,
    new_work_id  INT,
    act_user_id  INT,  -- 작업물을 생성한 사용자 ID
    work_action_msg  TEXT  -- 작업 유형: '생성' 또는 '제출'
)
LANGUAGE plpgsql AS $$
DECLARE
    action_table TEXT := 'Work';
    action_type TEXT := '생성';
    user_id INT;      -- 알림을 받을 사용자 ID
    notification_message TEXT;
    challenge_title TEXT;
BEGIN
    -- 챌린지 제목 가져오기 (NULL 처리 추가)
    SELECT "title" INTO challenge_title FROM "Challenge" WHERE id = challenge_id;
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- 신청자 ID 가져오기
    SELECT "userId" INTO user_id
    FROM "Application"
    WHERE "challengeId" = challenge_id;

    -- 신청자가 없는 경우 종료
    IF user_id IS NULL THEN
        RETURN;
    END IF;

    -- 알림 메시지 구성
    IF work_action_msg = '생성' THEN
        notification_message := '"' || challenge_title || '"에 작업물(참가자)이 생성되었습니다.';
    ELSE
        notification_message := '"' || challenge_title || '"에 작업물이 ' || work_action_msg || '되었습니다.';
    END IF;

    -- 알림 생성
    CALL notify_user_change(
        user_id,
        act_user_id,
        action_table,
        action_type,
        notification_message,
        challenge_id,
        new_work_id,
        NULL
    );

END;
$$;

-- 4-2. 새로운 작업물 추가 트리거 함수
CREATE OR REPLACE FUNCTION new_work_notification()
RETURNS TRIGGER AS $$
DECLARE
    work_action_msg TEXT;
BEGIN
    -- 작업 유형 판단
    IF OLD."isSubmitted" = FALSE AND NEW."isSubmitted" = TRUE THEN
        work_action_msg := '제출';
    ELSE
        work_action_msg := '생성';      -- 생성만 있을 듯
    END IF;

    -- 저장 프로시저 호출
    CALL notify_new_work(NEW."challengeId", NEW.id, NEW."userId", work_action_msg);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- 4-3. 새로운 작업물 추가 트리거 생성
DROP TRIGGER IF EXISTS new_work_insert_trigger ON "Work";
CREATE TRIGGER new_work_insert_trigger
AFTER INSERT ON "Work"
FOR EACH ROW
EXECUTE FUNCTION new_work_notification();



-- -------------------------------------------
-- 5. 임시 트리거 및 함수
-- -------------------------------------------

CREATE OR REPLACE FUNCTION handle_work_delete()
RETURNS TRIGGER AS $$
BEGIN
    -- Notification 테이블의 workId를 NULL로 설정
    UPDATE "Notification"
    SET "workId" = NULL
    WHERE "workId" = OLD.id;

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS work_delete_trigger ON "Work";

CREATE TRIGGER work_delete_trigger
BEFORE DELETE ON "Work"
FOR EACH ROW
EXECUTE FUNCTION handle_work_delete();


-- -------------------------------------------
-- 5. 작업물 (수정/삭제) 트리거 및 함수
-- -------------------------------------------

-- 5-1. 작업물 수정 시 알림 트리거 함수
CREATE OR REPLACE FUNCTION work_update_notification()
RETURNS TRIGGER AS $$
DECLARE
    action_table TEXT := 'Work';
    action_type TEXT := '수정';
    act_user_id INT;  -- 액션을 수행한 사용자 ID
    user_id INT;      -- 알림을 받을 사용자 ID
    notification_message TEXT;
    challenge_title TEXT;
BEGIN
    act_user_id := NEW."userId";  -- 액션을 수행한 사용자 ID
    user_id := NEW."userId";      -- 작업물 작성자 (기본적으로 알림 받을 사용자)

    -- 챌린지 제목 가져오기 (NULL 처리 추가)
    SELECT "title" INTO challenge_title FROM "Challenge" WHERE id = NEW."challengeId";
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- isSubmitted 상태 변경 여부 확인
    IF OLD."isSubmitted" = FALSE AND NEW."isSubmitted" = TRUE THEN
        -- 작업물이 제출된 경우: 챌린지 신청자에게 알림 전송
        SELECT "userId" INTO user_id FROM "Application" WHERE "challengeId" = NEW."challengeId";
        notification_message := '"' || challenge_title || '"에 작업물이 제출되었습니다.';
        CALL notify_user_change(
            user_id,
            act_user_id,
            action_table,
            '제출',  -- 제출 액션
            notification_message,
            NEW."challengeId",
            NEW.id,
            NULL
        );
    ELSE
        -- 일반적인 수정인 경우: 작업물 작성자에게 알림 전송
        notification_message := '"' || challenge_title || '"의 작업물이 수정되었습니다.';
        CALL notify_user_change(
            user_id,
            act_user_id,
            action_table,
            action_type,  -- 수정 액션
            notification_message,
            NEW."challengeId",
            NEW.id,
            NULL
        );
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 5-2. 작업물 수정 트리거 생성
DROP TRIGGER IF EXISTS work_update_trigger ON "Work";
CREATE TRIGGER work_update_trigger
AFTER UPDATE ON "Work"
FOR EACH ROW
WHEN (OLD."content" IS DISTINCT FROM NEW."content")
EXECUTE FUNCTION work_update_notification();

-- 5-3. 작업물 삭제 시 알림 트리거 함수
CREATE OR REPLACE FUNCTION work_delete_notification()
RETURNS TRIGGER AS $$
DECLARE
    action_table TEXT := 'Work';
    action_type TEXT := '삭제';
    act_user_id INT;  -- 액션을 수행한 사용자 ID
    user_id INT;      -- 알림을 받을 사용자 ID
    notification_message TEXT;
    challenge_title TEXT;
    reason  TEXT;   -- 사유 (WorkLog.message)
BEGIN
    act_user_id := OLD."userId";  -- 액션을 수행한 사용자 ID
    user_id := OLD."userId";      -- 작업물 작성자 (알림을 받을 사용자)

    -- 챌린지 제목 가져오기 (NULL 처리 추가)
    SELECT "title" INTO challenge_title FROM "Challenge" WHERE id = OLD."challengeId";
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- Feedback 삭제
    DELETE FROM "Feedback"
    WHERE "workId" = OLD.id;

    -- 삭제 사유 가져오기 (WorkLog.message)
    SELECT "message" INTO reason 
    FROM "WorkLog" 
    WHERE "workId" = OLD.id AND "action" = 'Delete'
    ORDER BY "createdAt" DESC 
    LIMIT 1;  -- 최신 삭제 로그 가져오기    

    -- 알림 메시지 구성
    IF reason IS NOT NULL THEN
        notification_message := '"' || challenge_title || '"의 작업물이 삭제되었습니다. [삭제 사유] ' || reason;
    ELSE
        notification_message := '"' || challenge_title || '"의 작업물이 삭제되었습니다.';
    END IF;

    -- 알림 생성
    CALL notify_user_change(
        user_id,
        act_user_id,
        action_table,
        action_type,
        notification_message,
        OLD."challengeId",
        OLD.id,
        NULL
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 5-4. 작업물 삭제 트리거 생성
DROP TRIGGER IF EXISTS work_delete_trigger ON "Work";
CREATE TRIGGER work_delete_trigger
BEFORE DELETE ON "Work"                    
FOR EACH ROW
EXECUTE FUNCTION work_delete_notification();


-- -------------------------------------------
-- 6. 새로운 피드백 추가 알림
-- -------------------------------------------

-- 6-1. 새로운 피드백 알림 저장 프로시저
CREATE OR REPLACE PROCEDURE notify_new_feedback(
    feedback_id INT
)
LANGUAGE plpgsql AS $$
DECLARE
    action_table TEXT := 'Feedback';
    action_type TEXT := '생성';
    act_user_id INT;  -- 액션을 수행한 사용자 ID
    user_id INT;      -- 알림을 받을 사용자 ID
    notification_message TEXT;
    work_id INT;
    challenge_id INT;
    challenge_title TEXT;
BEGIN
    -- 피드백 및 작업물 정보 가져오기 (NULL 처리 추가)
    SELECT "userId", "workId" INTO act_user_id, work_id FROM "Feedback" WHERE id = feedback_id;
    IF act_user_id IS NULL OR work_id IS NULL THEN
        RETURN;  -- 필요한 정보가 없으면 종료
    END IF;

    SELECT "userId", "challengeId" INTO user_id, challenge_id FROM "Work" WHERE id = work_id;
    IF user_id IS NULL OR challenge_id IS NULL THEN
        RETURN;  -- 필요한 정보가 없으면 종료
    END IF;

    -- 챌린지 제목 가져오기 (NULL 처리 추가)
    SELECT "title" INTO challenge_title FROM "Challenge" WHERE id = challenge_id;
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- 알림 메시지 구성
    notification_message := '"' || challenge_title || '"의 작업물에 새로운 피드백이 추가되었습니다.';

    -- 알림 생성
    CALL notify_user_change(
        user_id,
        act_user_id,
        action_table,
        action_type,
        notification_message,
        challenge_id,
        work_id,
        feedback_id
    );
END;
$$;

-- 6-2. 새로운 피드백 추가 트리거 함수
CREATE OR REPLACE FUNCTION new_feedback_notification()
RETURNS TRIGGER AS $$
BEGIN
    CALL notify_new_feedback(NEW.id);
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6-3. 새로운 피드백 추가 트리거 생성
DROP TRIGGER IF EXISTS new_feedback_insert_trigger ON "Feedback";
CREATE TRIGGER new_feedback_insert_trigger
AFTER INSERT ON "Feedback"
FOR EACH ROW
EXECUTE FUNCTION new_feedback_notification();

-- -------------------------------------------
-- 7. 피드백 관련 트리거 및 함수 (수정/삭제)
-- -------------------------------------------

-- 7-1. 피드백 수정 시 알림 트리거 함수
CREATE OR REPLACE FUNCTION feedback_update_notification()
RETURNS TRIGGER AS $$
DECLARE
    action_table TEXT := 'Feedback';
    action_type TEXT := '수정';
    act_user_id INT;  -- 액션을 수행한 사용자 ID
    user_id INT;      -- 알림을 받을 사용자 ID
    notification_message TEXT;
    challenge_title TEXT;
    work_id INT;
BEGIN
    act_user_id := NEW."userId";  -- 액션을 수행한 사용자 ID
    user_id := NEW."userId";      -- 알림 대상은 피드백 작성자
    work_id := NEW."workId";

    -- 챌린지 제목 가져오기 (NULL 처리 추가)
    SELECT "title" INTO challenge_title FROM "Challenge"
    WHERE id = (SELECT "challengeId" FROM "Work" WHERE id = work_id);
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- 알림 메시지 구성
    notification_message := '"' || challenge_title || '"의 피드백이 수정되었습니다.';

    -- 알림 생성
    CALL notify_user_change(
        user_id,
        act_user_id,
        action_table,
        action_type,
        notification_message,
        NULL,
        work_id,
        NEW.id
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 7-2. 피드백 수정 트리거 생성
DROP TRIGGER IF EXISTS feedback_update_trigger ON "Feedback";
CREATE TRIGGER feedback_update_trigger
AFTER UPDATE ON "Feedback"
FOR EACH ROW
WHEN (OLD."content" IS DISTINCT FROM NEW."content")
EXECUTE FUNCTION feedback_update_notification();


-- 7-3. 피드백 삭제 시 알림 트리거 함수
CREATE OR REPLACE FUNCTION feedback_delete_notification()
RETURNS TRIGGER AS $$
DECLARE
    action_table TEXT := 'Feedback';
    action_type TEXT := '삭제';
    act_user_id INT;  -- 액션을 수행한 사용자 ID
    user_id INT;      -- 알림을 받을 사용자 ID (피드백 작성자)
    notification_message TEXT;
    challenge_title TEXT;
    cached_work_id INT;
    cached_challenge_id INT;
BEGIN
    act_user_id := OLD."userId";  -- 액션을 수행한 사용자 ID
    user_id := OLD."userId";      -- 알림 대상자를 피드백 작성자로 설정
    cached_work_id := OLD."workId"; 

    -- ChallengeId와 Challenge Title 가져오기
    SELECT "challengeId",
           (SELECT "title" FROM "Challenge" WHERE id = "challengeId") AS challenge_title
    INTO cached_challenge_id, challenge_title
    FROM "Work"
    WHERE id = cached_work_id;

    -- 기본값 설정
    IF challenge_title IS NULL THEN
        challenge_title := '알 수 없는 챌린지';
    END IF;

    -- 알림 메시지 구성
    notification_message := '"' || challenge_title || '"의 피드백이 삭제되었습니다.';

    -- 알림 생성
    CALL notify_user_change(
        user_id,             -- 피드백 작성자에게 알림 전송
        act_user_id,
        action_table,
        action_type,
        notification_message,
        cached_challenge_id,
        cached_work_id,
        OLD.id
    );

    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 7-4. 피드백 삭제 트리거 생성
DROP TRIGGER IF EXISTS feedback_delete_trigger ON "Feedback";
CREATE TRIGGER feedback_delete_trigger
BEFORE DELETE ON "Feedback"
FOR EACH ROW
EXECUTE FUNCTION feedback_delete_notification();

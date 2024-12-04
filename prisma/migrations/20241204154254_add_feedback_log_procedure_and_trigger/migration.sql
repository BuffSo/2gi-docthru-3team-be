-- 저장 프로시저 정의
-- ==========================================================================================
-- 저장 프로시저: log_feedback_action
-- 설명: 피드백의 생성, 수정, 삭제 시 로그를 기록하기 위한 저장 프로시저입니다.
-- 파라미터:
--   feedback_id: 피드백 ID
--   work_id: 작업물 ID
--   challenge_id: 챌린지 ID (NULL 가능)
--   user_id: 사용자 ID
--   user_email: 사용자 이메일
--   role: 역할 (Admin/User)
--   action: 작업 유형 (Create/Update/Delete)
--   prev_content: 이전 피드백 내용
--   curr_content: 현재 피드백 내용
--   log_message: 로그 메시지
-- ==========================================================================================

CREATE OR REPLACE PROCEDURE log_feedback_action(
    feedback_id INT, 
    work_id INT,
    challenge_id INT,
    user_id INT,
    user_email TEXT,
    role "Role",
    action "FeedbackAction",    -- 작업 유형 (Create/Update/Delete)
    prev_content TEXT,
    curr_content TEXT,
    log_message TEXT
)
LANGUAGE plpgsql AS $$
BEGIN
    -- FeedbackLog 테이블에 로그 삽입
    INSERT INTO "FeedbackLog" (
        "feedbackId", "workId", "challengeId", "userId", "email", "role", "action",
        "previousContent", "currentContent", "message", "createdAt"
    )
    VALUES (
        feedback_id, 
        work_id, 
        challenge_id,
        user_id, 
        user_email, 
        role,                     
        action,                  
        prev_content, 
        curr_content, 
        log_message, 
        now()
    );
END;
$$;

-- 트리거 함수 정의: 피드백 생성 시 호출
CREATE OR REPLACE FUNCTION log_feedback_create()
RETURNS TRIGGER AS $$
DECLARE
    challenge_id INT;
    user_email TEXT;
    user_role "Role";
BEGIN
    -- Work 테이블에서 challengeId 가져오기
    SELECT "challengeId" INTO challenge_id FROM "Work" WHERE id = NEW."workId";
    -- User 테이블에서 email과 role 가져오기
    SELECT "email", "role" INTO user_email, user_role FROM "User" WHERE id = NEW."userId";

    -- 로그 저장 프로시저 호출
    CALL log_feedback_action(
        NEW."id",
        NEW."workId",
        challenge_id,
        NEW."userId",
        user_email,
        user_role,
        'Create'::"FeedbackAction",
        NULL,
        NEW."content",
        '새로운 피드백이 생성되었습니다.'            -- 로그 메시지
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 함수 정의: 피드백 수정 시 호출
CREATE OR REPLACE FUNCTION log_feedback_update()
RETURNS TRIGGER AS $$
DECLARE
    challenge_id INT;
    user_email TEXT;
    user_role "Role";
BEGIN
    -- Work 테이블에서 challengeId 가져오기
    SELECT "challengeId" INTO challenge_id FROM "Work" WHERE id = OLD."workId";
    -- User 테이블에서 email과 role 가져오기
    SELECT "email", "role" INTO user_email, user_role FROM "User" WHERE id = OLD."userId";

    -- 로그 저장 프로시저 호출
    CALL log_feedback_action(
        OLD."id",
        OLD."workId",
        challenge_id,
        OLD."userId",
        user_email,
        user_role,
        'Update'::"FeedbackAction",
        OLD."content",
        NEW."content",
        '피드백이 수정되었습니다.'                  -- 로그 메시지
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 트리거 함수 정의: 피드백 삭제 시 호출
CREATE OR REPLACE FUNCTION log_feedback_delete()
RETURNS TRIGGER AS $$
DECLARE
    challenge_id INT;
    user_email TEXT;
    user_role "Role";
BEGIN
    -- Work 테이블에서 challengeId 가져오기
    SELECT "challengeId" INTO challenge_id FROM "Work" WHERE id = OLD."workId";
    -- User 테이블에서 email과 role 가져오기
    SELECT "email", "role" INTO user_email, user_role FROM "User" WHERE id = OLD."userId";

    -- 로그 저장 프로시저 호출
    CALL log_feedback_action(
        OLD."id",
        OLD."workId",
        challenge_id,
        OLD."userId",
        user_email,
        user_role,
        'Delete'::"FeedbackAction",
        OLD."content",
        NULL,
        '피드백이 삭제되었습니다.'                  -- 로그 메시지
    );
    RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- 기존 트리거 삭제 (중복 방지)
DROP TRIGGER IF EXISTS feedback_create_trigger ON "Feedback";
DROP TRIGGER IF EXISTS feedback_update_trigger ON "Feedback";
DROP TRIGGER IF EXISTS feedback_delete_trigger ON "Feedback";

-- 트리거 생성: 피드백 생성 시 로그 기록
CREATE TRIGGER feedback_create_trigger
AFTER INSERT ON "Feedback"
FOR EACH ROW
EXECUTE FUNCTION log_feedback_create();

-- 트리거 생성: 피드백 수정 시 로그 기록
CREATE TRIGGER feedback_update_trigger
AFTER UPDATE ON "Feedback"
FOR EACH ROW
EXECUTE FUNCTION log_feedback_update();

-- 트리거 생성: 피드백 삭제 시 로그 기록
CREATE TRIGGER feedback_delete_trigger
BEFORE DELETE ON "Feedback"
FOR EACH ROW
EXECUTE FUNCTION log_feedback_delete();

-- 저장 프로시저 정의
-- ==========================================================================================
-- 저장 프로시저: update_user_grade_sp
-- 설명: 주어진 user_id를 기반으로 해당 사용자의 등급(grade)을 업데이트합니다.
-- 조건:
--   1. 챌린지 참여(Participate)가 10회 이상이거나, 추천(Like)이 10회 이상일 경우 'Expert'
--   2. 챌린지 참여가 5회 이상이고 추천이 5회 이상일 경우 'Expert'
--   3. 위 조건에 해당하지 않으면 'Amateur'
-- ==========================================================================================

CREATE OR REPLACE PROCEDURE update_user_grade_sp(user_id INT)
LANGUAGE plpgsql AS $$
BEGIN
    -- 사용자 등급(grade)을 업데이트
    UPDATE "User"
    SET grade = CASE
        -- 조건 1: 챌린지 참여가 10회 이상이거나 추천 선정이 10회 이상일 경우 Expert
        WHEN (SELECT COUNT(*) 
              FROM "Participate" 
              WHERE "userId" = user_id) >= 10
          OR (SELECT COUNT(*) 
              FROM "Like" l 
              JOIN "Work" w ON l."workId" = w."id"
              WHERE w."userId" = user_id) >= 10
          THEN 'Expert'::"Grade"

        -- 조건 2: 챌린지 참여가 5회 이상이고 추천 선정이 5회 이상일 경우 Expert
        WHEN (SELECT COUNT(*) 
              FROM "Participate" 
              WHERE "userId" = user_id) >= 5
          AND (SELECT COUNT(*) 
               FROM "Like" l 
               JOIN "Work" w ON l."workId" = w."id"
               WHERE w."userId" = user_id) >= 5
          THEN 'Expert'::"Grade"

        -- 기본 등급: Amateur
        ELSE 'Amateur'::"Grade"
    END
    -- 해당 user_id에 대해서만 업데이트
    WHERE id = user_id;
END;
$$;


-- 트리거 함수 정의
CREATE OR REPLACE FUNCTION update_user_grade_trigger()
RETURNS TRIGGER AS $$
BEGIN
    CALL update_user_grade_sp(COALESCE(NEW."userId", OLD."userId"));
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- 기존 트리거 삭제
DROP TRIGGER IF EXISTS user_grade_update_participate ON "Participate";
DROP TRIGGER IF EXISTS user_grade_update_likes ON "Like";

-- 트리거 생성
CREATE TRIGGER user_grade_update_participate
AFTER INSERT OR DELETE OR UPDATE ON "Participate"
FOR EACH ROW
EXECUTE FUNCTION update_user_grade_trigger();

CREATE TRIGGER user_grade_update_likes
AFTER INSERT OR DELETE OR UPDATE ON "Like"
FOR EACH ROW
EXECUTE FUNCTION update_user_grade_trigger();
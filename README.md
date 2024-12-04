# Codeit 풀스택 2기 part3 중급 프로젝트 3팀 - Docthru

팀 협업문서 - [Notion](https://www.notion.so/128e951e3e618064a461c77c319274b2?v=128e951e3e6181e4a1ac000c923e8661)



## 팀원 구성

소재희 (팀장) - https://github.com/BuffSo

신지원 (BE 장) - https://github.com/shinji530

현준배 (BE) - https://github.com/junbaehyun

이강수 (FE 장) - https://github.com/kipid

천우승 (FE) - https://github.com/mingmungXD

김은효 (FE) - https://github.com/kirinkiri

서지우 (FE) - https://github.com/JiwooFS



## 프로젝트 소개

- **개발 문서 번역 챌린지 서비스**

대다수의 개발 시장 콘텐츠가 영어로 작성되어 있어, 영어를 잘하지 못하는 한국인들이 해당 기술을 습득하는데 어려움을 겪고 있습니다.

따라서 개발 관련 영어 문서를 함께 번역하는 챌린지를 진행하고, 번역 작업 에디터에서 번역을 진행하며 번역문에 대한 피드백을 주고받을 수 있는 서비스를 제작합니다.

- 프로젝트 기간: 2024.11.15 ~ 2024.12.9



## 기술 스택

FE: React, Next.js, React Query, React CSS module, Quill, Vercel

BE: Express, Prisma, PostgreSQL, Render

공통 Tool: Git & Github, Discord, Zoom



## 팀원별 구현 기능 상세

- 소재희



- 신지원
#### 소셜 로그인
- 구글 로그인 passport를 활용하여 구현
- 카카오 로그인 passport를 활용하여 구현
- SocialAccount 테이블을 추가하여 어떤 로그인을 사용했는지 구분
- 이메일 및 닉네임 중복 시 로그인 페이지로 리다이렉트

#### 챌린지 파트
- 번역 챌린지 목록 조회 및 상세 조회 구현
- 신규 챌린지 신청 구현
- 챌린지 수정 구현
- 어드민의 챌린지 삭제 구현

#### 신청 파트
- 어드민의 신청한 신규 챌린지 목록 조회 구현
- 신청한 신규 챌린지 상세 조회 구현 
  - 어드민과 회원 계정에 모두 필요
- 신규 챌린지 신청 취소 구현
  - 챌린지를 신청한 회원이 대기 상태의 챌린지 신청 취소


#### 참여 파트
- 번역 챌린지에 참여하는 기능 구현
- 챌린지 원문 조회하는 기능 구현


#### 피드백 파트
- 번역 작업물의 피드백을 조회하는 기능 구현
- 작업물에 대한 피드백 작성하는 기능 구현
- 본인이 작성한 피드백 수정하는 기능 구현
  - 어드민도 수정 가능
- 본인이 작성한 피드백 삭제하는 기능 구현
  - 어드민도 삭제 가능


- 현준배





## 파일 구조

```
├─http
├─node_modules
├─prisma
│  └─migrations
└─src
    ├─config
    │      passport.js
    │      prisma.js
    │
    ├─controllers
    │      applicationController.js
    │      challengeController.js
    │      feedbackController.js
    │      myChallengeController.js
    │      notificationController.js
    │      participationController.js
    │      userController.js
    │      workController.js
    │
    ├─errors
    │      BadRequestError.js
    │      ConflictError.js
    │      CustomError.js
    │      ForbiddenError.js
    │      index.js
    │      NotFoundError.js
    │      UnauthorizedError.js
    │
    ├─middlewares
    │  │  asyncHandler.js
    │  │  authMiddleware.js
    │  │  errorHandler.js
    │  │
    │  └─passport
    │          googleStrategy.js
    │          jwtStrategy.js
    │          kakaoStrategy.js
    │          localStrategy.js
    │
    ├─repositories
    │      applicationRepository.js
    │      challengeRepository.js
    │      feedbackRepository.js
    │      myChallengeRepository.js
    │      notificationRepository.js
    │      participateRepository.js
    │      participationRepository.js
    │      userRepository.js
    │      workLogRepository.js
    │      workRepository.js
    │
    ├─routes
    │      applicationRouter.js
    │      challengeRouter.js
    │      feedbackRouter.js
    │      myChallengeRouter.js
    │      notificationRouter.js
    │      participationRouter.js
    │      userRouter.js
    │      workRouter.js
    │
    ├─services
    │      applicationService.js
    │      challengeService.js
    │      feedbackService.js
    │      myChallengeService.js
    │      notificationService.js
    │      participationService.js
    │      userService.js
    │      workService.js
    │
    └─utils
            formatDate.js
            logger.js
```



## 구현 홈페이지

FE: https://2gi-docthru-3team-fe.vercel.app/

BE: https://twogi-docthru-3team-be.onrender.com

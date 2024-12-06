# Codeit 풀스택 2기 part3 중급 프로젝트 3팀 - Docthru(BE)

## 팀 협업문서
<a href = "https://www.notion.so/128e951e3e618064a461c77c319274b2?v=128e951e3e6181e4a1ac000c923e8661">
    <img src="https://bizlog.me/wp-content/uploads/2021/03/notion-logo.png" width="150">
</a>

## 팀원 구성

| 소재희(팀장) | 신지원 | 이강수 | 천우승 | 김은효 | 서지우 | 현준배 |
|:-----:|:-----:|:-----:|:-----:|:-----:|:-----:|:------:|
| <image src = "https://avatars.githubusercontent.com/u/135010826?v=4" width = 150px> | <image src = "https://avatars.githubusercontent.com/u/80625377?v=4" width = 150px> | <image src = "https://avatars.githubusercontent.com/u/7779295?v=4" width = 150px> | <image src = "https://avatars.githubusercontent.com/u/174844724?v=4" width = 150px> | <image src = "https://avatars.githubusercontent.com/u/176313108?v=4" width = 150px> | <image src = "https://avatars.githubusercontent.com/u/176551801?v=4" width = 150px> | <image src = "https://avatars.githubusercontent.com/u/82556884?v=4" width = 150px> |
| [BuffSo](https://github.com/BuffSo) | [shinji530](https://github.com/shinji530) | [kipid](https://github.com/kipid) | [mingmungXD](https://github.com/mingmungXD)| [kirinkiri](https://github.com/kirinkiri) | [JiwooFS](https://github.com/JiwooFS) | [junbaehyun](https://github.com/junbaehyun) |


## 프로젝트 소개

대다수의 개발 시장 콘텐츠가 영어로 작성되어 있어, 영어에 익숙하지 않은 한국인들이 해당 기술을 습득하는데 어려움을 겪고 있습니다.

따라서 개발 관련 영어 문서를 함께 번역하는 챌린지를 진행하고, 번역 작업 에디터에서 번역을 진행하며 번역문에 대한 피드백을 주고받을 수 있는 개발 문서 번역 챌린지 서비스를 제작합니다.

## 프로젝트 기간

2024.11.15 ~ 2024.12.9



## 기술 스택

### 백엔드

![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-2D3748?style=for-the-badge&logo=prisma&logoColor=white)

### 데이터베이스

![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)


### 협업 방식

![GitHub](https://img.shields.io/badge/GitHub-%23121011?style=for-the-badge&logo=github&logoColor=white)
![Notion](https://img.shields.io/badge/Notion-%23000000?style=for-the-badge&logo=notion&logoColor=white)
![Discord](https://img.shields.io/badge/Discord-%2392a8d1?style=for-the-badge&logo=discord&logoColor=white)
![Zoom](https://img.shields.io/badge/Zoom-%23121841?style=for-the-badge&logo=zoom&logoColor=white)


### 배포
![Render](https://img.shields.io/badge/Render-3D63A3?style=for-the-badge&logo=render&logoColor=white)


## 팀원별 구현 기능 상세 및 담당 업무

### **신지원(BE리더)**

- #### 소셜 로그인

    - 구글 로그인 passport를 활용하여 구현
    - 카카오 로그인 passport를 활용하여 구현
    - SocialAccount 테이블을 추가하여 어떤 로그인을 사용했는지 구분
    - 이메일 및 닉네임 중복 시 로그인 페이지로 리다이렉트

- #### 챌린지 파트

    - 번역 챌린지 목록 조회 및 상세 조회
    - 신규 챌린지 신청
    - 챌린지 수정
    - 어드민의 챌린지 삭제

- #### 신청 파트

    - 어드민의 신청한 신규 챌린지 목록 조회
    - 신청한 신규 챌린지 상세 조회
    - 어드민과 회원 계정에 모두 필요
    - 신규 챌린지 신청 취소
    - 챌린지를 신청한 회원이 대기 상태의 챌린지 신청 취소


- #### 참여 파트

    - 번역 챌린지에 참여하는 기능 구현
    - 챌린지 원문 조회하는 기능 구현


- #### 피드백 파트

    - 번역 작업물의 피드백을 조회
    - 작업물에 대한 피드백 작성
    - 본인이 작성한 피드백 수정
    - 어드민도 수정 가능
    - 본인이 작성한 피드백 삭제
    - 어드민도 삭제 가능

### **소재희**

- #### authorizing

    - 회원가입 기능 구현
    - 로그인, 로그아웃 기능 구현
    - 토큰 갱신

- #### 번역 작업물 파트

    - 번역 작업물 상세 조회
    - 번역 작업물 제출
    - 번역 작업물 수정 (admin)
    - 번역 작업물 삭제 (=챌린지 참여 포기)
    - 번역 작업물에 하트 남기기

- #### 내 챌린지 파트

    - 참여 중인 챌린지 목록 조회
    - 완료한 챌린지 목록 조회
    - 내가 신청한 챌린지 목록 조회

- #### 알림 파트

    - 특정 알림의 읽음 처리
    - 특정 유저의 알림 목록 조회


### **현준배**

- #### 팀 일정 관리

- #### 노션 및 피그마 관리

- #### 내 챌린지 파트

    - 참여 중인 챌린지 목록 조회

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

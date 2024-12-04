export const USER = [
  {
    id: 1,
    role: "User",
    nickname: "nick1",
    email: "User1@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:00:00Z",
    grade: "Amateur"
  },
  {
    id: 2,
    role: "Admin",
    nickname: "nick2",
    email: "User2@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:10:00Z",
    grade: "Expert"
  },
  {
    id: 3,
    role: "User",
    nickname: "nick3",
    email: "User3@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:20:00Z",
    grade: "Amateur"
  },
  {
    id: 4,
    role: "User",
    nickname: "nick4",
    email: "User4@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:30:00Z",
    grade: "Expert"
  },
  {
    id: 5,
    role: "User",
    nickname: "nick5",
    email: "User5@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:40:00Z",
    grade: "Amateur"
  },
  {
    id: 6,
    role: "Admin",
    nickname: "admin",
    email: "admin@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:50:00Z",
    grade: "Expert"
  },
  {
    id: 7,
    role: "User",
    nickname: "nick7",
    email: "User7@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:20:00Z",
    grade: "Amateur"
  },
  {
    id: 8,
    role: "User",
    nickname: "nick8",
    email: "Use8@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:20:00Z",
    grade: "Expert"
  },
  {
    id: 9,
    role: "User",
    nickname: "nick9",
    email: "User9@example.com",
    password: "$2b$10$Y7TYrNUSmGuByoFYa0pHC.qpNVU3/am/OpPMJrE1jgOIT9o9oxw4K",
    createdAt: "2024-11-18T10:20:00Z",
    grade: "Amateur"
  }
];

export const CHALLENGE = [
  {
    id: 1,
    title: "Next.js Workshop",
    field: "Next",
    docType: "Document",
    docUrl: "http://example.com/doc1",
    deadLine: "2024-12-01T23:59:59Z",
    description: "Next.js workshop for beginners.",
    progress: false,
    participants: 0,
    maxParticipants: 5
  },
  {
    id: 2,
    title: "Modern JS Challenge",
    field: "Modern",
    docType: "Blog",
    docUrl: "http://example.com/doc2",
    deadLine: "2024-12-10T23:59:59Z",
    description: "Modern JavaScript challenge for everyone.",
    progress: false,
    participants: 0,
    maxParticipants: 10
  },
  {
    id: 3,
    title: "API Mastery",
    field: "API",
    docType: "Document",
    docUrl: "http://example.com/doc3",
    deadLine: "2024-12-15T23:59:59Z",
    description: "API mastery challenge for developers.",
    progress: false,
    participants: 0,
    maxParticipants: 5
  },
  {
    id: 4,
    title: "Web Development Basics",
    field: "Web",
    docType: "Document",
    docUrl: "http://example.com/doc4",
    deadLine: "2024-12-20T23:59:59Z",
    description: "Web development basics challenge for beginners.",
    progress: false,
    participants: 0,
    maxParticipants: 5
  },
  {
    id: 5,
    title: "Career Growth Tips",
    field: "Career",
    docType: "Blog",
    docUrl: "http://example.com/doc5",
    deadLine: "2024-12-25T23:59:59Z",
    description: "Career growth tips challenge for everyone.",
    progress: true,
    participants: 6,
    maxParticipants: 8
  },
  {
    id: 6,
    title: "API 문서 번역 부탁",
    field: "API",
    docType: "Document",
    docUrl: "http://example.com/doc6",
    deadLine: "2024-12-05T23:59:59Z",
    description: "Deep dive into React hooks and advanced patterns.",
    progress: true,
    participants: 6,
    maxParticipants: 6
  },
  {
    id: 7,
    title: "Full Stack Challenge",
    field: "Web",
    docType: "Document",
    docUrl: "http://example.com/doc7",
    deadLine: "2024-12-12T23:59:59Z",
    description: "Build a full stack application from scratch.",
    progress: true,
    participants: 6,
    maxParticipants: 10
  },
  {
    id: 8,
    title: "CSS Flexbox Mastery",
    field: "Modern",
    docType: "Blog",
    docUrl: "http://example.com/doc8",
    deadLine: "2024-12-18T23:59:59Z",
    description: "Master CSS Flexbox layout system with practical examples.",
    progress: true,
    participants: 6,
    maxParticipants: 15
  },
  {
    id: 9,
    title: "Node.js Fundamentals",
    field: "Web",
    docType: "Document",
    docUrl: "http://example.com/doc9",
    deadLine: "2024-12-22T23:59:59Z",
    description: "Learn the fundamentals of Node.js for backend development.",
    progress: true,
    participants: 2,
    maxParticipants: 5
  },
  {
    id: 10,
    title: "Data Science",
    field: "Career",
    docType: "Blog",
    docUrl: "http://example.com/doc10",
    deadLine: "2024-12-30T23:59:59Z",
    description: "Python programming for data science and analysis.",
    progress: false,
    participants: 0,
    maxParticipants: 6
  },
  {
    id: 11,
    title: "Agile Methodology Training",
    field: "Career",
    docType: "Document",
    docUrl: "http://example.com/doc11",
    deadLine: "2024-12-28T23:59:59Z",
    description: "Master agile project management methodologies.",
    progress: true,
    participants: 2,
    maxParticipants: 4
  },
  {
    id: 12,
    title: "완료한 챌린지 예시",
    field: "Next",
    docType: "Document",
    docUrl: "https://nextjs.org/docs/pages/building-your-application/rendering/automatic-static-optimization",
    deadLine: "2024-11-23T23:59:59Z",
    description: "완료한 챌린지 예시입니다.",
    progress: false,
    participants: 1,
    maxParticipants: 3
  },
  {
    id: 13,
    title: "알리미 테스트 챌린지",
    field: "Next",
    docType: "Blog",
    docUrl: "https://www.postgresql.org/docs/current/sql-createprocedure.html",
    deadLine: "2024-12-02T23:59:59Z",
    description: "Create Procedure.",
    progress: false,
    participants: 0,
    maxParticipants: 5
  }
];

export const APPLICATION = [
  {
    id: 1,
    userId: 1,
    challengeId: 1,
    status: "Waiting",
    appliedAt: "2024-11-18T11:00:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 2,
    userId: 1,
    challengeId: 2,
    status: "Waiting",
    appliedAt: "2024-11-18T11:10:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 3,
    userId: 3,
    challengeId: 3,
    status: "Rejected",
    appliedAt: "2024-11-18T11:20:00Z",
    invalidationComment: "Insufficient details",
    invalidatedAt: "2024-11-18T11:25:00Z"
  },
  {
    id: 4,
    userId: 4,
    challengeId: 4,
    status: "Waiting",
    appliedAt: "2024-11-18T11:30:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 5,
    userId: 5,
    challengeId: 5,
    status: "Accepted",
    appliedAt: "2024-11-18T11:40:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 6,
    userId: 7,
    challengeId: 6,
    status: "Accepted",
    appliedAt: "2024-11-18T11:40:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 7,
    userId: 1,
    challengeId: 7,
    status: "Accepted",
    appliedAt: "2024-11-18T11:40:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 8,
    userId: 3,
    challengeId: 8,
    status: "Accepted",
    appliedAt: "2024-11-18T11:40:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 9,
    userId: 8,
    challengeId: 9,
    status: "Accepted",
    appliedAt: "2024-11-18T11:40:00Z",
    invalidationComment: null,
    invalidatedAt: null
  },
  {
    id: 10,
    userId: 3,
    challengeId: 10,
    status: "Invalidated",
    appliedAt: "2024-11-18T11:20:00Z",
    invalidationComment: "Insufficient details",
    invalidatedAt: "2024-11-18T11:25:00Z"
  },
  {
    id: 11,
    userId: 8,
    challengeId: 11,
    status: "Accepted",
    appliedAt: "2024-11-18T11:20:00Z",
    invalidationComment: "Insufficient details",
    invalidatedAt: "2024-11-18T11:25:00Z"
  },
  {
    id: 12,
    userId: 1,
    challengeId: 12,
    status: "Accepted",
    appliedAt: "2024-11-01T11:20:00Z",
    invalidationComment: "",
    invalidatedAt: null
  },
  {
    id: 13,
    userId: 9,
    challengeId: 13,
    status: "Waiting",
    appliedAt: "2024-12-01T11:20:00Z",
    invalidationComment: "",
    invalidatedAt: null
  }
];

export const WORK = [
  {
    id: 1,
    challengeId: 5,
    userId: 1,
    content: "<p>일반적으로 개발자는 일련의 하드 스킬을 가지고 있어야 커리어에서 경력과 전문성을 쌓을 수 있습니다. 하지만 이에 못지않게 개인 브랜드 구축도 만족스럽고 성취감 있는 경력을 쌓기 위해 중요한데 이를 쌓기는 더 어려울 수 있습니다</p><p><br></p><p>- 다른 사람들과의 차별화</p><p>- 신뢰감을 줄 수 있음</p><p>- 인맥을 쌓을 수 있는 기회</p><p>- 이름을 알릴 수 있음</p><p><br></p><p>이렇게 개인 브랜드는 경력을 결정짓는 수많은 중요한 방법으로 여러분을 도울 수 있습니다. 하지만 본인의 실력을 뽐내는 데 익숙하지 않거나 마케팅 개념에 한 번도 접근해보지 않은 사람은 브랜드 구축을 부담스럽거나 어렵게 느낄 수 있습니다. 이 가이드에서는 브랜드 구축을 위한 몇 가지 실용적인 전략을 소개합니다!</p><p><br></p><p>1. 자신의 야망과 편안한 수준을 고려하기</p><p>- 10년 후 내가 꿈꾸는 직책은 무엇인가 생각해 보기</p><p>- 자신의 구체적인 목표에 맞게 계획을 세워보기</p><p>- 자신의 직업적 목표에 집중할 수 있도록 도움을 줄 수 있는 관리자나 커리어 카운슬러와 상담하기</p><p><br></p><p>2. 나만의 열정과 지식을 담아내기</p><p>- 자신의 직업에서 실제로 가장 좋아하는 점을 생각해 보기</p><p>- 그것에 대해 얘기해보고 브랜드의 주제로 삼기</p><p><br></p><p>3. 온라인에서 존재감 만들기</p><p>- LinkedIn: 페이지가 최신 상태인지, 눈길을 끄는지, 나를 가장 잘 표현하는지 확인하기</p><p>- Github: 프로필을 항상 상태로 유지하기, 오픈 소스 기여와 개인 프로젝트 소개하기</p><p>- 나만의 웹사이트 구축하기</p><p><br></p><p>4. 측정 및 적용</p><p>- Google 애널리틱스 같은 도구를 사용해 실제로 콘텐츠의 성과를 확인하기</p><p>- 오프라인 인맥 구축 노력에 대한 피드백을 수집해 보기</p>",
    isSubmitted: true,
    submittedAt: "2024-11-18T13:00:00Z"
  },
  {
    id: 2,
    challengeId: 5,
    userId: 3,
    content: "Work2",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 3,
    challengeId: 5,
    userId: 4,
    content: "Work3",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 4,
    challengeId: 5,
    userId: 5,
    content: "Work4",
    isSubmitted: true,
    submittedAt: "2024-11-18T13:00:00Z"
  },
  {
    id: 5,
    challengeId: 5,
    userId: 7,
    content: "Work5",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 6,
    challengeId: 5,
    userId: 8,
    content: "Work6",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 7,
    challengeId: 6,
    userId: 1,
    content: "Work1",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 8,
    challengeId: 6,
    userId: 3,
    content: "Work2",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 9,
    challengeId: 6,
    userId: 4,
    content: "Work3",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 10,
    challengeId: 6,
    userId: 5,
    content: "Work4",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 11,
    challengeId: 6,
    userId: 7,
    content: "Work5",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 12,
    challengeId: 6,
    userId: 8,
    content: "Work6",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 13,
    challengeId: 7,
    userId: 1,
    content: "Work1",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 14,
    challengeId: 7,
    userId: 3,
    content: "Work2",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 15,
    challengeId: 7,
    userId: 4,
    content: "Work3",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 16,
    challengeId: 7,
    userId: 5,
    content: "Work4",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 17,
    challengeId: 7,
    userId: 7,
    content: "Work5",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 18,
    challengeId: 7,
    userId: 8,
    content: "Work6",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 19,
    challengeId: 8,
    userId: 1,
    content: "Work1",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 20,
    challengeId: 8,
    userId: 3,
    content: "Work2",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 21,
    challengeId: 8,
    userId: 4,
    content: "Work3",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 22,
    challengeId: 8,
    userId: 5,
    content: "Work4",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 23,
    challengeId: 8,
    userId: 7,
    content: "Work5",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 24,
    challengeId: 8,
    userId: 8,
    content: "Work6",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 25,
    challengeId: 9,
    userId: 1,
    content: "Work1",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 26,
    challengeId: 9,
    userId: 3,
    content: "Work2",
    isSubmitted: false,
    submittedAt: null
  },
  {
    id: 27,
    challengeId: 11,
    userId: 1,
    content: "Work1",
    isSubmitted: false,
    submittedAt: null
  },
  {
    id: 28,
    challengeId: 11,
    userId: 2,
    content: "Work2",
    isSubmitted: true,
    submittedAt: null
  },
  {
    id: 29,
    challengeId: 12,
    userId: 1,
    content: "완료한 챌린지 예시 work.",
    isSubmitted: true,
    submittedAt: null
  }
];

export const FEEDBACK = [
  {
    id: 1,
    userId: 1,
    workId: 1,
    content: "Great job!",
    createdAt: "2024-11-18T12:00:00Z"
  },
  {
    id: 2,
    userId: 3,
    workId: 1,
    content: "Needs improvement.",
    createdAt: "2024-11-18T12:10:00Z"
  },
  {
    id: 3,
    userId: 3,
    workId: 1,
    content: "Well done!",
    createdAt: "2024-11-18T12:20:00Z"
  },
  {
    id: 4,
    userId: 4,
    workId: 1,
    content: "Keep it up!",
    createdAt: "2024-11-18T12:30:00Z"
  },
  {
    id: 5,
    userId: 5,
    workId: 1,
    content: "Looks good.",
    createdAt: "2024-11-18T12:40:00Z"
  },
  {
    id: 6,
    userId: 1,
    workId: 1,
    content: "Great job!",
    createdAt: "2024-11-19T12:00:00Z"
  },
  {
    id: 7,
    userId: 3,
    workId: 2,
    content: "Needs improvement.",
    createdAt: "2024-11-19T12:10:00Z"
  },
  {
    id: 8,
    userId: 3,
    workId: 3,
    content: "Well done!",
    createdAt: "2024-11-19T12:20:00Z"
  },
  {
    id: 9,
    userId: 4,
    workId: 4,
    content: "Keep it up!",
    createdAt: "2024-11-19T12:30:00Z"
  },
  {
    id: 10,
    userId: 5,
    workId: 5,
    content: "Looks good.",
    createdAt: "2024-11-19T12:40:00Z"
  }
];

export const PARTICIPATE = [
  {
    id: 1,
    challengeId: 5,
    userId: 1
  },
  {
    id: 2,
    challengeId: 5,
    userId: 3
  },
  {
    id: 3,
    challengeId: 5,
    userId: 4
  },
  {
    id: 4,
    challengeId: 5,
    userId: 5
  },
  {
    id: 5,
    challengeId: 5,
    userId: 7
  },
  {
    id: 6,
    challengeId: 5,
    userId: 8
  },
  {
    id: 7,
    challengeId: 6,
    userId: 1
  },
  {
    id: 8,
    challengeId: 6,
    userId: 3
  },
  {
    id: 9,
    challengeId: 6,
    userId: 4
  },
  {
    id: 10,
    challengeId: 6,
    userId: 5
  },
  {
    id: 11,
    challengeId: 6,
    userId: 7
  },
  {
    id: 12,
    challengeId: 6,
    userId: 8
  },
  {
    id: 13,
    challengeId: 7,
    userId: 1
  },
  {
    id: 14,
    challengeId: 7,
    userId: 3
  },
  {
    id: 15,
    challengeId: 7,
    userId: 4
  },
  {
    id: 16,
    challengeId: 7,
    userId: 5
  },
  {
    id: 17,
    challengeId: 7,
    userId: 7
  },
  {
    id: 18,
    challengeId: 7,
    userId: 8
  },
  {
    id: 19,
    challengeId: 8,
    userId: 1
  },
  {
    id: 20,
    challengeId: 8,
    userId: 3
  },
  {
    id: 21,
    challengeId: 8,
    userId: 4
  },
  {
    id: 22,
    challengeId: 8,
    userId: 5
  },
  {
    id: 23,
    challengeId: 8,
    userId: 7
  },
  {
    id: 24,
    challengeId: 8,
    userId: 8
  },
  {
    id: 25,
    challengeId: 9,
    userId: 1
  },
  {
    id: 26,
    challengeId: 9,
    userId: 3
  },
  {
    id: 27,
    challengeId: 11,
    userId: 1
  },
  {
    id: 28,
    challengeId: 11,
    userId: 2
  },
  {
    id: 29,
    challengeId: 12,
    userId: 1
  }
];

export const LIKE = [
  {
    id: 1,
    workId: 1,
    userId: 3
  },
  {
    id: 2,
    workId: 1,
    userId: 4
  },
  {
    id: 3,
    workId: 1,
    userId: 7
  },
  {
    id: 4,
    workId: 2,
    userId: 7
  }
];
export const USER = [
  {
    id: 1,
    role: "User",
    nickname: "nick1",
    email: "User1@example.com",
    password: "password1",
    createdAt: "2024-11-18T10:00:00Z",
    grade: "Amateur"
  },
  {
    id: 2,
    role: "Admin",
    nickname: "nick2",
    email: "User2@example.com",
    password: "password2",
    createdAt: "2024-11-18T10:10:00Z",
    grade: "Expert"
  },
  {
    id: 3,
    role: "User",
    nickname: "nick3",
    email: "User3@example.com",
    password: "password3",
    createdAt: "2024-11-18T10:20:00Z",
    grade: "Amateur"
  },
  {
    id: 4,
    role: "User",
    nickname: "nick4",
    email: "User4@example.com",
    password: "password4",
    createdAt: "2024-11-18T10:30:00Z",
    grade: "Expert"
  },
  {
    id: 5,
    role: "User",
    nickname: "nick5",
    email: "User5@example.com",
    password: "password5",
    createdAt: "2024-11-18T10:40:00Z",
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
    participants: 3,
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
    participants: 2,
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
    participants: 4,
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
    progress: true,
    participants: 5,
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
    progress: false,
    participants: 1,
    maxParticipants: 8
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
    userId: 2,
    challengeId: 2,
    status: "Accepted",
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
  }
];

export const WORK = [
  {
    id: 1,
    challengeId: 1,
    userId: 1,
    description: "Work1",
    isSubmitted: true,
    submittedAt: "2024-11-18T13:00:00Z"
  },
  {
    id: 2,
    challengeId: 2,
    userId: 2,
    description: "Work2",
    isSubmitted: false,
    submittedAt: null
  },
  {
    id: 3,
    challengeId: 3,
    userId: 3,
    description: "Work3",
    isSubmitted: false,
    submittedAt: null
  },
  {
    id: 4,
    challengeId: 4,
    userId: 4,
    description: "Work4",
    isSubmitted: true,
    submittedAt: "2024-11-18T13:00:00Z"
  },
  {
    id: 5,
    challengeId: 5,
    userId: 5,
    description: "Work5",
    isSubmitted: false,
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
    userId: 2,
    workId: 2,
    content: "Needs improvement.",
    createdAt: "2024-11-18T12:10:00Z"
  },
  {
    id: 3,
    userId: 3,
    workId: 3,
    content: "Well done!",
    createdAt: "2024-11-18T12:20:00Z"
  },
  {
    id: 4,
    userId: 4,
    workId: 4,
    content: "Keep it up!",
    createdAt: "2024-11-18T12:30:00Z"
  },
  {
    id: 5,
    userId: 5,
    workId: 5,
    content: "Looks good.",
    createdAt: "2024-11-18T12:40:00Z"
  }
];

export const Languages = {
  1: 'JavaScript',
  2: 'TypeScript',
  3: 'Python',
  4: 'Java',
  5: 'C#',
  6: 'C',
  7: 'C++',
  8: 'Go',
  9: 'Rust',
  10: 'PHP',
  11: 'Ruby',
  12: 'Kotlin',
  13: 'Swift',
  14: 'Dart',
  15: 'Scala',
  16: 'R',
} as const;

export const paymentMethods = {
  1: 'PIX',
  2: 'Cartão de Crédito',
} as const;


export const ReviewRequestStatus = {
  1: 'Open',
  2: 'In Progress',
  3: 'Done',
  4: 'Cancelled',
} as const;

export const AcceptReviewStatuses = {
  1: 'Pending',
  2: 'Accepted',
  3: 'Rejected',
  4: 'Completed',
} as const;

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  roleId: number;
  avatar?: string;
  bio?: string;
  languages: Language[];
  rating: number;
  createdAt: string;
}

export interface Language {
  id: number;
  description: string;
}

export interface Profile {
  id: string;
  firstName: string;
  lastName: string;
  roleId: number;
  avatar?: string;
  bio?: string;
  languages: Language[];
  rating: number;
  createdAt: string;
  solutionCount?: number;
  reviewCount?: number;
  requestCount?: number;
}

export interface ReviewRequest {
  id: string;
  userId?: string;
  price: number;
  title: string;
  description: string;
  codeSnippet: string;
  status?: number;
  language: number;
  paymentMethod: number;
  createdAt: string;
}

export interface ChatRoom {
  id: string;
  reviewId: string;
  devId: string;
  clientId: string;

  reviewRequest?: ReviewRequest;
  dev?: User;
  client?: User;

  messages?: ChatMessage[];
}

export interface ChatMessage {
  id: string;
  roomId: string;
  userId: string;
  content: string;
  edited: boolean;

  room?: ChatRoom;
  user?: User;
}

export interface AcceptReviewStatuses {
  id: string;
  description: string;
}

export interface AcceptReview {
  devId: string;
  reviewId: string;
  statusId: AcceptReviewStatuses;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface Paginated<TData> {
  total: number;
  limit: number;
  offset: number;
  results: TData[];
}

export interface DefaultResponse {
  id: string;
  message: string;
}

export interface LoginResponse {
  message: string;
  token: string;
}

export interface AcceptReviewResponse {
  devId: string;
  reviewId: string;
  message: string;
  createdAt?: string;
  updatedAt?: string;
}


export interface Comment {
  id: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  edited?: boolean;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  solutionId?: string;
  userId?: string;
}

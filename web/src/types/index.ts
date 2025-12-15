// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'dev' | 'client' | 'admin';
  avatar?: string;
  bio?: string;
  languages: string[];
  rating: number;
  reviewCount: number;
  solutionCount: number;
  memberSince: string;
  location?: string;
  available?: boolean;
  hourlyRate?: number;
}

// Review Request types
export interface ReviewRequest {
  id: string;
  title: string;
  description: string;
  repositoryUrl?: string;
  languages: string[];
  price: number;
  dueDate?: string;
  status: 'open' | 'in_progress' | 'completed' | 'closed';
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  attachments?: Attachment[];
  solutionCount: number;
}

export interface Attachment {
  id: string;
  name: string;
  url: string;
  size: number;
  type: string;
}

// Solution types
export interface Solution {
  id: string;
  reviewId: string;
  reviewTitle?: string;
  content: string;
  price: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    name: string;
    avatar?: string;
    rating: number;
  };
  attachments?: Attachment[];
}

// Comment types
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
  // Para solution comments
  solutionId?: string;
  // Para user comments
  userId?: string;
}

// Chat types
export interface ChatRoom {
  id: string;
  title: string;
  type: 'direct' | 'group' | 'review';
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface Message {
  id: string;
  roomId: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
  edited?: boolean;
  author: {
    id: string;
    name: string;
    avatar?: string;
  };
  attachments?: Attachment[];
  read?: boolean;
}

// Notification types
export interface Notification {
  id: string;
  type: 'info' | 'success' | 'warning' | 'error';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
  metadata?: Record<string, any>;
}

// Payment types
export interface Payment {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded';
  method: 'credit_card' | 'debit_card' | 'pix' | 'bank_transfer';
  createdAt: string;
  completedAt?: string;
  description?: string;
  metadata?: Record<string, any>;
}

export interface Statement {
  id: string;
  userId: string;
  type: 'credit' | 'debit';
  amount: number;
  balance: number;
  description: string;
  createdAt: string;
  reference?: {
    type: 'review' | 'solution' | 'payment' | 'refund';
    id: string;
  };
}

// Rating types
export interface Rating {
  id: string;
  reviewId: string;
  targetUserId: string;
  authorId: string;
  stars: number;
  comment?: string;
  createdAt: string;
}

// Analytics types
export interface LanguageStats {
  language: string;
  count: number;
  percentage: number;
}

export interface EarningsStats {
  date: string;
  amount: number;
}

export interface ReviewStats {
  status: string;
  count: number;
}

// API Response types
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  limit: number;
  total: number;
  hasMore: boolean;
}

// Form types
export interface LoginFormData {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: 'dev' | 'client';
}

export interface ReviewRequestFormData {
  title: string;
  description: string;
  repositoryUrl?: string;
  languages: string[];
  price: number;
  dueDate?: string;
  attachments?: File[];
}

export interface SolutionFormData {
  reviewId: string;
  content: string;
  price: number;
  attachments?: File[];
}

// WebSocket event types
export interface WebSocketEvent {
  type: 'joinRoom' | 'leaveRoom' | 'newMessage' | 'messageUpdated' | 'messageDeleted' | 'typing' | 'online' | 'offline';
  roomId?: string;
  userId?: string;
  message?: Message;
  messageId?: string;
  updates?: Partial<Message>;
}

// Filter types
export interface ReviewRequestFilters {
  status?: string;
  language?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  page?: number;
  limit?: number;
}

export interface DeveloperFilters {
  language?: string;
  minRating?: number;
  available?: boolean;
  search?: string;
  page?: number;
  limit?: number;
}

import {
  isMockMode,
  getCurrentMockUser,
  MOCK_USERS,
  MOCK_CHAT_ROOMS,
  MOCK_MESSAGES,
  MOCK_USER_COMMENTS,
  MOCK_REVIEW_REQUESTS,
  MOCK_SOLUTIONS,
  MOCK_NOTIFICATIONS,
} from './mock-api';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3030/api';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

class ApiService {
  private getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }

  private async refreshAccessToken(): Promise<boolean> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) return false;

    try {
      const response = await fetch(`${API_BASE_URL}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refreshToken }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('accessToken', data.accessToken);
        return true;
      }
      return false;
    } catch {
      return false;
    }
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    if (isMockMode()) {
      const mockResponse = this.getMockData<T>(endpoint, options.method || 'GET', options.body);
      if (mockResponse) {
        await new Promise(resolve => setTimeout(resolve, 300));
        return mockResponse;
      }
    }

    const token = this.getToken();
    const headers: any = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      let response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
      });

      if (response.status === 401 && token) {
        const refreshed = await this.refreshAccessToken();
        if (refreshed) {
          headers['Authorization'] = `Bearer ${this.getToken()}`;
          response = await fetch(`${API_BASE_URL}${endpoint}`, {
            ...options,
            headers,
          });
        }
      }

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'Erro na requisição' };
      }

      return { data };
    } catch (error) {
      return { error: 'Erro de rede' };
    }
  }

  private getMockData<T>(endpoint: string, method: string, body?: any): ApiResponse<T> | null {
    const currentUser = getCurrentMockUser();

    if (endpoint === '/chat/rooms' && method === 'GET') {
      return { data: MOCK_CHAT_ROOMS as T };
    }

    const roomMatch = endpoint.match(/^\/chat\/room\/(.+)$/);
    if (roomMatch && method === 'GET' && !endpoint.includes('/messages')) {
      const roomId = roomMatch[1];
      const room = MOCK_CHAT_ROOMS.find(r => r.id === roomId);
      if (room) {
        return { data: room as T };
      }
    }

    const messagesMatch = endpoint.match(/^\/chat\/room\/(.+)\/messages/);
    if (messagesMatch && method === 'GET') {
      const roomId = messagesMatch[1];
      const messages = MOCK_MESSAGES[roomId as keyof typeof MOCK_MESSAGES] || [];
      return { data: messages as T };
    }

    if (messagesMatch && method === 'POST' && body) {
      const roomId = messagesMatch[1];
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      const newMessage = {
        id: 'msg-' + Date.now(),
        content: parsedBody.content,
        createdAt: new Date().toISOString(),
        author: currentUser || MOCK_USERS['test-user-id'],
      };

      if (!MOCK_MESSAGES[roomId as keyof typeof MOCK_MESSAGES]) {
        (MOCK_MESSAGES as any)[roomId] = [];
      }
      (MOCK_MESSAGES as any)[roomId].push(newMessage);

      return { data: newMessage as T };
    }

    const userMatch = endpoint.match(/^\/users\/(.+)$/);
    if (userMatch && method === 'GET') {
      const userId = userMatch[1];
      if (userId === 'me' && currentUser) {
        return { data: currentUser as T };
      }
      const user = MOCK_USERS[userId as keyof typeof MOCK_USERS];
      if (user) {
        return { data: user as T };
      }
    }

    const commentsMatch = endpoint.match(/^\/user-comments\?userId=(.+)$/);
    if (commentsMatch && method === 'GET') {
      const userId = commentsMatch[1];
      const comments = MOCK_USER_COMMENTS[userId as keyof typeof MOCK_USER_COMMENTS] || [];
      return { data: comments as T };
    }

    if (endpoint === '/user-comments' && method === 'POST' && body) {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      const newComment = {
        id: 'comment-' + Date.now(),
        content: parsedBody.content,
        rating: parsedBody.rating,
        author: currentUser || MOCK_USERS['test-user-id'],
        createdAt: new Date().toISOString(),
      };
      return { data: newComment as T };
    }

    if (endpoint === '/review-requests' && method === 'GET') {

      return { data: MOCK_REVIEW_REQUESTS as T };
    }

    if (endpoint === '/review-requests/my-requests' && method === 'GET') {
      const myRequests = MOCK_REVIEW_REQUESTS.filter(r => r.client.id === currentUser?.id);
      console.log(currentUser?.id)
      return { data: myRequests as T };
    }

    if (endpoint === '/review-requests/my-reviews' && method === 'GET') {
      const myReviews = MOCK_REVIEW_REQUESTS.filter(r => r.assignedDev?.id === currentUser?.id);
      return { data: myReviews as T };
    }

    const requestMatch = endpoint.match(/^\/review-requests\/(.+)$/);
    if (requestMatch && method === 'GET') {
      const requestId = requestMatch[1];
      const request = MOCK_REVIEW_REQUESTS.find(r => r.id === requestId);
      if (request) {
        // Transform to match expected interface
        const transformedRequest = {
          id: request.id,
          title: request.title,
          description: request.description,
          repositoryUrl: request.repositoryUrl,
          languages: request.languages || [],
          price: request.budget || 0,
          status: request.status,
          createdAt: request.createdAt,
          author: {
            id: request.client.id,
            name: request.client.name,
            avatar: request.client.avatar,
            rating: request.client.rating || 4.5,
          },
          attachments: request.attachments || [],
        };
        return { data: transformedRequest as T };
      }
    }

    if (endpoint === '/review-requests' && method === 'POST' && body) {
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      const newRequest = {
        id: 'request-' + Date.now(),
        title: parsedBody.title,
        description: parsedBody.description,
        budget: Number(parsedBody.budget),
        languages: Array.isArray(parsedBody.language)
          ? parsedBody.language
          : [parsedBody.language],
        repositoryUrl: parsedBody.repositoryUrl,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        client: currentUser || MOCK_USERS['test-user-id'],
        assignedDev: null,
        solutionsCount: 0,
        attachments: [],
      };

      MOCK_REVIEW_REQUESTS.push(newRequest);
      return { data: newRequest as T };
    }

    const solutionsMatch = endpoint.match(/^\/review-requests\/(.+)\/solutions$/);
    if (solutionsMatch && method === 'GET') {
      const requestId = solutionsMatch[1];
      const solutions = MOCK_SOLUTIONS[requestId as keyof typeof MOCK_SOLUTIONS] || [];
      return { data: solutions as T };
    }

    // Handle /solutions/by-review/:id endpoint
    const solutionsByReviewMatch = endpoint.match(/^\/solutions\/by-review\/(.+)$/);
    if (solutionsByReviewMatch && method === 'GET') {
      const requestId = solutionsByReviewMatch[1];
      const solutions = MOCK_SOLUTIONS[requestId as keyof typeof MOCK_SOLUTIONS] || [];
      // Transform solutions to match expected interface
      const transformedSolutions = solutions.map(sol => ({
        id: sol.id,
        content: sol.proposal,
        price: sol.price,
        status: sol.status,
        createdAt: sol.createdAt,
        author: {
          id: sol.developer.id,
          name: sol.developer.name,
          avatar: sol.developer.avatar,
          rating: sol.developer.rating || 4.5,
        },
      }));
      return { data: transformedSolutions as T };
    }

    if (solutionsMatch && method === 'POST' && body) {
      const requestId = solutionsMatch[1];
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      const newSolution = {
        id: 'solution-' + Date.now(),
        requestId,
        developer: currentUser || MOCK_USERS['dev-user-id'],
        ...parsedBody,
        status: 'pending',
        createdAt: new Date().toISOString(),
      };

      if (!MOCK_SOLUTIONS[requestId as keyof typeof MOCK_SOLUTIONS]) {
        (MOCK_SOLUTIONS as any)[requestId] = [];
      }
      (MOCK_SOLUTIONS as any)[requestId].push(newSolution);

      return { data: newSolution as T };
    }

    if (endpoint.startsWith('/developers') && method === 'GET') {
      const developers = Object.values(MOCK_USERS).filter(u => u.role === 'dev');
      return { data: developers as T };
    }

    if (endpoint === '/notifications' && method === 'GET') {
      const notifications = MOCK_NOTIFICATIONS[currentUser?.id as keyof typeof MOCK_NOTIFICATIONS] || [];
      return { data: notifications as T };
    }

    const notifMatch = endpoint.match(/^\/notifications\/(.+)\/read$/);
    if (notifMatch && method === 'PATCH') {
      const notifId = notifMatch[1];
      const userNotifs = MOCK_NOTIFICATIONS[currentUser?.id as keyof typeof MOCK_NOTIFICATIONS];
      if (userNotifs) {
        const notif = userNotifs.find(n => n.id === notifId);
        if (notif) {
          notif.read = true;
          return { data: notif as T };
        }
      }
    }

    if (endpoint === '/users/me' && (method === 'PUT' || method === 'PATCH')) {
      if (!currentUser) return null;
      const parsedBody = typeof body === 'string' ? JSON.parse(body) : body;
      const userId = currentUser.id as keyof typeof MOCK_USERS;
      const updatedUser = { ...MOCK_USERS[userId], ...parsedBody };
      (MOCK_USERS as any)[userId] = updatedUser;
      return { data: updatedUser as T };
    }

    if (endpoint === '/dashboard/stats' && method === 'GET') {
      if (currentUser?.role === 'client') {
        return {
          data: {
            activeRequests: 2,
            completedReviews: 1,
            pendingProposals: 6,
            totalSpent: 900,
          } as T,
        };
      } else if (currentUser?.role === 'dev') {
        return {
          data: {
            activeReviews: 1,
            completedReviews: 89,
            earnings: 15750,
            rating: 4.9,
          } as T,
        };
      }
    }

    return null;
  }

  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
    });
  }

  async patch<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
    });
  }

  async put<T>(endpoint: string, body: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(body),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  async uploadFile<T>(endpoint: string, formData: FormData): Promise<ApiResponse<T>> {
    const token = this.getToken();
    const headers: HeadersInit = {};

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers,
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        return { error: data.message || 'Erro no upload' };
      }

      return { data };
    } catch (error) {
      return { error: 'Erro de rede' };
    }
  }

  async login(email: string, password: string): Promise<ApiResponse<{ accessToken: string; refreshToken?: string; user: any }>> {
    const response = await this.post('/auth/login', { email, password });

    if (response.data && (response.data as any).token) {
      // Buscar dados do usuário após login
      const userResponse = await this.get('/users/me');
      return {
        data: {
          accessToken: (response.data as any).token,
          user: userResponse.data,
        }
      };
    }

    return response as any;
  }

  async register(data: { firstName: string; lastName: string; email: string; password: string; roleId: number; languages: number[] }): Promise<ApiResponse<{ user: any }>> {
    return this.post('/auth/signup', data);
  }

  async logout(): Promise<void> {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  async getCurrentUser(): Promise<ApiResponse<any>> {
    return this.get('/users/me');
  }
}

export const api = new ApiService();

export async function login(email: string, password: string) {
  const response = await api.login(email, password);
  if (response.data) {
    localStorage.setItem('accessToken', response.data.accessToken);
    if (response.data.refreshToken) {
      localStorage.setItem('refreshToken', response.data.refreshToken);
    }
    return { success: true, data: response.data };
  }
  return { success: false, error: response.error };
}

export async function register(data: { name: string; email: string; password: string; role: string }) {
  // Converter o 'name' em 'firstName' e 'lastName'
  const nameParts = data.name.split(' ');
  const firstName = nameParts[0];
  const lastName = nameParts.slice(1).join(' ') || nameParts[0];

  // Converter role 'dev' ou 'client' para roleId (1 = client, 2 = dev)
  const roleId = data.role === 'dev' ? 2 : 1;

  const response = await api.register({
    firstName,
    lastName,
    email: data.email,
    password: data.password,
    roleId,
    languages: [1], // ID padrão de linguagem
  });

  if (response.data) {
    return { success: true, data: response.data };
  }
  return { success: false, error: response.error };
}

export async function logout() {
  await api.logout();
}

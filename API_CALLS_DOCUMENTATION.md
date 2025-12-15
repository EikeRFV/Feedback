# Chamadas à API - Documentação

Este documento lista todas as chamadas à API implementadas no frontend da aplicação Hotfix.

## Resumo
**Total de chamadas à API: 21 chamadas**

## Chamadas por Página/Componente

### 1. Login.tsx
- **1 chamada**: `api.login(email, password)` - POST /auth/login
  - Realiza o login do usuário

### 2. Signup.tsx (pages/auth/Signup.tsx)
- **1 chamada**: `register()` → `api.register(data)` - POST /auth/signup
  - Cria uma nova conta de usuário

### 3. AuthContext.tsx
- **2 chamadas**:
  - `api.getCurrentUser()` - GET /users/me (em useEffect ao montar)
  - `api.getCurrentUser()` - GET /users/me (em função loadUser)

### 4. Dashboard.tsx
- **1 chamada**: `api.get('/dashboard/stats')` - GET /dashboard/stats
  - Busca estatísticas do dashboard

### 5. Developers.tsx
- **1 chamada**: `api.get('/developers')` - GET /developers
  - Lista todos os desenvolvedores disponíveis

### 6. MyReviews.tsx
- **1 chamada**: `api.get('/review-requests/my-reviews')` - GET /review-requests/my-reviews
  - Busca as reviews do usuário logado

### 7. Notifications.tsx
- **2 chamadas**:
  - `api.get('/notifications')` - GET /notifications
    - Busca todas as notificações
  - `api.patch(`/notifications/${notifId}/read`, {})` - PATCH /notifications/:id/read
    - Marca notificação como lida

### 8. ReviewRequests.tsx
- **1 chamada**: `api.get('/review-requests')` - GET /review-requests
  - Lista todas as solicitações de review disponíveis

### 9. Chat.tsx
- **3 chamadas**:
  - `api.get('/chat/rooms')` - GET /chat/rooms
    - Busca todas as salas de chat
  - `api.get(`/chat/room/${selectedRoom}/messages`)` - GET /chat/room/:id/messages
    - Busca as mensagens de uma sala específica
  - `api.post(`/chat/room/${selectedRoom}/messages`, {content})` - POST /chat/room/:id/messages
    - Envia uma nova mensagem

### 10. Profile.tsx
- **3 chamadas**:
  - `api.getCurrentUser()` - GET /users/me
    - Busca dados do perfil do usuário
  - `api.put('/users/me', formData)` - PUT /users/me
    - Atualiza dados do perfil do usuário
  - `loadUser()` após atualização (chama `api.getCurrentUser()` do contexto)

### 11. MyRequests.tsx
- **2 chamadas**:
  - `api.get('/review-requests/my-requests')` - GET /review-requests/my-requests
    - Lista solicitações criadas pelo usuário
  - `api.delete(`/review-requests/${requestId}`)` - DELETE /review-requests/:id
    - Deleta uma solicitação de review

### 12. Solutions.tsx
- **2 chamadas**:
  - `api.get('/solutions')` - GET /solutions
    - Lista todas as soluções propostas
  - `api.post(`/solutions/${solutionId}/upvote`, {})` - POST /solutions/:id/upvote
    - Faz upvote em uma solução

## Endpoints Utilizados

### Autenticação
- POST /auth/login
- POST /auth/signup

### Usuários
- GET /users/me
- PUT /users/me

### Dashboard
- GET /dashboard/stats

### Desenvolvedores
- GET /developers

### Review Requests
- GET /review-requests
- GET /review-requests/my-reviews
- GET /review-requests/my-requests
- DELETE /review-requests/:id

### Chat
- GET /chat/rooms
- GET /chat/room/:id/messages
- POST /chat/room/:id/messages

### Notificações
- GET /notifications
- PATCH /notifications/:id/read

### Soluções
- GET /solutions
- POST /solutions/:id/upvote

## Métodos HTTP Utilizados

- **GET**: 11 chamadas
- **POST**: 6 chamadas
- **PUT**: 1 chamada
- **PATCH**: 1 chamada
- **DELETE**: 1 chamada

**Total: 21 chamadas à API** ✅

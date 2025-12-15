# Guia de Integração - Hotfix (API + Frontend)

## Mudanças Realizadas

### 1. **Frontend (Web)**
- ✅ Configurada URL base da API para `http://localhost:3030/api`
- ✅ Criadas funções de autenticação (`login`, `register`, `logout`)
- ✅ Implementado `AuthContext` com gerenciamento de token e dados do usuário
- ✅ Corrigidos imports de `react-router-dom`
- ✅ Integradas páginas de Login e Signup com a API

### 2. **Backend (API)**
- ✅ Adicionado CORS para aceitar requisições do frontend
- ✅ Configurado prefixo global de rotas `/api`
- ✅ Endpoints de autenticação já existentes:
  - `POST /api/auth/login` - Fazer login
  - `POST /api/auth/signup` - Registrar novo usuário
  - `GET /api/users/me` - Obter dados do usuário autenticado

### 3. **Configuração de Ambiente**
- ✅ Criado arquivo `.env` na raiz do projeto com variáveis de banco de dados
- ✅ Criado arquivo `.env` no frontend com URL da API

## Como Iniciar

### Pré-requisitos
1. Node.js 18+ instalado
2. PostgreSQL rodando (ou usar Docker com `docker compose up -d`)
3. Banco de dados criado (verificar variáveis em `.env`)

### Passo 1: Configurar o Banco de Dados

Se estiver usando Docker:
```bash
cd /path/to/Feedback
docker compose up -d
```

Se usar PostgreSQL local, certifique-se de que está rodando e de que as credenciais em `.env` estão corretas.

### Passo 2: Executar Migrações do Banco de Dados

```bash
cd api
npm install
npm run migrate:run
```

### Passo 3: Iniciar a API

```bash
cd api
npm run dev
# A API estará rodando em http://localhost:3030
```

### Passo 4: Iniciar o Frontend

Em outro terminal:
```bash
cd web
npm install
npm run dev
# O frontend estará rodando em http://localhost:5173
```

## Fluxo de Autenticação

### Cadastro (Signup)
1. Usuário acessa `http://localhost:5173/signup`
2. Preenche: Nome, Email, Senha, Confirmação de senha e seleciona role (Dev ou Client)
3. Frontend converte dados:
   - `name` → `firstName` e `lastName`
   - `role` → `roleId` (1 = client, 2 = dev)
4. Envia POST `/api/auth/signup`
5. Redireciona para login

### Login
1. Usuário acessa `http://localhost:5173/login`
2. Preencha Email e Senha
3. Frontend envia POST `/api/auth/login`
4. API retorna token JWT
5. Frontend:
   - Armazena token em `localStorage` (chave: `accessToken`)
   - Carrega dados do usuário de `/api/users/me`
   - Salva contexto no `AuthContext`
6. Redireciona para home `/`

## Estrutura de Dados

### User (Usuário)
```typescript
{
  id: string (UUID)
  firstName: string
  lastName: string
  email: string
  password: string (hash bcrypt)
  roleId: 1 (Client) | 2 (Developer)
  active: boolean
  devStatusId: 1 | 2 | 3 (se Developer)
  languages: Language[]
}
```

### Roles
- `1` = Client (cliente que solicita reviews)
- `2` = Developer (desenvolvedor que faz reviews)

## Arquivos Modificados

### Frontend
- `web/src/services/api.ts` - Configuração da API e funções de autenticação
- `web/src/contexts/AuthContext.tsx` - Context de autenticação
- `web/src/pages/auth/Login.tsx` - Página de login
- `web/src/pages/auth/Signup.tsx` - Página de cadastro
- `web/.env` - Variáveis de ambiente

### Backend
- `api/src/main.ts` - Adicionado CORS e prefixo de rotas

## Próximas Etapas (Sugestões)

1. **Implementar Refresh Token**
   - Adicionar endpoint `/api/auth/refresh` para renovar tokens

2. **Validações**
   - Adicionar validações mais robustas no frontend
   - Implementar feedback de erros mais detalhado

3. **Proteção de Rotas**
   - Usar `PrivateRoutes` para proteger rotas autenticadas
   - Redirecionar para login se token expirar

4. **Integração com Outras Features**
   - Integrar módulos de review-request, solutions, etc.
   - Implementar chat em real-time com WebSockets

5. **Ambiente de Produção**
   - Usar variáveis de ambiente seguras
   - Implementar HTTPS
   - Configurar proxy reverso (Nginx)

## Troubleshooting

### A API não inicia
- Verificar se PostgreSQL está rodando
- Verificar credenciais em `.env`
- Verificar porta 3030 está disponível

### Frontend não conecta à API
- Verificar URL em `.env` do frontend
- Verificar se CORS está ativado na API
- Verificar console do navegador para erros

### Erro de banco de dados
- Executar `npm run migrate:run` na pasta `api`
- Verificar se o banco de dados existe

## Contato / Dúvidas
Para mais informações sobre o projeto, consulte os README.md em:
- `api/README.md`
- `web/README.md`

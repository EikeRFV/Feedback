export const MOCK_USERS = {
  'test-user-id': {
    id: 'test-user-id',
    name: 'João Cliente',
    email: 'teste@teste.com',
    role: 'client',
    avatar: 'https://i.pravatar.cc/300?u=test',
    bio: 'Empreendedor buscando desenvolvedores para revisar meu código',
    languages: [],
    rating: 0,
    reviewCount: 0,
    solutionCount: 0,
    balance: 2500.00,
    memberSince: '2024-01-15',
    location: 'São Paulo, Brasil',
  },
  'dev-user-id': {
    id: 'dev-user-id',
    name: 'Dev Silva',
    email: 'dev@dev.com',
    role: 'dev',
    avatar: 'https://i.pravatar.cc/300?u=dev',
    bio: 'Desenvolvedor Full Stack especializado em React, Node.js e TypeScript. Experiência de 5+ anos em desenvolvimento web.',
    languages: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'PostgreSQL'],
    rating: 4.9,
    reviewCount: 127,
    solutionCount: 89,
    balance: 15750.00,
    memberSince: '2023-03-10',
    location: 'Rio de Janeiro, Brasil',
    hourlyRate: 150,
  },
  'maria-dev-id': {
    id: 'maria-dev-id',
    name: 'Maria Santos',
    email: 'maria@hotfix.com',
    role: 'dev',
    avatar: 'https://i.pravatar.cc/300?u=maria',
    bio: 'Desenvolvedora especializada em Vue.js e performance web. Apaixonada por código limpo.',
    languages: ['JavaScript', 'Vue.js', 'Nuxt', 'CSS', 'Node.js'],
    rating: 4.8,
    reviewCount: 85,
    solutionCount: 62,
    memberSince: '2023-06-20',
    location: 'Belo Horizonte, Brasil',
    hourlyRate: 120,
  },
  'pedro-dev-id': {
    id: 'pedro-dev-id',
    name: 'Pedro Oliveira',
    email: 'pedro@hotfix.com',
    role: 'dev',
    avatar: 'https://i.pravatar.cc/300?u=pedro',
    bio: 'Backend specialist com foco em arquitetura e escalabilidade. Python e Go.',
    languages: ['Python', 'Go', 'Docker', 'Kubernetes', 'AWS'],
    rating: 4.7,
    reviewCount: 63,
    solutionCount: 48,
    memberSince: '2023-09-10',
    location: 'Curitiba, Brasil',
    hourlyRate: 140,
  },
  'ana-dev-id': {
    id: 'ana-dev-id',
    name: 'Ana Costa',
    email: 'ana@hotfix.com',
    role: 'dev',
    avatar: 'https://i.pravatar.cc/300?u=ana',
    bio: 'Mobile developer (React Native e Flutter). Design systems e UX.',
    languages: ['React Native', 'Flutter', 'Dart', 'TypeScript'],
    rating: 4.9,
    reviewCount: 92,
    solutionCount: 71,
    memberSince: '2023-04-15',
    location: 'Florianópolis, Brasil',
    hourlyRate: 130,
  },
};

export const MOCK_REVIEW_REQUESTS = [
  {
    id: 'request-1',
    title: 'Review de código React - E-commerce',
    description: 'Preciso de uma revisão completa do meu projeto de e-commerce em React. Tenho problemas de performance e gostaria de feedback sobre a arquitetura.',
    technologies: ['React', 'TypeScript', 'Redux'],
    budget: 500,
    status: 'in_progress',
    repositoryUrl: 'https://github.com/exemplo/ecommerce-react',
    attachments: [
      { id: 'att-1', name: 'arquitetura.pdf', url: '#' },
      { id: 'att-2', name: 'componentes.zip', url: '#' },
    ],
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    client: MOCK_USERS['test-user-id'],
    assignedDev: MOCK_USERS['dev-user-id'],
    solutionsCount: 3,
  },
  {
    id: 'request-2',
    title: 'Análise de API REST Node.js',
    description: 'Desenvolvi uma API em Node.js e Express. Preciso de feedback sobre segurança, estrutura e boas práticas.',
    technologies: ['Node.js', 'Express', 'MongoDB'],
    budget: 350,
    status: 'pending',
    repositoryUrl: 'https://github.com/exemplo/api-nodejs',
    attachments: [],
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    client: MOCK_USERS['test-user-id'],
    solutionsCount: 5,
  },
  {
    id: 'request-3',
    title: 'Review de aplicação Vue.js',
    description: 'Aplicação Vue 3 com Composition API. Gostaria de melhorar a organização dos componentes.',
    technologies: ['Vue.js', 'Vuex', 'TypeScript'],
    budget: 400,
    status: 'completed',
    repositoryUrl: 'https://github.com/exemplo/app-vue',
    attachments: [
      { id: 'att-3', name: 'estrutura.pdf', url: '#' },
    ],
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    client: MOCK_USERS['test-user-id'],
    assignedDev: MOCK_USERS['maria-dev-id'],
    solutionsCount: 2,
    completedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: 'request-4',
    title: 'Review de performance em React Native',
    description: 'App mobile com problemas de performance. Preciso identificar gargalos.',
    technologies: ['React Native', 'Expo', 'TypeScript'],
    budget: 600,
    status: 'pending',
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    client: MOCK_USERS['test-user-id'],
    solutionsCount: 1,
  },
];

export const MOCK_SOLUTIONS = {
  'request-1': [
    {
      id: 'solution-1',
      requestId: 'request-1',
      developer: MOCK_USERS['dev-user-id'],
      proposal: 'Olá! Analisei seu código e identifiquei os principais pontos de melhoria. Posso começar imediatamente.',
      message: 'Olá! Analisei seu código e identifiquei os principais pontos de melhoria. Posso começar imediatamente.',
      estimatedHours: 8,
      price: 500,
      status: 'accepted',
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'solution-2',
      requestId: 'request-1',
      developer: MOCK_USERS['maria-dev-id'],
      proposal: 'Tenho experiência com otimização React. Posso ajudar!',
      message: 'Tenho experiência com otimização React. Posso ajudar!',
      estimatedHours: 10,
      price: 520,
      status: 'pending',
      createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  'request-2': [
    {
      id: 'solution-3',
      requestId: 'request-2',
      developer: MOCK_USERS['pedro-dev-id'],
      proposal: 'Especialista em Node.js e segurança. Posso fazer uma análise completa.',
      message: 'Especialista em Node.js e segurança. Posso fazer uma análise completa.',
      estimatedHours: 6,
      price: 350,
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'solution-4',
      requestId: 'request-2',
      developer: MOCK_USERS['dev-user-id'],
      proposal: 'Posso revisar sua API e sugerir melhorias de arquitetura.',
      message: 'Posso revisar sua API e sugerir melhorias de arquitetura.',
      estimatedHours: 5,
      price: 350,
      status: 'pending',
      createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  'request-3': [
    {
      id: 'solution-5',
      requestId: 'request-3',
      developer: MOCK_USERS['maria-dev-id'],
      proposal: 'Vue é minha especialidade! Vou revisar com atenção.',
      message: 'Vue é minha especialidade! Vou revisar com atenção.',
      estimatedHours: 7,
      price: 400,
      status: 'completed',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  'request-4': [
    {
      id: 'solution-6',
      requestId: 'request-4',
      developer: MOCK_USERS['ana-dev-id'],
      proposal: 'Especialista em React Native. Posso identificar os problemas de performance.',
      message: 'Especialista em React Native. Posso identificar os problemas de performance.',
      estimatedHours: 10,
      price: 600,
      status: 'pending',
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
};

export const MOCK_CHAT_ROOMS = [
  {
    id: 'chat-dev-room',
    title: 'Conversa com Dev Silva',
    participants: [
      MOCK_USERS['test-user-id'],
      MOCK_USERS['dev-user-id'],
    ],
    unreadCount: 2,
    updatedAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
    lastMessage: {
      content: 'Oi! Posso ajudar com a revisão do seu código React',
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      author: {
        name: 'Dev Silva',
      },
    },
    relatedRequest: 'request-1',
  },
  {
    id: 'chat-maria-room',
    title: 'Conversa com Maria Santos',
    participants: [
      MOCK_USERS['test-user-id'],
      MOCK_USERS['maria-dev-id'],
    ],
    unreadCount: 0,
    updatedAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    lastMessage: {
      content: 'Obrigado pela revisão! Foi muito útil.',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      author: {
        name: 'João Cliente',
      },
    },
    relatedRequest: 'request-3',
  },
];

export const MOCK_MESSAGES = {
  'chat-dev-room': [
    {
      id: 'msg-1',
      content: 'Olá! Vi seu request de revisão de código React. Posso ajudar!',
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['dev-user-id'],
    },
    {
      id: 'msg-2',
      content: 'Oi Dev! Que bom! Estou com dúvidas sobre performance em componentes.',
      createdAt: new Date(Date.now() - 1.5 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['test-user-id'],
    },
    {
      id: 'msg-3',
      content: 'Entendi! Você está usando React.memo nos componentes? Isso pode ajudar muito.',
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['dev-user-id'],
    },
    {
      id: 'msg-4',
      content: 'Ainda não. Como funciona exatamente?',
      createdAt: new Date(Date.now() - 50 * 60 * 1000).toISOString(),
      author: MOCK_USERS['test-user-id'],
    },
    {
      id: 'msg-5',
      content: 'React.memo é um HOC que memoriza o resultado do componente. Ele só re-renderiza se as props mudarem.',
      createdAt: new Date(Date.now() - 40 * 60 * 1000).toISOString(),
      author: MOCK_USERS['dev-user-id'],
    },
    {
      id: 'msg-6',
      content: 'Faz sentido! E para hooks, tem alguma recomendação?',
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      author: MOCK_USERS['test-user-id'],
    },
    {
      id: 'msg-7',
      content: 'Sim! Use useMemo para valores computados e useCallback para funções que são passadas como props.',
      createdAt: new Date(Date.now() - 20 * 60 * 1000).toISOString(),
      author: MOCK_USERS['dev-user-id'],
    },
    {
      id: 'msg-8',
      content: 'Ótimo! Vou implementar essas otimizações.',
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      author: MOCK_USERS['test-user-id'],
    },
    {
      id: 'msg-9',
      content: 'Qualquer dúvida, estou à disposição!',
      createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
      author: MOCK_USERS['dev-user-id'],
    },
  ],
  'chat-maria-room': [
    {
      id: 'msg-10',
      content: 'Olá! Aceitei sua solicitação de review Vue.js',
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['maria-dev-id'],
    },
    {
      id: 'msg-11',
      content: 'Obrigado Maria! Quando podemos começar?',
      createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['test-user-id'],
    },
    {
      id: 'msg-12',
      content: 'Finalizei a revisão. Enviei o relatório completo!',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['maria-dev-id'],
    },
    {
      id: 'msg-13',
      content: 'Obrigado pela revisão! Foi muito útil.',
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      author: MOCK_USERS['test-user-id'],
    },
  ],
};

export const MOCK_NOTIFICATIONS = {
  'test-user-id': [
    {
      id: 'notif-1',
      type: 'new_solution',
      title: 'Nova proposta recebida',
      message: 'Ana Costa enviou uma proposta para "Review de performance em React Native"',
      read: false,
      createdAt: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      link: '/requests/request-4',
    },
    {
      id: 'notif-2',
      type: 'message',
      title: 'Nova mensagem',
      message: 'Dev Silva enviou uma mensagem',
      read: false,
      createdAt: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
      link: '/chat/rooms/chat-dev-room',
    },
    {
      id: 'notif-3',
      type: 'review_completed',
      title: 'Review finalizado',
      message: 'Maria Santos finalizou o review "Review de aplicação Vue.js"',
      read: true,
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
      link: '/requests/request-3',
    },
    {
      id: 'notif-4',
      type: 'new_solution',
      title: 'Nova proposta recebida',
      message: 'Pedro Oliveira enviou uma proposta para "Análise de API REST Node.js"',
      read: true,
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      link: '/requests/request-2',
    },
  ],
  'dev-user-id': [
    {
      id: 'notif-5',
      type: 'solution_accepted',
      title: 'Proposta aceita!',
      message: 'João Cliente aceitou sua proposta para "Review de código React - E-commerce"',
      read: true,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      link: '/requests/request-1',
    },
    {
      id: 'notif-6',
      type: 'message',
      title: 'Nova mensagem',
      message: 'João Cliente enviou uma mensagem',
      read: true,
      createdAt: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      link: '/chat/rooms/chat-dev-room',
    },
    {
      id: 'notif-7',
      type: 'new_request',
      title: 'Nova solicitação disponível',
      message: 'Nova solicitação: "Review de performance em React Native"',
      read: false,
      createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      link: '/requests/request-4',
    },
  ],
};

export const MOCK_USER_COMMENTS = {
  'dev-user-id': [
    {
      id: 'comment-1',
      content: 'Excelente desenvolvedor! Muito atencioso e detalhista nas revisões. Recomendo muito!',
      rating: 5,
      author: {
        id: 'user-1',
        name: 'Carlos Santos',
        avatar: 'https://i.pravatar.cc/150?u=carlos',
      },
      createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'comment-2',
      content: 'Dev Silva identificou problemas que eu nem sabia que existiam. Muito profissional!',
      rating: 5,
      author: {
        id: 'user-2',
        name: 'Juliana Oliveira',
        avatar: 'https://i.pravatar.cc/150?u=juliana',
      },
      createdAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'comment-3',
      content: 'Ótimo trabalho! Código ficou muito melhor depois da revisão.',
      rating: 5,
      author: {
        id: 'user-3',
        name: 'Rafael Lima',
        avatar: 'https://i.pravatar.cc/150?u=rafael',
      },
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  'maria-dev-id': [
    {
      id: 'comment-4',
      content: 'Maria é excepcional! Review muito completo e educativo.',
      rating: 5,
      author: MOCK_USERS['test-user-id'],
      createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: 'comment-5',
      content: 'Adorei trabalhar com a Maria. Muito didática!',
      rating: 5,
      author: {
        id: 'user-4',
        name: 'Lucas Mendes',
        avatar: 'https://i.pravatar.cc/150?u=lucas',
      },
      createdAt: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ],
  'test-user-id': [],
};

export function isMockMode(): boolean {
  return localStorage.getItem('mockMode') === 'true';
}

export function setMockMode(enabled: boolean): void {
  localStorage.setItem('mockMode', enabled ? 'true' : 'false');
}

export function getCurrentMockUser() {
  const token = localStorage.getItem('accessToken');
  if (token === 'mock-access-token') {
    return MOCK_USERS['test-user-id'];
  } else if (token === 'mock-dev-token') {
    return MOCK_USERS['dev-user-id'];
  }
  return null;
}

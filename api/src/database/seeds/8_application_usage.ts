import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  await knex('user_comments').del();
  await knex('chat_messages').del();
  await knex('chat_rooms').del();
  await knex('solution_comments').del();
  await knex('solutions').del();
  await knex('accepts_reviews').del();
  await knex('users_languages').del();
  await knex('review_requests').del();
  await knex('users').del();

  const devId1 = '400932b3-7f0b-4cb7-83f7-a176cae2a693';
  const devId2 = 'c6eb10f5-b414-444f-a033-9737ec1a0049';
  const clientId = 'b0df013d-6c75-481f-8446-5d8a83aff8f8';
  const reviewId = 'af49d64d-4818-479d-a776-ceff586caa5e';
  const acceptId1 = '73339d7b-eca7-4787-8869-f1a116ddcfd5';
  const acceptId2 = 'ad284ae9-8fdb-4d64-9826-6251dea01cb4';
  const solutionId = 'eec97e42-e42e-400c-9bd4-d6ecae5750d7';
  const roomId1 = '535a9059-7d1b-4fd4-9441-26dd0a2e3efd';
  const roomId2 = '8f3c1ea3-4d7b-4fa5-ba81-a912a6b6a9f0';

  const passwordHash = '$2a$10$752gaUHXQ38oVEfCN7naoespuNFkgIjb1eQuLUy.qS8.3z1pqEqsG';

  await knex('users').insert([
    {
      id: devId1,
      first_name: 'Dev',
      last_name: 'Expert',
      email: 'dev@example.com',
      password: passwordHash,
      role_id: 2,
      active: true,
      dev_status_id: 1,
      avatar: null,
      bio: 'Sou apenas um dev absurdo de bom',
      rating: 5.0,
    },
    {
      id: devId2,
      first_name: 'Dev',
      last_name: 'brabo',
      email: 'dev2@example.com',
      password: passwordHash,
      role_id: 2,
      active: true,
      dev_status_id: 1,
      avatar: null,
      bio: 'Sou apenas um dev absurdo de ruim',
      rating: 3.0,
    },
    {
      id: clientId,
      first_name: 'Client',
      last_name: 'User',
      email: 'client@example.com',
      password: passwordHash,
      role_id: 1,
      active: true,
      dev_status_id: null,
      avatar: null,
      bio: null,
      rating: 5.0,
    }
  ]);

  await knex('users_languages').insert([
    { user_id: devId1, language: 2 },
    { user_id: devId1, language: 1 },
    { user_id: devId1, language: 5 },
    { user_id: devId2, language: 3 },
    { user_id: devId2, language: 4 },
    { user_id: devId2, language: 1 }
  ]);

  await knex('review_requests').insert({
    id: reviewId,
    user_id: clientId,
    price: 150.00,
    title: 'Fix my React Hook',
    description: 'I have an infinite loop in useEffect',
    code_snippet: 'useEffect(() => { setState(state + 1) })',
    status: 1,
    language: 2,
    payment_method: 2
  });

  await knex('accepts_reviews').insert({
    id: acceptId1,
    status_id: 1,
    review_id: reviewId,
    dev_id: devId2
  });

  await knex('accepts_reviews').insert({
    id: acceptId2,
    status_id: 1,
    review_id: reviewId,
    dev_id: devId1
  });

  await knex('solutions').insert({
    id: solutionId,
    accept_review_id: acceptId1,
    solution: 'You need to add a dependency array to useEffect.',
    accepted_solution: true
  });

  await knex('solution_comments').insert({
    id: '830daeeb-8bca-4105-b1c8-a8db4d3b56da',
    solution_id: solutionId,
    user_id: clientId,
    content: 'Works perfectly, thanks!',
    is_edited: false
  });

  await knex('chat_rooms').insert({
    id: roomId1,
    review_id: reviewId,
    dev_id: devId1,
    client_id: clientId
  });

  await knex('chat_rooms').insert({
    id: roomId2,
    review_id: reviewId,
    dev_id: devId2,
    client_id: clientId
  });

  await knex('chat_messages').insert([
    {
      room_id: roomId1,
      user_id: devId1,
      content: 'Hello, I can help you with that.',
      edited: false
    },
    {
      room_id: roomId1,
      user_id: clientId,
      content: 'Great! Please check the snippet.',
      edited: false
    },
    {
      room_id: roomId1,
      user_id: devId1,
      content: "You're code is perfect",
      edited: false
    },
    {
      room_id: roomId2,
      user_id: clientId,
      content: 'Great! Please check the snippet.',
      edited: false
    }
  ]);

  await knex('user_comments').insert({
    id: 'cc2b9f90-47fc-4be0-afc1-c51b9aab15b6',
    user_id: clientId,
    target_user_id: devId1,
    content: 'Excellent developer, very fast.',
    is_edited: false
  });
};

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

  const devId = '400932b3-7f0b-4cb7-83f7-a176cae2a693';
  const clientId = 'b0df013d-6c75-481f-8446-5d8a83aff8f8';
  const reviewId = 'af49d64d-4818-479d-a776-ceff586caa5e';
  const acceptId = '73339d7b-eca7-4787-8869-f1a116ddcfd5';
  const solutionId = 'eec97e42-e42e-400c-9bd4-d6ecae5750d7';
  const roomId = '535a9059-7d1b-4fd4-9441-26dd0a2e3efd';

  const passwordHash = '$2a$10$752gaUHXQ38oVEfCN7naoespuNFkgIjb1eQuLUy.qS8.3z1pqEqsG';

  await knex('users').insert([
    {
      id: devId,
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
    { user_id: devId, language: 2 },
    { user_id: devId, language: 1 },
    { user_id: devId, language: 5 }
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
    id: acceptId,
    status_id: 1,
    review_id: reviewId,
    dev_id: devId
  });

  await knex('solutions').insert({
    id: solutionId,
    accept_review_id: acceptId,
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
    id: roomId,
    review_id: reviewId,
    dev_id: devId,
    client_id: clientId
  });

  await knex('chat_messages').insert([
    {
      id: 'f6f5eda2-7e23-415e-ac5d-dbf312f665e1',
      room_id: roomId,
      user_id: devId,
      content: 'Hello, I can help you with that.',
      edited: false
    },
    {
      id: 'b5ef857f-4965-45b0-8746-205966ad0565',
      room_id: roomId,
      user_id: clientId,
      content: 'Great! Please check the snippet.',
      edited: false
    }
  ]);

  await knex('user_comments').insert({
    id: 'cc2b9f90-47fc-4be0-afc1-c51b9aab15b6',
    user_id: clientId,
    target_user_id: devId,
    content: 'Excellent developer, very fast.',
    is_edited: false
  });
};

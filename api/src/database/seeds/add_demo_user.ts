import { Knex } from 'knex';
import * as bcrypt from 'bcrypt';

export async function seed(knex: Knex): Promise<void> {
  // Verificar se usuário de demo já existe
  const existingUser = await knex('users').where('email', 'demo@example.com').first();
  
  if (existingUser) {
    console.log('Usuário de demo já existe!');
    return;
  }

  const hashedPassword = await bcrypt.hash('demo123456', 10);

  // Inserir usuário de demo
  await knex('users').insert({
    id: '00000000-0000-0000-0000-000000000001',
    firstName: 'Demo',
    lastName: 'User',
    email: 'demo@example.com',
    password: hashedPassword,
    roleId: 1, // Client
    active: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });

  console.log('✅ Usuário de demo criado com sucesso!');
  console.log('📧 Email: demo@example.com');
  console.log('🔑 Senha: demo123456');
}

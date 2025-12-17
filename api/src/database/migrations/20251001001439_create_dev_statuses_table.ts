import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.schema.createTable('dev_statuses', (table) => {
    knex.raw('create extension if not exists "uuid-ossp"')

    table.increments('id').primary();
    table.string('description').notNullable().unique();
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTableIfExists('dev_statuses');
}

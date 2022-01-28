import { Knex } from '../data/index.js';

const findAllUsers = async () => {
  const output = await Knex.getKnex()(Knex.tables.user).select();
  return output;
};

const findByFirstName = async (firstname) => {
  const output = await Knex.getKnex()(Knex.tables.user)
    .select()
    .where('first_name', firstname);
  return output;
};

export const userRepo = {
  findAllUsers,
  findByFirstName,
};

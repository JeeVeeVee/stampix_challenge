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

const create = async (
  gender,
  firstname,
  lastname,
  email,
  phone_number,
  date_of_birth,
  language
) => {
  try {
    const date = new Date();
    const dateFormatted = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    await Knex.getKnex()(Knex.tables.user).insert({
      gender: gender,
      first_name: firstname,
      last_name: lastname,
      email: email,
      date_of_birth: date_of_birth,
      phone_number: phone_number,
      language: language,
      created_at: dateFormatted,
      modified_at: dateFormatted,
    });
  } catch (error) {
    console.log('something went wrong while inserting new user');
    console.log(error.message);
    throw error;
  }
  return await Knex.getKnex()(Knex.tables.user).select().where('email', email);
};

export const userRepo = {
  findAllUsers,
  findByFirstName,
  create,
};

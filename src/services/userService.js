import { userRepo } from '../repositories/userRepo.js';

let getAll = async () => {
  return await userRepo.findAllUsers();
};

let getByFirstName = async (firstname) => {
  return await userRepo.findByFirstName(firstname);
};

let create = async ({
  gender,
  first_name,
  last_name,
  email,
  phone_number,
  date_of_birth,
  language,
}) => {
  return await userRepo.create(
    gender,
    first_name,
    last_name,
    email,
    phone_number,
    date_of_birth,
    language
  );
};

export let userService = {
  getAll,
  getByFirstName,
  create,
};

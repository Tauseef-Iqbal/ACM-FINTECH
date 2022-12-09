const getUsers = require('./get-users');
const getUserById = require('./get-user-by-id');
const getUserByEmail = require('./get-user-by-email');
const createUser = require('./create-user');
const updateUser = require('./update-user');
const deleteUser = require('./delete-user');
module.exports = {
  paths: {
    '/users': {
      ...getUsers,
    },
    '/get-user-by-email/{email}': {
      ...getUserByEmail,
    },
    '/get-user-by-id/{id}': {
      ...getUserById,
    },
    '/create-user': {
      ...createUser,
    },
    '/update-user': {
      ...updateUser,
    },
    '/delete-user': {
      ...deleteUser,
    },
  },
};

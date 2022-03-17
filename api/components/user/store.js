const Model = require('./model');

function addUser(user) {
  const myUser = new Model(user);
  return myUser.save();
}

async function getUsers(filterUsersByName) {
  let filter = {};
  if (filterUsersByName !== null) {
    filter = { name: filterUsersByName};
  }
  const users = await Model.find(filter);
  return users;
}

async function updateUser(id, data) {
  const user = await Model.findOne({
    _id: id
  });

  if (data.name) {
    user.name = data.name;
  }

  const newUser = await user.save();
  return newUser;
}

function removeUser(id) {
  return Model.deleteOne({
    _id:id
  })
}

module.exports = {
  add: addUser,
  list: getUsers,
  update: updateUser,
  remove: removeUser,
}
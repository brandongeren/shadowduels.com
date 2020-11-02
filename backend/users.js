// this file contains users and rooms
// given the simplicity of this prototype, an user cannot be in multiple rooms yet
// also note that there's no real login system, just like "enter your name" registration
const users = [];

// add the specified user into the global array of users
const addUser = ({id, name, room}) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  const existingUser = users.find((user) => user.room === room && user.name === name);

  if (existingUser) {
    return { error: 'Username is already taken' };
  }

  const user = { id, name, room };

  users.push(user);

  return { user };
}

// returns the removed user and mutates the users array by removing the specified user id
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
}

// find an user by looking up their id 
const getUser = (id) => {
  return users.find((user) => user.id === id)
}

// return a list of all users in a particular room
const getUsersInRoom = (room) => {
  return users.filter((room) => user.room === room);
}

module.exports = { addUser, removeUser, getUser, getUsersInRoom};
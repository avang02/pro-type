// Service modules export business/app logic
// such as managing tokens, etc.
// Service modules often depend upon API modules
// for making AJAX requests to the server.

import * as usersAPI from './users-api';

export async function signUp(userData) {
  console.log(userData)
  const token = await usersAPI.signUp(userData);
  console.log(token)
  localStorage.setItem('token', token);
  return getUser('token');
}

export async function login(credentials) {
  // Delegate the AJAX request to the users-api.js
  // module.
  console.log(credentials)
  const token = await usersAPI.login(credentials);
  console.log(token)
  localStorage.setItem('token', token);
  return getUser('token');
}

export function logOut() {
  // localStorage.removeItem('token');
  localStorage.clear();
}

export async function update(newData, userId) {
  const token = await usersAPI.update(newData, userId);
  localStorage.setItem('token', token);
  return getUser('token');
} 

export function getToken() {
  // getItem will return null if the key does not exists
  const token = localStorage.getItem('token');
  console.log(token)
  if (!token) return null;
  const payload = JSON.parse(atob(token.split('.')[1]));
  // A JWT's exp is expressed in seconds, not miliseconds
  console.log(payload)
  if (payload.exp * 1000 < Date.now()) {
    // Token has expired
    localStorage.removeItem('token');
    return null;
  }
  return token;
}

export function getUser() {
  const token = getToken('token');
  return token ? JSON.parse(atob(token.split('.')[1])).user : null;
}



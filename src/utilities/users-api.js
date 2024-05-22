import sendRequest from "./send-request";
const BASE_URL = '/api/users';

export async function signUp(userData) {
  console.log(userData)
  return sendRequest(BASE_URL, 'POST', userData);
}

export async function login(credentials) {
  return sendRequest(`${BASE_URL}/login`, 'POST', credentials);
}

export async function update(newData, userId) {
  return sendRequest(`${BASE_URL}/${userId}/update`, 'PATCH', newData)
}
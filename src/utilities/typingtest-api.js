import sendRequest from './send-request';
const BASE_URL = '/api/typingtest'

export async function createTypeTest(testData, userId) {
    return sendRequest(`${BASE_URL}/${userId}/new`, 'POST', testData);
}

export async function getAllTypeTest(userId) {
    return sendRequest(`${BASE_URL}/${userId}/tests`, 'GET', null);
}

export async function getTypeTest(testId) {
    return sendRequest(`${BASE_URL}/${testId}`, 'GET', testId);
}

export async function deleteTypeTest(testId) {
    return sendRequest(`${BASE_URL}/${testId}/delete`, 'DELETE', testId);
}


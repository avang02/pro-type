import * as typingtestAPI from './typingtest-api';
import { getToken } from './users-service';

export async function createTypeTest(testData, userId) {
    const token = await typingtestAPI.createTypeTest(testData, userId);
    localStorage.setItem('typetestToken', token);
    return getTypeTestToken('typetestToken');
}

export async function getAllTypeTest() {
    const token = await typingtestAPI.getAllTypeTest();
    localStorage.setItem('typetestToken', token);
    return getTypeTestToken('typetestToken');
}

export async function getTypeTest(testId) {
    const token = await typingtestAPI.getTypeTest(testId);
    localStorage.setItem('typetestToken', token);
    return getTypeTestToken('typetestToken');
}

export async function deleteTypeTest(testId) {
    const token = await typingtestAPI.deleteTypeTest(testId);
    localStorage.setItem('typetestToken', token);
    return getTypeTestToken('typetestToken');
}



export function getTypeTestToken(tokenName) {
    const token = getToken(tokenName);
    return token ? JSON.parse(atob(token.split('.')[1])).typingtest : null;
}
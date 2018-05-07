import request from '../utils/request';
import { stringify } from 'qs';

export function login(username, password) {
  return request(`/api/user/login`, {
    method: `POST`,
    body: {
      username,
      password
    }
  });
}

export function getInfo(token) {
  return request(`/api/user/info?${stringify(token)}`);
}

export function logout() {
  return request(`/api/user/logout`, {
    method: `POST`
  });
}

export function GETList(params) {
  return request(`/api/table/list${stringify(params)}`);
}

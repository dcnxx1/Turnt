import axios from 'axios';

const urls = {
  zaandam: 'http://172.29.109.109:3000',
  default: 'http://192.168.2.23:3000',
};
export const API = axios.create({
  baseURL: urls.zaandam,
});

export const queryKey = {
  findCode: 'findCode',
  findUsername: 'findUsername',
  createAccount: 'createAccount',
  
};

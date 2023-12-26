import axios from 'axios';

const urls = {
  zaandam: 'http://172.29.109.109:3000',
  default: 'http://192.168.2.23:3000',
  hoofddorp: 'http://10.0.5.91:3000',
};
export const API = axios.create({
  baseURL: urls.default,
});

export const useCDN = (key: string): string => {
  return `https://dxhr72btgprfv.cloudfront.net/${key}`;
};

export const queryKey = {
  findCode: 'findCode',
  findUsername: 'findUsername',
  createAccount: 'createAccount',
};

export const TURN_IMPRESSION_TIME_LIMIT = 30;
export const TURN_KEY = 'uploads/turns/';
export const COVER_KEY = 'uploads/covers/';
export const PF_USER_KEY = 'users/pf/';
export const BUCKET = 'turnerapp';

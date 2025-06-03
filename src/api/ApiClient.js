// ApiClient.js
import axios from 'axios';
import { fetchConfig } from '../config/configService';

const createApiClient = async () => {
  const baseURL =  await fetchConfig();

  console.log('baseUrl', baseURL);

  return baseURL;
//   return axios.create({
//     baseURL: baseURL,
//   });
};

export default createApiClient;

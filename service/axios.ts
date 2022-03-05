import { message } from 'antd';
import axios, { AxiosError } from 'axios';

const service = axios.create({
  baseURL: '/api',
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers!.Authorization = token;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    message.success(response.data.message);
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    message.error(
      response ? `${response.status}: ${response.data.message}` : '服务器错误',
    );
    return Promise.reject(error);
  },
);

export default service;

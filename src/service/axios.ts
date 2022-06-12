import { message } from 'antd';
import axios, { AxiosError } from 'axios';

const service = axios.create({
  baseURL: '/api',
});

service.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers!.authorization = token;
  }
  return config;
});

service.interceptors.response.use(
  (response) => {
    if (response.data.message) {
      message.success(response.data.message);
    }
    return response;
  },
  (error: AxiosError) => {
    const { response } = error;
    message.error(
      response?.status === 500
        ? '服务器错误'
        : `${response?.status}: ${response?.data.message}`,
    );
    return Promise.reject(error);
  },
);

export default service;

import axios from 'axios';
import Cookies from 'js-cookie';
import Router from 'next/router';

const API = axios.create({
  baseURL: `/api/`,
  headers: {
    'Content-Type': 'application/json'
  }
});

API.interceptors.request.use(
  config => {
    const token = Cookies.get('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => {
    return response;
  },
  error => {
    if (error.response && error.response.status === 401) {
      Cookies.remove('token');
      Router.push('/'); 
      console.log('Unauthorized, logging out ...');
    }
    return Promise.reject(error);
  }
);

export { API };
import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.dev.homeis.com/v1',
  timeout: 60000
});

instance.interceptors.request.use(
  (config) => {
    config.headers.Authorization = `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVhZTcxZmVjOWFlYjFmMDAxMDQzYzZlMSIsImNvbW11bml0eUlkIjoiNWEwMDQ5Y2YwYWMzOGUwMDE2Nzg1ZjJmIiwidXNlclR5cGUiOjAsImlhdCI6MTUyNTA5NjQyOCwiZXhwIjoxNTI3Njg4NDI4fQ.ClK5IQyqebSBEAvLrzK3Ei7-dNkRdVdyHvdcOcRcsbQ`;
    return config;
  },
  (error) =>
    Promise.reject(error)
);

export default instance;

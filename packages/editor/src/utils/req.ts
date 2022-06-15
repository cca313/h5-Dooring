import axios from 'axios';
import { message } from 'antd';

const BASE_API = process.env.APP_BASE_API;
console.log('环境变量', process.env);

const instance = axios.create({
  baseURL: BASE_API,
  timeout: 10000,
  // withCredentials: true,
});

// 添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    // config.headers = {
    //   'x-requested-with': '',
    //   authorization: '',
    // };
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

// 添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 你的业务数据
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    const { response } = error;
    if (response) {
      if (response.status === 404) {
        message.error('请求资源未发现');
      } else if (response.status === 403) {
        message.error(response.data.msg, () => {
          // window.location.href = '/admin/login';
        });
      } else {
        message.error(response.data.msg);
      }
    }

    return Promise.reject(error);
  },
);

export default instance;

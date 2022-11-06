/**
 * 封装http请求工具
 */
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建http调用者
const $http = axios.create({
    baseURL: '/api',
    timeout: 2000,
    headers: {
        "Content-Type": "application/json;chartset=utf-8"
    }
})

// 请求拦截：为请求header中增加token
$http.interceptors.request.use(config => {
    // baseURL/headers 属性可能不存在，若不存在设置默认值
    config.baseURL = config.baseURL || '';
    config.headers = config.headers || {};
    // 如果访问登录接口，则清除当前缓存token
    if (config.baseURL?.indexOf('/login') >= 0) {
        localStorage.removeItem('token');
        config.headers.token = null;
        return config;
    }
    if (localStorage.getItem('token')) {
        config.headers.token = localStorage.getItem('token') || '';
    }
    return config;
})

// 响应拦截：解析响应结果，返回数据或捕获异常
$http.interceptors.response.use(res => {

    if (res.data.code != 200) {
        ElMessage.error(res.data.message);
        return Promise.reject(res.data);
    }
    return res.data.data
}, err => {
    console.log(err);
})

export default $http;
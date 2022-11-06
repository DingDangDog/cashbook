/**
 * 封装http请求工具
 */
import axios from 'axios'
import openSet from './setUsetId'
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
$http.interceptors.request.use(async config => {

    let userId: any = localStorage.getItem('dddCashBookUserId');

    if (!userId) {
        await openSet();
    }

    // baseURL/headers 属性可能不存在，若不存在设置默认值
    config.baseURL = config.baseURL || 'none';
    config.headers = config.headers || {};

    if (userId) {
        config.headers.userId = userId || 'none';
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
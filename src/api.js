import Vue from 'vue'
import * as Config from '../env';
import axios from "axios";

// 配置axios
console.log("Config.baseUrl===>", Config.baseUrl);

axios.defaults.baseURL = Config.baseUrl; // 配置接口

// 添加请求拦截器
axios.interceptors.request.use(request => {
    // 可以添加请求头、或者添加token
    // 列如 config.headers.Authorization = token;
    return request;
}, error => {
    return Promise.reject(error);
})

// 添加响应拦截器
axios.interceptors.response.use(response => {
    // 响应成功需要做什么
    return response;
}, error => { // 错误处理
    if (error.response.status) {
        switch (error.response.status) {
            case 400: // 错误信息 参数二可以自定义错误，也可以是返回的错误提示
                this.$notify.error('错误提示','参数错误');
                break;
            // 未登录
            case 401:
                this.$router.replace({ // 跳回登录界面
                    path: '/login',
                });
                this.$notify.error('错误提示','token过期');
                break;
            case 422:
                this.$notify.error('错误提示','表单验证错误');
                break;
            case 500:
                this.$notify.error('错误提示','服务器错误');
                break;
            default:
                break;
        }
        return Promise.reject(error.response);
    }
});

Vue.prototype.$http = axios;

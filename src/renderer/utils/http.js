/**
 * Created by Administrator on 2022/1/5.
 */

import axios from "axios";
axios.defaults.adapter = require("axios/lib/adapters/http");
// import { localStorage } from '@/utils/storages';
import qs from "qs";

const config = {
    baseURL: process.env.VUE_APP_URL,
    timeout: 60000,
    validateStatus: function(status) {
        return status >= 200 && status < 500; // 默认的
    },
};

const service = axios.create(config);


// request拦截器
service.interceptors.request.use(
    config => {
        let token;
        let getToken = sessionStorage.getItem("token");
        if(getToken){
            token = JSON.parse(sessionStorage.getItem("token")).access_token;
        }
        if(token){
            config.headers["Authorization"] = "Bearer " + token;
            sessionStorage.setItem("token", getToken);
        }
        // 解决query无法传递数组的问题
        config.paramsSerializer = (params) => qs.stringify(params, {
            arrayFormat: "repeat",
        });

        console.log(config);

        return config;
    },
    err => {

        return Promise.reject(err);
    }
);

// 响应拦截器
service.interceptors.response.use(
    res => {
        return res;
    },
    err => {

        let errorMessageObject;
        errorMessageObject = err;

        return Promise.reject(errorMessageObject);
    }
);

function get(url, params = {}, config) {
    return service.get(url, { params, ...config });
}

function post(url, data, config) {
    return service.post(url, data, config);
}

function put(url, data, config) {
    return service.put(url, data, config);
}

export { get, post, put };

export default service;

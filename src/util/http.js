//封装axios
// const { default: axios } = require("axios");
import axios from 'axios'
// const { default: Toast } = require("vant");
import  { Toast } from "vant";

const http = axios.create({
    baseURL: 'https://m.maizuo.com',
    timeout:10000,
    headers:{
        "X-Client-Info": '{"a":"3000","ch":"1002","v":"5.0.4","e":"161381565233066953211905"}',
        "X-Host": "mall.film-ticket.film.info",
    }
})

//拦截器----------如果ajax请求进行完成,则继续执行
http.interceptors.request.use(function (config) {
    // 请求之前做参数配置

    //网速过慢时,正在加载提示
    Toast.loading({
        message: "加载中...",
        forbidClick: true, //是否禁止点击
        overlay: true, //是否有遮罩层
        duration: 0, //持续时间,0为一直持续
      });
    return config;
  }, function (error) {
    
    return Promise.reject(error);
  });


  http.interceptors.response.use(function (response) {
    //在响应的时候做

    //数据加载完成时,清除加载提示
    Toast.clear();
    return response;
  }, function (error) {
    
    return Promise.reject(error);
  });

export default http
import axios from "axios";
import store from "../store";

// export function request(config) {
//   // 1.创建axios实例
//   const instance = axios.create({
//     baseURL: '应coderwhy老师要求,接口地址不随意泄露,需要的朋友请找老师获取/api/w6',
//     timeout: 5000
//   })

//   // 2.axios的拦截器
//   instance.interceptors.request.use(config => {
//     // console.log(config)
//     return config
//   },err => {
//     console.log(err)
//   })

//   instance.interceptors.response.use(res => {
//     // console.log(res)
//     return res.data
//   },err => {
//     console.log(err)
//   })

//   // 3.发送真正的网络请求
//   return instance(config)
// }


/** 
 * 响应失败后的错误统一处理 
 * @param {Number} status 请求失败的状态码
 */
const errorHandle = (status, other) => {
  // 状态码判断
  switch (status) {
    // 400 服务器不理解请求的语法
    case 400:
      console.log("请求语法错误(400)");
      break;
    // 401 客户端无权访问该资源(未登录/token验证失败，一般跳转登陆界面)
    case 401:
      console.log("未授权，请重新登陆(401)");
      break;
    // 403 token过期/服务器请求限制(一般可以清除token并跳转登录页)
    case 403:
      console.log("服务器拒绝访问(403)");
      break;
    // 404 服务器找不到请求的资源
    case 404:
      console.log("请求的资源不存在(404)");
      break;
    // 408 服务器等候请求超时
    case 408:
      console.log("请求超时(408)");
      break;
    default:
      console.log(other);
      break;
  }
};

// 创建axios实例
const instance = axios.create({
  baseURL: "应coderwhy老师要求,接口地址不随意泄露,需要的朋友请找老师获取",
  timeout: 5000
});
// 设置post请求头
instance.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded;charset=UTF-8";

// 配置请求拦截器
instance.interceptors.request.use(
  // 请求成功
  config => {
    // 每次发送请求之前判断Vuex中是否存在token
    // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
    // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
    const token = store.state.token;
    token && (config.headers.Authorization = token);
    return config;
  },
  // 请求失败
  error => {
    return Promise.reject(error);
  }
);

// 配置响应拦截器
instance.interceptors.response.use(
  // (请求成功后)又分为结果的成功、结果的失败
  // 响应成功
  res => (res.status === 200 ? Promise.resolve(res.data) : Promise.reject(res)),
  // 响应失败
  err => {
    /**
     *  response包含的信息:
     *  (1) status 
     *  (2) data
     */
    const { response } = err; 
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message);
      return Promise.reject(response);
    } else {
      console.log("请求中断/断网了");
      return Promise.reject(err)
    }
  }
);

export default instance;

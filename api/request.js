import Request from 'luch-request'
const http = new Request({
	baseURL: 'http://157.122.54.189:9088',
	// #ifdef H5
	// 跨域请求时是否携带凭证（cookies）仅H5支持（HBuilderX 2.6.15+）
	withCredentials: true,
	// #endif
})

// 请求前拦截器
http.interceptors.request.use((config) => { // 可使用async await 做异步操作
  return config
}, config => { // 可使用async await 做异步操作
  return Promise.reject(config)
})
// 响应拦截器
http.interceptors.response.use((response) => { /* 对响应成功做点什么 可使用async await 做异步操作*/
	return response.data.res
}, (response) => { /*  对响应错误做点什么 （statusCode !== 200）*/
  console.log(response)
  return Promise.reject(response)
})
export default http

import axios from 'axios'

export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件 context 获取数据
// 插件必须作为默认导出
export default ({ store }) => {
  // 请求拦截器
 request.interceptors.request.use(function(config){
   const { user } = store.state 
   if(user && user.token) { 
    config.headers.Authorization = `Token ${user.token}`
    // 返回请求对象
   }
   return config
}, function(error){
  // 请求未发出时报错
  console.log(err)
  return Promise.reject(error)
})
// 响应拦截器
}

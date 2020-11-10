import { request } from '../plugins/request'

// email: '1101413469@qq.com',
// password: 'pan110650',
// username: 'pgg'

//登录
export const login = (data)=> request.post('/api/users/login', data)

// 注册
export const register = (data)=> request.post('/api/users', data)

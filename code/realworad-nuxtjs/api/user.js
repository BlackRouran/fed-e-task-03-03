import axios from '../utils/request'

// email: '1101413469@qq.com',
// password: 'pan110650',
// username: 'pgg'

//登录
export const login = (data)=> axios.post('/api/users/login', data)

// 注册
export const register = (data)=> axios.post('/api/users', data)

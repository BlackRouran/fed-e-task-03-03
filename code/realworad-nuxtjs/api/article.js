import axios from '../utils/request'

//文章列表
export const getArticles = (data)=> axios.get('/api/articles', data)


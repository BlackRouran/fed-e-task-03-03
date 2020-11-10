import { request } from '../plugins/request'

//标签
export const getTags = (data)=> request.get('/api/tags', data)


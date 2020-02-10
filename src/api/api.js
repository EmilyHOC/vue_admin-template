import axios from 'axios';


let base = 'http://39.98.207.235:8080/pine2'
// eslint-disable-next-line no-unused-vars
// http://localhost/8082
let base2 = '/api'

export const requestLogin = params => {
  return axios.post(`${base}/manage/user/v1/login`, params)
 // return axios.post(`${base2}/api/admin/login`,params)
}

/*
* 房源管理
* */
// 查询所有房源
export const getAllRoom = params => {
  return axios.get(`${base2}/api/room/getAll`, {params: params})
}
//新增房源
export const addNewRoom = params => {
  return axios.post(`${base2}/api/room/addNewRoom`, params)
}
//删除房源
export const deleteRoom = params => {
  return axios.delete(`${base2}/api/room/deleteRoom`, {params: params})
}
//修改房源
export const modifyRoom = params => {
  return axios.put(`${base2}/api/room/modifyRoom`, params)
}
//查找房源
export const searchRoom = params => {
  return axios.post(`${base2}/api/room/searchRoom`, params)
}

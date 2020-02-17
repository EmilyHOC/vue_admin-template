import axios from 'axios';


let base = 'http://39.98.207.235:8080/pine2'
// eslint-disable-next-line no-unused-vars
// http://localhost/8082
let base2 = '/api'
/*
* 登陆
* */
export const requestLogin = params => {
  //return axios.post(`${base}/manage/user/v1/login`, params)
  return axios.post(`${base2}/api/admin/login`,params)
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

/*
* 系统管理
* */
//获取所有的管理员
export const getAllAdmin = params => {
  return axios.get(`${base2}/api/admin/getAll`,{params: params})
}
//删除管理员
export const deleteAdmin = params =>{
  return axios.delete(`${base2}/api/admin/deleteAdmin`, {params: params})
}
//新增管理员
export const addNewAdmin = params => {
    return axios.post(`${base2}/api/admin/addNewAdmin`, params)
}
//修改管理员信息
export const modifyAdmin = params => {
    return axios.put(`${base2}/api/admin/modifyAdmin`, params)
}
//搜索管理员
export const searchAdminByName = params =>{
    return axios.post(`${base2}/api/admin/searchAdminByName`, params)
}
/*
* 客户管理
* */
//获取所有的客户
export const getAllCustom = params => {
    return axios.get(`${base2}/api/custom/getAllCustom`, {params:params})
}
//删除客户
export const deleteCustom = params => {
    return axios.delete(`${base2}/api/custom/deleteCustom`, {params: params})
}
//搜索客户
export const searchCustom =  params => {
    return axios.post(`${base2}/api/custom/searchCustomByName`, params)
}
//新增客户
export const newCustom = params => {
    return axios.post(`${base2}/api/custom/newCustom`, params)
}
//修改客户信息
export const modifyCustom = params => {
    return axios.put(`${base2}/api/custom/modifyCustom`, params)
}

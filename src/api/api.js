import axios from 'axios'

let base = 'http://39.98.207.235:8080/pine2'

export const requestLogin = params => {
  return axios
    .post(`${base}/manage/user/v1/login`, params)
    .then(res => res.data)
}

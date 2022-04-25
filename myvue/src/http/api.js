/**
 * 项目业务请求接口
 */

import request from './request'

//封装登录接口
export function LoginApi(data) {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}
// 左侧菜单栏
export function gitLeftLift() {
    return request({
        url: "/menus",
        method: "GET"
    })
}
// 用户列表
export function getUsersApi(params) {
    return request({
        url: "/users",
        method: "GET",
        params
    })
}
// 用户删除
export function delApi(data) {
    return request({
        url: "/users/" + data,
        method: "DELETE"
    })
}
// 用户添加
export function addUsersApi(data) {
    return request({
        url: "/users",
        method: "POST",
        data
    })
}
// 用户修改
export function editUsersApi(data) {
    return request({
        url: "/users/" + data.id,
        method: "PUT",
        data
    })
}
// 用户状态
export function editZtApi(data) {
    return request({
        url: `/users/${data.id}/state/${data.type}`,
        method: "PUT"
    })
}
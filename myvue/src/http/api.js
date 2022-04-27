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
// 分配用户角色
export function roleApi(data) {
    console.log(data);
    return request({
        url: `/users/${data.id}/role`,
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
// 角色列表请求
export function getRolesApi() {
    return request({
        url: "/roles",
        method: "GET"
    })
}

// 添加角色
export function RolesUserApi(data) {
    return request({
        url: "/roles",
        method: "post",
        data
    })
}
// 删除角色
export function delRolesApi(data) {
    return request({
        url: "/roles/" + data,
        method: "DELETE"
    })
}
// 编辑角色
export function editRolesApi(data) {
    return request({
        url: "/roles/" + data.id,
        method: "PUT",
        data
    })
}
// 权限
export function typeApi(params) {
    return request({
        url: `rights/${params}`,
        method: "GET"
    })
}
// 商品列表
export function goodsApi(params) {
    return request({
        url: "/goods",
        method: "GET",
        params
    })
}
// 角色授权
export function getRolesTypeApi(id, rids) {
    return request({
        url: `roles/${id}/rights`,
        method: "POST",
        data: { rids }
    })
}
// 删除指定角色授权
export function removeTypeApi(id, rid) {
    return request({
        url: `/roles/${id}/rights/${rid}`,
        method: "DELETE"
    })
}
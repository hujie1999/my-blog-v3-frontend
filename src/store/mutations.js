import { randomId } from '../utils/randomid'

//更新用户信息
export const modifyUserInfo = (state, obj) => {
    state.UserInfo = obj 
}

//重置用户信息
export const resetUserInfo = (state) => {
    state.UserInfo.islogin = false 
    state.UserInfo.token = '' 
    state.UserInfo.nickname = '游客'+randomId(10) 
    state.UserInfo.role = 'Tourist' 
    state.UserInfo.account = randomId(15) 
    state.UserInfo.uniqueid = randomId(16) 
    state.UserInfo.avatar = '' 
}
//更新用户token
export const modifyToken = (state, token) => {
    state.UserInfo.token = token 
}
//更新用户头像
export const modifyUserAvatar = (state, url) => {
    state.UserInfo.avatar = url 
}
//更新用户昵称
export const modifyUserNickname = (state, name) => {
    state.UserInfo.nickname = name 
}
//更新搜索关键字
export const modifyKeyWords= (state, text) => {
    state.keywords = text 
}

//更新用户未读信息条数
export const modifyUnReadNotiCount= (state, count) => {
    state.unreadnoticount = count 
}
//用户未读信息条数-1
export const reduceUnReadNotiCountbyOne= (state) => {
    state.unreadnoticount-=1
}

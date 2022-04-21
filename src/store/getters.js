//获取用户uniqueId
export const uniqueid = state => state.UserInfo.uniqueid
//获取用户avatar
export const avatar = state => state.UserInfo.avatar
//获取用户token
export const token = state => state.UserInfo.token
//获取用户信息
export const userinfo = state => state.UserInfo

//获取 用户信息的登陆状态
export const islogin = state => state.UserInfo.islogin
//获取搜索框 关键字
export const keywords = state => state.keywords
//获取未读信息条数
export const unreadnoticount = state => state.unreadnoticount
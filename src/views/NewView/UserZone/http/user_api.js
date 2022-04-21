import http from '../../../../http/http'

//获取博客收藏 （用户）
export function getCollectListUserAPI(params){
    return http.post('getcollectlistuser',params)
}
//博客取消收藏
export function uncollectuserAPI(params){
    return http.post('uncollectuser',params)
}

//获取所有头像
export function getavatarsAPI(){
    return http.get('getavatars')
}

//获取用户信息
export function getuserinfoAPI(params){
    return http.post('getuserinfo',params)
}
//用户更新头像
export function updateavatarAPI(params){
    return http.post('updateavatar',params)
}

//用户更新昵称 
export function updatenicknameAPI(params){
    return http.post('updatenickname',params)
}
//用户更新密码
export function updatepasswordAPI(params){
    return http.post('updatepassword',params)
}
//用户更新性别 
export function updategenderAPI(params){
    return http.post('updategender',params)
}
//用户更新邮箱 
export function updateemailAPI(params){
    return http.post('updateemail',params)
}
//用户更新手机
export function updatephonenumberAPI(params){
    return http.post('updatephonenumber',params)
}
//用户更新简介
export function updateintroductionAPI(params){
    return http.post('updateintroduction',params)
}

//Notification

//用户获取未读信息
export function getnotificationuserAPI(params){
    return http.post('getnotificationuser',params)
}

//用户 回复博客 评论和留言
export function writecommentandreplyAPI(params){
    return http.post('writecommentandreply',params)
}
//用户 回复留言板 评论和留言
export function writemessageandreplyAPI(params){
    return http.post('writemessageandreply',params)
}
//用户 将信息设为已读状态
export function setnotireadeduserAPI(params){
    return http.post('setnotireadeduser',params)
}
//用户 所有信息 设为已读
export function setallnotireadeduserAPI(params){
    return http.post('setallnotireadeduser',params)
}

//用户 将信息设为清除状态
export function setnoticleareduserAPI(params){
    return http.post('setnoticleareduser',params)
}
//用户 所有信息 设为清除
export function setallnoticleareduserAPI(params){
    return http.post('setallnoticleareduser',params)
}


//获取用户未读信息count
export function getunreadnoticountAPI(params){
    return http.post('getunreadnoticount',params)
}

//Blog 评论+1
export function addcommentcountAPI(params){
    return http.post('addcommentcount',params)
}



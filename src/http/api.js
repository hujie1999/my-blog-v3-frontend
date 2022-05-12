// import Vue from 'vue'
import http from './http'




//login
export function loginAPI(params){
    return http.post('login',params)
}
//regist
export function registAPI(params){
    return http.post('regist',params)
}
//刷新 token
export function refeshtokenAPI(){
    return http.post('refeshtoken')
}


//获取博客列表
export function blogslistAPI(params){
     return http.post('blogslist',params)
}
//获取博客列表count
export function blogslistcountAPI(){
    return http.get('blogslistcount')
}

//根据id检索博客
export function takeablogAPI(params){
    return http.post('takeablog',params)
}
//根据Blog_Id检索对应博客评论
export function blogcommentsAPI(params){
    return http.post('blogcomments',params)
}
//根据Blog_Id检索对应博客评论 count
export function blogcommentscountAPI(params){
    return http.post('blogcommentscount',params)
}

//获取分类列表
export function classlistAPI(){
    return http.get('classlist')
}
//根据分类名称检索博客
export function getblogbyclassAPI(params){
    return http.post('getblogbyclass',params)
}
//根据分类名称检索博客count
export function getblogbyclasscountAPI(params){
    return http.post('getblogbyclasscount',params)
}

//获取message页面
export function getmessagepageAPI(){
    return http.get('getmessagepage')
}
//message 页面留言
export function messagecommentsAPI(params){
    return http.post('messagecomments',params)
}
//message 页面留言count
export function messagecommentscountAPI(){
    return http.get('messagecommentscount')
}
//获取 about页面
export function getaboutpageAPI(){
    return http.get('getaboutpage')
}





//获取博客背景图片
export function getbackgroundimgAPI(){
    return http.get('getbackgroundimg')
}


//搜索博客
export function searchblogsAPI(params){
    return http.post('searchblogs',params)
}
//符合条件博客数量
export function searchblogscountAPI(params){
    return http.post('searchblogscount',params)
}


//留言板 写留言
export function writemessageAPI(params){
    return http.post('writemessage',params)
}
//博客 写评论 和回复
export function writecommentandreplyAPI(params){
    return http.post('writecommentandreply',params)
}

//message页面 写留言和回复
export function writemessageandreplyAPI(params){
    return http.post('writemessageandreply',params)
}


//获取博客收藏列表
export function getcollectlistAPI(params){
    return http.post('getcollectlist',params)
}

//博客收藏
export function collectAPI(params){
    return http.post('collect',params)
}
//博客取消收藏
export function uncollectAPI(params){
    return http.post('uncollect',params)
}
//博客点赞
export function likeAPI(params){
    return http.post('like',params)
}


//获取用户未读信息count
export function getunreadnoticountAPI(params){
    return http.post('getunreadnoticount',params)
}


//Blog 浏览+1
export function viewAPI(params){
    return http.post('view',params)
}

//Blog 评论+1
export function addcommentcountAPI(params){
    return http.post('addcommentcount',params)
}

//归档
//获取博客 id，title，createtime
export function getarrangedblogsAPI(){
    return http.get('getarrangedblogs')
}


//获取广告页面
export function getadvertisementAPI(){
    return http.get('/getadvertisement')
}

/**
 * 友链
 * hujie
 * 2022.05.12
 */

//获取全部友链
export function getallfriendlinkAPI(){
    return http.get('/getallfriendlink')
}


import http from '../http/http'

export const actionKeyWords = ({commit},text) => commit('modifyKeyWords', text)
//提交重置用户信息
export const actionResetUserInfo = ({commit}) => commit('resetUserInfo')

//refresh token
export const actionRefeshToken = (context) =>{
    return new Promise((resolve, reject) => {
        http.post('refeshtoken').then(res=>{
            if(res.data.code==2005){
                console.log('生成新token成功')
                context.commit('modifyToken',res.data.new_token)
                let old_userinfo = JSON.parse(window.localStorage.getItem("UserInfo"))
                old_userinfo.token = res.data.new_token
                window.localStorage.setItem('UserInfo',JSON.stringify(old_userinfo))
                return resolve(res)
            }
        }).catch(err=>{
            reject(err)
        })
    })
      
}
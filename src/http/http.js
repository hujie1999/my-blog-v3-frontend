/****   http.js   ****/
import store from '../store/index'
import request from './request'


const http ={
    
    get(url){
        const payload = {
            uniqueid : store.getters.uniqueid,
            islogin : store.getters.islogin
        }
        let config = {
            method: 'get',
            url:url,
            params : { ...payload }
        }
        return request(config)
    },
    post(url,params){
        let config = {
            method: 'post',
            url:url,   
        }
        const payload = {
            uniqueid : store.getters.uniqueid,
            islogin : store.getters.islogin
        }
        config.data = { ...payload,...params }
        return request(config)
    }
}

export default http
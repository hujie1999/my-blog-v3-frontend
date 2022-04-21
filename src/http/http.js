/****   http.js   ****/
import request from './request'
const http ={
    
    get(url){
        let config = {
            method: 'get',
            url:url,
        }
        return request(config)
    },
    post(url,params){
        let config = {
            method: 'post',
            url:url,
        }
        if(params)
        config.data = params
        return request(config)
    }
}

export default http
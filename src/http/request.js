/****   request.js   ****/
import axios from 'axios'
import QS from 'qs'
import store from '../store/index'
import router from '../router/index'
import Vue from 'vue'
import {
  MessageBox
} from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import setting from '../setting'
Vue.component(MessageBox)
Vue.prototype.$confirm = MessageBox.confirm
const v = new Vue()

const service = axios.create({
  baseURL: setting.frontendbaseapiurl,
  // timeout: 3 * 1000,
})
//请求拦截器
service.interceptors.request.use(

  config => {
    if (config.headers['Content-Type'] == 'multipart/form-data') {
      config.headers['Content-Type'] = 'multipart/form-data'
    } else {
      config.headers = {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
      config.data = typeof config.data == 'string' ? config.data : QS.stringify(config.data)
    }
    let token = store.getters.token
    if (token != '') {
      config.headers['Authorization'] = token
    }
    return config;
  },
  err => {
    return Promise.reject(err)
  }
)

//响应拦截器
let locker = false
//refresh locker
let refresh_locker = false
//未成功返回的请求列表
let fetch_list = []
service.interceptors.response.use(

  res => {
    res.data = QS.parse(res.data)
    //处理超时和其他token错误
    if (res.data.code == 2001 ||
      res.data.code == 2002) {
      let msg = res.data.msg
      if (!locker) {
        locker = true
        store.dispatch('actionResetUserInfo')
        // store.commit('modifyUserInfo',touristinfo)
        localStorage.removeItem('UserInfo')
        v.$confirm(msg, '提示', {
          confirmButtonText: '去登陆',
          cancelButtonText: '游客浏览',
          type: 'warning'
        }).then(() => {
          router.push('/login')
        }).catch(() => {
          router.history.go(0)
        });
      }


    }
    //处理 token 刷新
    else if (res.data.code == 2004) {
      // console.log(res.data)
      if (!refresh_locker) {
        refresh_locker = true
        let conf = res.config
        return store.dispatch('actionRefeshToken').then(res => {
          if (res.data.code == 2002) {
            let msg = res.data.msg
            v.$confirm(msg, '提示', {
              confirmButtonText: '去登陆',
              cancelButtonText: '游客浏览',
              type: 'warning'
            }).then(() => {
              router.push('/login')
            }).catch(() => {
              router.history.go(0)
            });
            return
          }
          conf.headers.Authorization = store.getters.token
          service(conf).then((res) => {
            try {
              fetch_list.forEach(v => v(store.getters.token))
            } catch (e) {
              console.log(e)
              router.go(0)
            }
            fetch_list = []
          }).catch(err => {
            console.log(err)
            router.go(0)
          })

        }).catch(err => {
          console.log(err)
          router.go(0)
          // router.push('/login')
        }).finally(() => {
          refresh_locker = false
        })


      } else {
        return new Promise(resolve => {
          fetch_list.push(tk => {
            // 将新的Token重新赋值
            res.config.headers.Authorization = tk
            resolve(service.request(res.config));
          });
        });
      }

    } else {
      return res
    }

  },
  err => {
    return Promise.resolve(err.message)
  }

)
export default service

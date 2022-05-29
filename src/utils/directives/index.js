import Vue from 'vue'
import { debounce,throttle,fixElement } from './common'

Vue.directive('debounce',{
    bind(el,binding,vnode){
        const [eventname, fn, delay=500] = binding.value
        el.addEventListener(eventname, debounce(vnode, fn, delay))
    }
})

Vue.directive('throttle',{
    bind(el,binding,vnode){
        const [eventname, fn, delay=1000] = binding.value
		el.addEventListener(eventname, throttle(vnode, fn, delay))
    }
})
Vue.directive('fixElement',{
    bind(el,binding,vnode){
        //offset 自定义偏移量 设置了margin，就不用设置偏移量
        const [eventname,delay=200,offset=0] = binding.value
		window.addEventListener(eventname, fixElement(el, vnode, delay,offset))
    }
})
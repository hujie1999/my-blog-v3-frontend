
//防抖
function debounce(bindObj, fn, delay) {
	return function(...args) {
		bindObj.$$timer && clearTimeout(bindObj.$$timer)
		bindObj.$$timer = setTimeout(() => {
			fn.apply(this, args)
		}, delay)
	}
}
//节流
function throttle(bindObj, fn, delay) {
	bindObj.$$prevTime = Date.now()
	return function(...args) {
		const nowTime = Date.now()
		if(nowTime - bindObj.$$prevTime > delay) {
			fn.apply(this, args)
			bindObj.$$prevTime = nowTime
		}
	}
}
//节流 （定时器版）
// function throttle(bindObj, fn, delay) {
// 	let canNext = true
// 	return function(...args) {

// 		if(!canNext){
// 			return
// 		}
// 		canNext = false
// 		bindObj.$$timer = setTimeout(function(){
// 			fn.apply(this, args)
// 			canNext = true
// 			clearTimeout(bindObj.$$timer)
// 		},delay)
// 	}
// }


//固定顶部
function fixElement (el,vnode,delay,offset){
	vnode.$$prevTime = Date.now()
	vnode.$$init = true
	return function(...args) {
		//保存元素初始化的 offset，作为从下向上滚动到原来该元素位置的依据
		if(vnode.$$init){
			vnode.$$initOffset = el.offsetTop
			vnode.$$init = false
		}
		const nowTime = Date.now()
		if(nowTime - vnode.$$prevTime > delay) {
			//元素距离可视窗口顶部高度           
			const eleH = el.getBoundingClientRect().top
			const scrollH = document.documentElement.scrollTop || document.body.scrollTop
			// const dis = document.defaultView.getComputedStyle(el.parentNode.parentNode,null).getPropertyValue('display')
			//向下滚动时判断
			if(eleH<=0+offset){
				el.style.position = 'fixed'
				el.style.top = 0+offset+'px'
				
                el.style.width = el.parentNode.offsetWidth+'px'	
			}
			//向上滚动时判断
            if( vnode.$$initOffset && scrollH<=vnode.$$initOffset ){
				//重置init
				vnode.$$init = true
                el.style.position = 'static'
                el.style.top = ''
                el.style.width = 'auto'
            }
			vnode.$$prevTime = nowTime
		}
	}
}
 
export {
	debounce,
	throttle,
	fixElement
}

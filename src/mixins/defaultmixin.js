export const defaultmixin ={
    data(){
        return {
            //分页器参数
            start:0,
            //length 根据页面，在setting.js中定义
            length:null,
            //total 在页面中根据api返回值定义
            total:null,
            current:1
        }
    },
    methods:{
        //翻页器 emit 函数，处理点击上下页后分页器参数
        // handlePagePrams(c,s){
        //     this.current = c
        //     this.start = s
        // }
        
        //回滚到页面顶部
        scrollToTop(){
            return new Promise((resolve)=>{
                window.scrollTo({
                    top:0,
                    left:0,
                    behavior: 'smooth'
                })
                resolve()
            })
        },
        //重置分页参数
        resetPageData(){
            this.current = 1
            this.start = 0
        }
    }
} 
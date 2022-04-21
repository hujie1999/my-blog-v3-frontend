<template>
  <div id="base-layout" class="base-layout">
      <div class="nav">
          <navigation></navigation>
      </div>

      <div class="content">
          <div class="main">
              <mainblock></mainblock>
          </div>
          <div class="aside" 
          v-show="handleShowSideBar"
          >
              <asideblock></asideblock>
          </div>
      </div>

      <div class="footer">
          <foot></foot>
      </div>
      
       <!-- back to top -->
      <clicktotop></clicktotop>
  </div>
</template>

<script>
import setting from '../setting'
import { 
    getbackgroundimgAPI,
    getunreadnoticountAPI
} from '../http/api'
import BlogNavigation from './components/BlogNavigation.vue'
import BlogAside from './components/BlogAside.vue'
import BlogMain from './components/BlogMain.vue'
import BlogFooter from './components/BlogFooter.vue'
import ClickToTop from '../components/ClickToTop/ClickToTop.vue'
export default {
    name:'BaseLayout',
    data() {
        return {
            backgroundimgurl:'',
            //不展示广告位(aside) 页面的path
            unshow_adv:['/details','/about','/message','/searched']

        }
    },
    computed: {
        handleShowSideBar(){
            return !this.unshow_adv.includes(this.$route.path)
        }     
    },
    components:{
        navigation:BlogNavigation,
        asideblock:BlogAside,
        mainblock:BlogMain,
        foot:BlogFooter,
        clicktotop:ClickToTop
    },
    methods:{
        //获取 用户未读信息 count
        getUserUnReadCount(){
            getunreadnoticountAPI({
                UniqueId:this.$store.getters.uniqueid
            }).then(res=>{
                this.$store.commit('modifyUnReadNotiCount',res.data.UnReadCount)
            }).catch(err=>{console.log(err)})
        },

        //获取背景图片
        getBackgroundImg(){
            getbackgroundimgAPI()
                .then(res=>{
                    let temp = Object.values(res.data)[0].Backgroung_Img
                    const url = setting.imgbaseurl+temp.substr(0,temp.length - 1)
                    document.querySelector('html').setAttribute('style',"background-image:"+`url("${url}")`)
                })
                .catch(err=>{
                    console.log(err)
                })
        }
        
    },
    created(){
        this.getBackgroundImg()
        //如果登录，则请求 轮询
        if(this.$store.getters.islogin){
            this.getUserUnReadCount()
            setInterval(()=>{
                this.getUserUnReadCount()
            },1000*60)
        }
        

        
    }
}
</script>

<style scoped>
#base-layout{
    height: 100vh;
    width: auto;  
}
.nav{
    height: auto;
}
.content{
    width: auto;
    min-height: calc(100vh - 182px );
    /* 80+80+10+10+1+1  = 182*/
    height: auto;
    margin: 0px auto;
    padding: 10px 0px;
    display: flex;
    flex-direction: row;   
    justify-content: center;
    
}
.footer{
    height: auto;
}
.aside{
    margin-left: 20px;
}

/* 屏幕尺寸>1920px时 --->xl*/

@media screen and (min-width: 1500px) {

    .main{
        height: auto;
        width:55% !important;
    }
    .aside{
        height: auto;
        width:20%;
    }
}
/* 屏幕尺寸>1200px时 --->lg*/
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .main{
    height: auto;
    width:55% !important;
  }
  .aside{
      height: auto;
      width:20%;
  }
}
/* 屏幕尺寸>992px ,<1200px时 --->md*/
@media screen and (min-width: 992px) and (max-width: 1200px) {
  .main{
    height: auto;
    width:60% !important;
  }
  .aside{
      display: none;
  }
}
/* 屏幕尺寸>768px, <992px时 --->sm*/
@media screen and (min-width: 768px) and (max-width: 992px) {
  .main{
    height: auto;
    width:75%;
  }
  .aside{
      display: none;
  }
}
/* 屏幕尺寸>0px , <768px时 --->xs*/
@media screen and (min-width: 0px) and (max-width: 768px) {
  .main{
    height: auto;
    width:90%;
  }
  .aside{
      display: none;
  }
}
</style>
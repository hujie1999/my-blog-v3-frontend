<template>
  <div id="zone-aside">

      <!-- <h2>ZoneAside</h2> -->
      <div class="user-avatar">
        <div class="avatar">
          <img :src="imgbaseurl+userinfo.avatar" alt="useravatar">
        </div>
      </div>
      <div class="user-nickname">
        <h3>{{userinfo.nickname}}</h3>
      </div>
      <div class="navigation-bar">
        <span 
        v-for="(nav,index) in navbar"
        :key="index"
        >
          
          <div class="nav-item" 
          :class="acitive==nav.path?'nav-active':''"
          @click="handleNavClick(nav.path)"
          >
          <el-badge 
          :value="index==2&&$store.getters.unreadnoticount!=0?$store.getters.unreadnoticount:''" 
          :max=99
          class="item">
            {{nav.title}}
          </el-badge>           
          </div>
        </span>
      </div>
  </div>
</template>

<script>
import setting from '../../../../../setting'

export default {
  name:'ZoneAside',
  data(){
    return{
      imgbaseurl:setting.imgbaseurl,
      userinfo:this.$store.getters.userinfo,
      navbar:[
        {
          title:'用户主页',
          path:'/userzone/userindex'
        },
        {
          title:'收藏文章',
          path:'/userzone/usecollection'
        },
        {
          title:'消息通知',
          path:'/userzone/usernotification'
        },
        {
          title:'个人资料',
          path:'/userzone/userinformation'
        },
      ],
      acitive:this.$route.path,
    }
  },
  computed:{

  },
  methods:{
    handleNavClick(p){
      this.acitive = p
      this.$router.push(p)
    },
  },
  created(){

  },

}
</script>

<style scoped>
#zone-aside{
   /* overflow: auto; */
    height: 100%;
    width: 150px;
    background: #fff;

    display: flex;
    align-items: center;
    flex-direction: column;
    border: 1px solid rgb(233, 230, 230);
    /* position: relative; */
}
.user-avatar{
  height: 90px;

  margin-top: 10%;
}
.avatar{
  height: 80px;
  width: 80px;
  /* background: darkkhaki; */
  border: 1px solid rgb(221, 218, 218);
  border-radius: 40px;
  overflow: hidden;
}
.avatar:hover{
  box-shadow: 0 0 5px 0 rgba(0 0 0 /20%);
}
.avatar img{
  width: 80px;
  height: 80px;
}
/* .user-nickname{

} */
.navigation-bar{
  height: auto;
  width: 100%;

  /* position: absolute;
  bottom: 0;  */
  margin-top: 20%;
}
.nav-item{
  cursor: pointer;
  
  margin-top: 2px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  
}
.nav-active{
  box-shadow: 0 0 5px 0 rgb(0 0 0/15%);
}


</style>
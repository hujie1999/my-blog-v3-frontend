<template>
  <div id="app" class="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  data(){
    return{}
  },
  computed:{
  },
  components:{
  },
  methods:{

  },
  created(){
    
    //刷新保存 store 的userinfo数据
    if (localStorage.getItem("UserInfo")) {
      this.$store.replaceState(this.$store.state,JSON.parse(localStorage.getItem("UserInfo")))
    } 
    window.addEventListener("beforeunload",()=>{
      localStorage.setItem("UserInfo",JSON.stringify(this.$store.getters.userinfo))
    })
  },
  mounted(){
    
  },
  watch:{
  }
}
</script>

<style>
body,html{
  margin: 0px;
  padding: 0px;
  width:100%;
  height: 100%;
}
/* 背景图片预设参数 */
html{
  background-repeat: no-repeat;
  background-attachment:fixed;
  background-size: cover;
  background-color: #f5f5f5;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* color: #2c3e50;  */
  color: #000000; 
  height: 100vh;
}

</style>

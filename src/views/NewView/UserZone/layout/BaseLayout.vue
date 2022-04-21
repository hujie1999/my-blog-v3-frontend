<template>
  <div id="user-zone-base-layout">
    <!-- <h2>this is userzone</h2> -->
    <div class="header">
      <ZoneHeader></ZoneHeader>
    </div>
    <div class="middle">
      <div class="aside">
        <ZoneAside></ZoneAside>
      </div>
      <div class="main">
        <ZoneMain></ZoneMain>
      </div>
    </div>
    <div class="footer">
      <ZoneFooter></ZoneFooter>
    </div>

    <!-- back to top -->
    <div>
      <BackToTop v-if="handleShowBackTop"></BackToTop>
    </div>
  </div>
</template>

<script>
import { 
  getunreadnoticountAPI
} from '../http/user_api'
import ZoneHeader from "./struction/ZoneHeader.vue";
import ZoneAside from "./struction/ZoneAside.vue";
import ZoneMain from "./struction/ZoneMain.vue";
import ZoneFooter from "./struction/ZoneFooter.vue";

import BackToTop from '../../../../components/ClickToTop/ClickToTop.vue'
export default {
  name: "UserZoneBaseLayout",
  data() {
    return {
      interval:null
    };
  },
  components: {
    ZoneHeader,
    ZoneAside,
    ZoneMain,
    ZoneFooter,
    BackToTop
  },
  computed:{
    handleShowBackTop(){
      return this.$route.name=='usecollection'
    }
  },
  methods: {
    //获取用户未读信息count
    getUserUnReadCount(){
      getunreadnoticountAPI({
        UniqueId:this.$store.getters.uniqueid
      }).then(res=>{
        this.$store.commit('modifyUnReadNotiCount',res.data.UnReadCount)
      }).catch(err=>{console.log(err)})
    }
  },
  created(){
    this.getUserUnReadCount()
    this.interval =  setInterval(()=>{
      this.getUserUnReadCount()
    },1000*60)
  },
  beforeDestroy(){
    clearInterval(this.interval)
  }
};
</script>

<style scoped>
#user-zone-base-layout {
  min-height: 100vh;
  height: auto;
  width: auto;
    /* background: black; */
  display: flex;
  flex-direction: column;
  overflow: hidden;
   box-sizing: content-box;
   background: #fff;
}
.header{
   margin-bottom: 5px;
}
.middle {
  display: flex;
  flex-direction: row;
  margin-bottom: 5px;
}
.aside {
  height:calc(100vh - 120px);
  width: auto;
}
.main{
    margin: 0 5px;
    overflow: hidden;
    width: calc(100vw - 160px);
}
@media screen and (min-width: 0px) and (max-width:520px) {
    .aside {
      display: none;
    }
    .main{
      /* width: 100vw; */
      width: 100%;
      min-height:calc(100vh - 120px);
      height: auto;
  }
}
</style>
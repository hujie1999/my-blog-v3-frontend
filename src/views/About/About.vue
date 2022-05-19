<template>
  <div id="about-page">
      <!-- <h1>this is about</h1> -->


      <!-- 关于为空 -->
      <div class="empty-fromat-control"
      v-show="about_info.length==0 && !load"
      >
        <div>
            <h1>Sorry..</h1>
            <h1>Introduction Is Empty</h1>
            <h3>可能的情况：</h3>
            <ul>
                <li><h4>1.管理员未编辑介绍</h4></li>
                <li><h4>2.网络问题</h4></li>
                <li><h4>3.有 BUG !</h4></li>
            </ul>
          </div>
      </div>
      <!-- 不为空 -->
      <div class="formate-control"
      v-show="about_info.length!=0"
      >
        <div class="title-area">
          <span v-text="about_info.About_Tittle"></span>
        </div>
        <div class="markdown-area">
          <markdown
            :value="about_info.About_Content"
          >
          </markdown>   
        </div>
      </div>
  </div>
</template>

<script>
import MarkDown from '../../components/MarkDown/MarkDown.vue'
import { getaboutpageAPI } from '../../http/api'
export default {
    name:'About',
    data(){
      return{
        about_info:[],
        load:true
      }
    },
    components:{
      markdown:MarkDown
    },
  
    methods:{
      getAboutPage(){
        getaboutpageAPI().then(res=>{
          this.about_info = Object.values(res.data)[0]
        }).catch(err=>{console.log(err)})
        .finally(()=>{
          this.load = false
        })
      }
    },
    created(){
      this.getAboutPage()
    }
}
</script>

<style scoped>
#about-page{
  height: auto;
  width: 100%;
  min-height: 600px;
  border: none;
  padding-top: 20px;
}
.empty-fromat-control{
  height: 400px;
  width: auto;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  align-items: center;
}
/* 博客区域 格式控制 */
#about-page .formate-control {
  width: auto;
  height: auto;
  min-height: 400px;
  border: 1px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  background: #fff !important;
  padding-bottom: 20px;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
}
#about-page .title-area{
  padding: 20px 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 25px !important;
  /* border-bottom: 1px solid #e7ebf1; */
}
</style>
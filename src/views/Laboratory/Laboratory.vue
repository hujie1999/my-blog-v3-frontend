<template>
  <div id="laboratory-page">
      <!-- <h1>this is Laboratory</h1> -->
      <span class="tittle show-link-tip">
        友链
        <i class="el-icon-edit"></i>
      </span>
      <!-- 友链展示区域 -->
      <div class="friends-link-area">
        <el-row>
            <el-col :xs="12" :sm="8" :md="8" :lg="8" :xl="8"
            v-for="(item,index) in linklist" :key="index"
            >
              <a class="friends-link-item"
              :href="item.FriendWebLink" target="_blank"
              >
                <div class="link-avatar">
                  <img :src="item.FriendWebAvatar" alt="avatar">
                </div>
                <div class="link-name">
                  <strong>{{item.FriendWebName}}</strong>
                </div>
                <div class="link-desc">
                  <span>{{item.FriendWebDesc}}</span>
                </div>
              </a>
            </el-col>
        </el-row>
          
        
      </div>
      <span class="tittle show-other-tip">
        其他
        <i class="el-icon-s-open"></i>
      </span>

  </div>
</template>

<script>
// import identityTag from '../../components/CommentIdentityTag/IdentityTag.vue'
import {
  getallfriendlinkAPI
} from '@/http/api.js'
export default {
    name:'Laboratory',
    data(){
      return{
        linklist:[]
      }
    },
    components:{
    },
    methods:{
      getAllFriendLink(){
        getallfriendlinkAPI().then(res=>{this.linklist = Object.values(res.data)}).catch(err=>{console.log(err)})
      }
    },
    created(){
      this.getAllFriendLink()
    }
}
</script>

<style scoped>
#laboratory-page{
  color:#000000;
}
.tittle{
  font-size: 22px;
  font-weight: bold;
  padding: 10px 0px;
}
.show-link-tip:hover:after{
  content: '加友链可以在留言板留言哦...';
  font-size: 14px;
  font-weight: 200;
  padding: 5px;
  margin: 0px 0px 0px 5px;
  color: #fff;
  background: #000;
  border-radius: 5px;
}
.show-other-tip:hover:after{
  content: '其他内容正在建设中...';
  font-size: 14px;
  font-weight: 200;
  padding: 5px;
  margin: 0px 0px 0px 5px;
  color: #fff;
  background: #000;
  border-radius: 5px;
}
.el-row{
  height: auto !important;
  display: flex !important;
  flex-wrap: wrap;
}
.friends-link-area{
  margin: 10px 0px;
  height: auto;
  width: 100%;
  min-height: 350px;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}
.friends-link-item{
  min-height: 110px;
  height: auto;
  width: auto;
  margin: 10px 5px;
  padding: 5px;
  border-radius: 5px;
  border: 1px solid #f1f0f0;
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-direction: column;
}
.friends-link-area a{
  text-decoration: none;
  color: #000;
}
.friends-link-item:hover{
  background: #fafafa;
  /* background: #e7f0f0; */
  
}
.link-avatar{
  height: 60px;
  width: 60px;
  background: #fff;
  overflow: hidden;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #eee;
  flex-shrink: 0;
}
.link-avatar img{
  height: 100%;
  width: 100%;
}

.link-name{
  padding: 5px 0px 0px 0px;
}
.link-desc{
  font-size: 12px;
  padding: 5px 0px 0px 0px;
}
</style>
<template>
    <div id="message-page">
      <!-- 留言板为空 -->
      <div class="empty-fromat-control"
      v-show="content.length==0 && !load"
      >
        <div>
            <h1>Sorry,</h1>
            <h1>Mseeage Is Empty</h1>
            <h3>可能的情况：</h3>
            <ul>
                <li><h4>1.管理员未编辑留言板</h4></li>
                <li><h4>2.网络问题</h4></li>
                <li><h4>3.有 BUG !</h4></li>
            </ul>
          </div>
      </div>
      <!-- 留言板文本 -->
      <div class="formate-control"
      v-if="content.length!=0"
      ref="message_block"
      >
          <div class="title-area">
              <p v-text="content.Message_Title"></p>
          </div>
        <div class="markdown-area">
          <markdown
            :value="content.Message_Content"
          >
          </markdown>   
        </div>
      </div>

      <!-- 留言 -->
      <div class="message-formate-control"
      v-if="content.length!=0"
      >
          <messagecomment
          ref="messagecomment"
          :message="comments"
          :all="all_total"
          :Message_Author_UniqueId="content.Message_Author_UniqueId"
          :Message_Author_Role="content.Message_Author_Role"
          :Message_Author_NickName="content.Message_Author"
          :Message_Author_Account="content.Message_Author_Account"
          :Message_Author_Avatar="content.Message_Author_Avatar"
          @transWriteMessage="handleWriteMessage"
          >
          </messagecomment>
      </div>

      <!-- 分页器 -->
      <div 
      v-show="comments.length!=0"
      class="pagenation-formate-control">
          <pagenation
          :current="current"
          :start="start"
          :length="length"
          :total="total"
          @transPageParams="handlePagePrams"
          >
          </pagenation>
      </div>

  </div>
</template>

<script>
import { defaultmixin } from '../../mixins/defaultmixin'
import setting from '../../setting'
import MarkDown from '../../components/MarkDown/MarkDown.vue'
import MessageComments from '../../components/Comment/MessageComments.vue'
import Pagenation from '../../components/Pagenation/Pagenation.vue'
import {
  getmessagepageAPI,
  messagecommentsAPI,
  messagecommentscountAPI,
} from '../../http/api'

export default {
  name:'Message',
  mixins:[defaultmixin],
  data(){
    return{
      //留言 预设文本
      content:[],
      //留言
      comments:[],
      //分页参数
      length:setting.message.comments_length,
      load:true,
      //所有一级 二级评论总数
      all_total:0
    }
  },
  components:{
    markdown : MarkDown,
    messagecomment : MessageComments,
    pagenation : Pagenation

  },
  methods:{
    getMessagePage(){
      getmessagepageAPI().then(res=>{
        this.content = Object.values(res.data)[0]    
      }).catch(err=>{console.log(err)})
      .finally(()=>{this.load = false})
    },

    getComments(){
      messagecommentsAPI({
        Start:this.start,
        Length:this.length
      }).then(res=>{
        this.comments = Object.values(res.data)

      }).catch(err=>{console.log(err)})
    },
    getCommentsCount(){
      messagecommentscountAPI().then(res=>{
        this.total = res.data.total
        this.all_total = res.data.all
      }).catch(err=>{console.log(err)})
    },
    async initFunc(){
      await this.getMessagePage()
      await this.getComments()
      await this.getCommentsCount()
    },
    async fetchAgain(){
      await this.getComments()
      await this.getCommentsCount()
    },
    handlePagePrams(c,s){
      this.current = c
      this.start = s
      setTimeout(() => {
        //清零 comments组件保存的 ‘判断显示二级评论’数组 show_append_data
        this.$refs.messagecomment._data.show_append_data = [];
        //获取评论
        this.fetchAgain()
        this.scrollToComment()
      }, 0);   
    },
    handleWriteMessage(level){
      if(level==0){
        this.current = 1
        this.start = 0
        this.total = 0
        this.scrollToComment()
      }
      else if(level == 1 || level == 2){
        this.total = 0
      }
      this.fetchAgain()
    },
    scrollToComment(){
      let blogblockH = this.$refs.message_block.clientHeight
      window.scrollTo({
        top: blogblockH+110,
        behavior:'smooth'
      })
    }
  },
  async created(){
    this.initFunc()
  }
}
</script>

<style scoped>

#message-page{
  height: auto;
  width: 100%;
  min-height: 600px;
  border: none;
  /* background: #fff; */
}
.empty-fromat-control{
  height: 400px;
  width: auto;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;

  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}
/* 博客区域 格式控制 */
.formate-control {
  width: auto;
  height: auto;
  min-height: 400px;
  border: 1px solid #fff;
  border-radius: 5px;
  overflow: hidden;
  background: #fff;
  padding-bottom: 20px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}
/* 留言板区域 格式控制 */
.message-formate-control{
    margin-top: 30px;
    min-height: 400px;
    width: auto;
    height: auto;
    border: 1px solid #fff;
    border-radius: 5px;
    overflow: hidden;
    background: #fff;
    overflow: hidden;
    box-shadow: 0 0 10px rgb(0 0 0 / 10%);
}
.pagenation-formate-control{
  height: auto;
  width: auto;
  display: flex;
  justify-content: center;
  
}
#message-page .title-area{
  display: flex;
  justify-content: center;
  font-size: 25px !important;
  border-bottom: 1px solid #e7ebf1;
}
</style>
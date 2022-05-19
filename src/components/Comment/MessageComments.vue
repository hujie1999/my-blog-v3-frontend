<template>
  <div id="message-area">
    <!-- 写评论  textarea-->
    <div class="write-comment-area">
      <div class="title">
        <span>发表评论</span>
      </div>
      <p style="font-size: 12px; color: red; padding-top: 5px">
        *注意，发布的评论也会提交至审核，不当的言论会被删除
      </p>
      <div class="textarea">
        <el-input
          type="textarea"
          placeholder="请输入内容"
          v-model="textarea"
          :autosize="{ minRows: 3}"
          maxlength="1000"
          show-word-limit
        >
        </el-input>
      </div>
      <el-button
        type="primary"
        size="medium"
        @click="writeComment"
        :disabled="writemessage_locker"
      >
        提交评论
      </el-button>
    </div>
    <!-- 回复为空时展现内容  -->
    <div class="empty-message" 
    v-show="message.length == 0">
      <h3>还没有评论</h3>
      <h3>试试发表第一条评论吧</h3>
    </div>

    <!-- 回复 不为空时展现内容  -->
    <div v-show="message.length != 0">
      <!-- 第一层评论 -->
      <div class="show-comments-area">
        <div class="title">
          <span>留言</span>
          <span style="font-size:14px;font-weight:400">({{all}})</span>
        </div>
        <hr v-once />

        <div
          class="first-level"
          v-for="items in message"
          :key="items.Comment_Id"
        >
          <div class="first-level-panel">
            <div class="avatar-area">
              <span
              v-if="items.Comment_Person_Avatar"
              >
                <img v-once :src="imgbaseurl+items.Comment_Person_Avatar" alt="user-avatar">
              </span>
              <span
              v-else
              >
                <img v-once :src="img[Math.floor(Math.random() * 6)]" alt="tourist-avatar">
              </span>
            </div>
            <div class="comment-area">
              <div class="comment">
                <div class="nickname">
                  <span v-text="items['Comment_Person_Name'] + '：'"></span>
                  <span class="identity-tag is-author"
                  v-if="items['Comment_Person_Id']==Message_Author_UniqueId"
                  >
                    作者
                  </span>
                  <span class="identity-tag is-admin"
                  v-show="items['Comment_Person_Role']=='Admin'"
                  >
                    管理
                  </span>
                  <span class="identity-tag is-tourist"
                  v-show="items['Comment_Person_Role']=='Tourist'"
                  >
                    游客
                  </span>
                  <span class="identity-tag is-user"
                  v-show="items['Comment_Person_Role']=='User'"
                  >
                    用户
                  </span>
                </div>
                <div class="time">
                  <span>{{ items["Create_Time"] | dateFormat }}</span>
                </div>
                <div class="message">
                  <span v-text="items['Comment_Content']"></span>
                </div>
              </div>
              <div class="opration">
                <div
                  class="reply-area"
                  @click="
                    wirteReply({
                      Comment_Level: 2,
                      Comment_Id: '',
                      Root_Comment_Id: items['Comment_Id'],
                      Father_Comment_Id: items['Comment_Id'],
                      Comment_Person_Role: '',
                      Comment_Person_Acc: '',
                      Comment_Person_Name: '',
                      Comment_Person_Id: '',
                      Comment_Person_Avatar: '',
                      Parent_Person_Role: items['Comment_Person_Role'],
                      Parent_Person_Acc: items['Comment_Person_Acc'],
                      Parent_Person_Name: items['Comment_Person_Name'],
                      Parent_Person_Id: items['Comment_Person_Id'],
                      Parent_Person_Avatar: items['Comment_Person_Avatar'],
                      Comment_Content: '',
                    },1,{Parent_Person_Name: items['Comment_Person_Name']})
                  "
                >
                  <span>回复</span>
                </div>
                <div class="like-area">
                  <span v-text="items['Likes_Count']"></span>
                  <i class="iconfont icon-dianzan"></i>
                </div>
              </div>
              <span v-show="items['reply'].length != 0">
                <div
                  class="expend-btn"
                  v-if="!handleAppendShow(items['Comment_Id'])"
                  @click="showAppend(items['Comment_Id'])"
                >
                  <span>---</span>
                  <span>点击展开 </span>
                  {{ items["reply"].length }}
                  <span> 条回复</span>
                  <span>---</span>
                </div>
                <div
                  class="hide-expend-btn"
                  v-else
                  @click="hideAppend(items['Comment_Id'])"
                >
                  <span>---</span>
                  <span>点击收起 </span>
                  <span>---</span>
                </div>
              </span>
              
            </div>
          </div>

          <appendreplytextarea
          v-if="handleAppendTextAreaShow(items['Comment_Id'])"
          :replyedpersoninfo="replyed_person_name"
          @transReply="handleReply"
          @transCancel="handleCancel"
          >
          </appendreplytextarea>
          <!-- 第二层评论 -->
           
          <span v-show="handleAppendShow(items['Comment_Id'])">
            <div
              class="second-level"
              v-for="it in items.reply"
              :key="it.Comment_Id"
            >
            <hr>
              <div class="second-level-format-control">
                <div class="avatar-area">
                 <span
                  v-if="it.Comment_Person_Avatar"
                  >
                    <img v-once :src="imgbaseurl+it.Comment_Person_Avatar" alt="user-avatar">
                  </span>
                  <span
                  v-else
                  >
                    <img v-once :src="img[Math.floor(Math.random() * 6)]" alt="tourist-avatar">
                  </span>
              </div>
              <div class="comment-area">
                <div class="comment">
                  <div class="nickname">
                    <span>{{ it["Comment_Person_Name"] }}</span> 
                    <span class="identity-tag is-author"
                    v-show="it['Comment_Person_Id']==Message_Author_UniqueId"
                    >
                      作者
                    </span>
                    <span class="identity-tag is-admin"
                    v-show="it['Comment_Person_Role']=='Admin'"
                    >
                      管理
                    </span>
                    <span class="identity-tag is-tourist"
                    v-show="it['Comment_Person_Role']=='Tourist'"
                    >
                      游客
                    </span>
                    <span class="identity-tag is-user"
                    v-show="it['Comment_Person_Role']=='User'"
                    >
                      用户
                    </span>
                    <span class="identity-tag is-master"
                    v-show="it['Comment_Person_Id']==items['Comment_Person_Id']"
                    >
                      楼主
                    </span>
                    <span style="font-size: 10px;padding:0px 5px">@</span>
                    <span>{{ it["Parent_Person_Name"] }}</span>

                    <span class="identity-tag is-author"
                    v-show="it['Parent_Person_Id']==Message_Author_UniqueId"
                    >
                      作者
                    </span>
                    <span class="identity-tag is-admin"
                    v-show="it['Parent_Person_Role']=='Admin'"
                    >
                      管理
                    </span>
                    <span class="identity-tag is-tourist"
                    v-show="it['Parent_Person_Role']=='Tourist'"
                    >
                      游客
                    </span>
                    <span class="identity-tag is-user"
                    v-show="it['Parent_Person_Role']=='User'"
                    >
                      用户
                    </span>
                    <span class="identity-tag is-master"
                    v-show="it['Father_Comment_Id']==it['Root_Comment_Id']"
                    >
                      楼主
                    </span>

                    <span> :</span>
                  </div>
                  <div class="time">
                    <span>{{ it["Create_Time"] | dateFormat }}</span>
                  </div>
                  <div class="message">
                    <span v-text="it['Comment_Content']"></span>
                  </div>
                </div>
                <div class="opration">
                  <div class="reply-area" 
                  @click="wirteReply({
                      Comment_Level: 2,
                      Comment_Id: '',
                      Root_Comment_Id: items['Comment_Id'],
                      Father_Comment_Id: it['Comment_Id'],
                      Comment_Person_Role: '',
                      Comment_Person_Acc: '',
                      Comment_Person_Name: '',
                      Comment_Person_Id: '',
                      Comment_Person_Avatar: '',
                      Parent_Person_Role: it['Comment_Person_Role'],
                      Parent_Person_Acc: it['Comment_Person_Acc'],
                      Parent_Person_Name: it['Comment_Person_Name'],
                      Parent_Person_Id: it['Comment_Person_Id'],
                      Parent_Person_Avatar: it['Comment_Person_Avatar'],
                      Comment_Content: '',
                  },2,{Parent_Person_Name: it['Comment_Person_Name']})">
                    <span>回复</span>
                  </div>
                  <div class="like-area second-like-area">
                    <span v-text="it['Likes_Count']"></span>
                    <i class="iconfont icon-dianzan"></i>
                  </div>
                </div>
              </div>

              </div>

              <appendreplytextarea
              
              v-if="handleAppendTextAreaShow(it['Comment_Id'])"
              
              :replyedpersoninfo="replyed_person_name"
              @transReply="handleReply"
              @transCancel="handleCancel"
              >
              </appendreplytextarea>
            </div>

          </span>
          <hr />
          

        </div>
        
      </div>
      
    </div>

    <!-- 写回复时展现的textarea 弃用 -->
    <!-- <replytextarea
      v-if="replaytextarea_show"
      :replyedpersoninfo="replyed_person_name"
      @transReply="handleReply"
      @transCancel="handleCancel"
    >
    </replytextarea> -->
  </div>
</template>

<script>
import {
  writemessageandreplyAPI,
} from "../../http/api";
import setting from '../../setting'
// import ReplyTextArea from "../Textarea/ReplyTextArea.vue";
import AppendReplyTextArea from '../Textarea/AppendReplyTextArea.vue';
export default {
  name: "BlogComments",
  data() {
    return {
      imgbaseurl:setting.imgbaseurl,
      textarea: "",
      img: [
        require("../../assets/headphoto1.svg"),
        require("../../assets/headphoto2.svg"),
        require("../../assets/headphoto3.svg"),
        require("../../assets/headphoto4.svg"),
        require("../../assets/headphoto5.svg"),
        require("../../assets/headphoto6.svg"),
      ],
      show_append_data:[],
      //写博客评论 的锁
      writemessage_locker: false,
      //显示 隐藏 回复的textarea
      // replaytextarea_show: false,

      //reply text commentid
      reply_textarea_commentid: '',
      //回复人信息+回复信息
      reply_info: {},
      //回复的层级
      reply_level:'',
      // 被回复人名称
      replyed_person_name:''

    };
  },
  props: {
    message: {
      type:Array,
    },
    all:{
      type : Number,
      default : 0
    },
    Message_Author_UniqueId:"",
    Message_Author_Role:"",
    Message_Author_NickName:"",
    Message_Author_Account:"",
    Message_Author_Avatar:"",
    transWriteMessage: {
      type: Function,
    },

  },
  computed: {
     handleAppendShow() {
      return (id) => {
        return this.show_append_data.includes(id);
      };
    },
    handleAppendTextAreaShow(id) {
      return (id) =>{
        return this.reply_textarea_commentid == id
      }
    }

  },
  components: {
    // replytextarea: ReplyTextArea,
    appendreplytextarea: AppendReplyTextArea
  },
  methods: {
    showAppend(id) {
      this.show_append_data.push(id);
    },
    hideAppend(id) {
      let instance = this.show_append_data.filter((v) => {
        return v!=id
      });
      setTimeout(()=>{
        this.show_append_data= []
        this.show_append_data = instance
      },0)
    },

    //回复成功
    replySuccessed(){
      this.$message({
        message: '评论/回复 成功！',
        type: 'success'
      });
    },
    //回复失败
    replyFailed(){
      this.$message({
        message: '评论/回复 失败！',
        type: 'error'
      });
    },
    //写留言评论
    writeComment() {
      //1.先判断非法输入
      if(this.textarea.split(' ').join('').length==0){
        this.textarea=''
        this.$message({
          message:'输入为空！请重新输入！',
          type:'error',
          duration:3000,
          center:true,
          showClose:true
        })
        return
      }
      this.writemessage_locker = true;
      let userinfo = this.$store.getters.userinfo;

      let presend = {
        Blog_Id: this.Blog_Id,
        Blog_Title: this.Blog_Title,
        Comment_Level: 1,
        //Comment_Id 后端生成
        // Comment_Id: randomId(16),
        Root_Comment_Id: "",
        Father_Comment_Id: "",
        Comment_Person_Role: userinfo.role,
        Comment_Person_Acc: userinfo.account,
        Comment_Person_Name: userinfo.nickname,
        Comment_Person_Id: userinfo.uniqueid,
        Comment_Person_Avatar: userinfo.avatar,
        Parent_Person_Role: this.Message_Author_Role,
        Parent_Person_Acc: this.Message_Author_Account,
        Parent_Person_Name: this.Message_Author_NickName,
        Parent_Person_Id: this.Message_Author_UniqueId,
        Parent_Person_Avatar: this.Message_Author_Avatar,
        Comment_Content: this.textarea,
      };
      // console.log(presend)
      writemessageandreplyAPI({ message: presend })
        .then((res) => {
          if (res.data.code == 1014) {
            // console.log("评论成功");
            this.replySuccessed()
            this.$emit("transWriteMessage",0);
            this.writemessage_locker = false;
            this.textarea = "";
            this.all+=1
          } else if (res.data.code == 1015) {
            this.replyFailed()
            // console.log("评论失败");
            this.writemessage_locker = false;
          }
        })
        .catch((err) => {
          this.writemessage_locker = false;
          console.log(err);
        });
    },
    //点击 回复按钮
    wirteReply(obj,level,info) {
      this.reply_textarea_commentid = obj.Father_Comment_Id

      this.reply_level = level
      this.replyed_person_name =info.Parent_Person_Name
      
      let userinfo = this.$store.getters.userinfo
      let param = obj

      param.Blog_Id = this.Blog_Id,
      param.Blog_Title= this.Blog_Title,
      // param.Comment_Level = 2,
      // param.Comment_Id:'randomId(16)',
      // param.Root_Comment_Id:items['Comment_Id'],
      // param.Father_Comment_Id:items['Comment_Id'],
      param.Comment_Person_Role=userinfo.role,
      param.Comment_Person_Acc=userinfo.account,
      param.Comment_Person_Name=userinfo.nickname,
      param.Comment_Person_Id=userinfo.uniqueid,
      param.Comment_Person_Avatar=userinfo.avatar,
      // param.Parent_Person_Role:items['Comment_Person_Role'],
      // param.Parent_Person_Acc:items['Comment_Person_Acc'],
      // param.Parent_Person_Name:items['Comment_Person_Name'],
      // param.Parent_Person_Id:items['Comment_Person_Id'],
      // param.Parent_Person_Avatar:items['Comment_Person_Avatar'],
      param.Comment_Content='',
      

      setTimeout(()=>{
        this.reply_info = Object.assign(param)
      },0)
    },

    handleReply(reply) {
      if(reply.split(' ').join('').length==0){
        this.$message({
          message:'输入为空！请重新输入！',
          type:'error',
          duration:3000,
          center:true,
          showClose:true
        })

        return
      }
      this.reply_info.Comment_Content = reply
      setTimeout(()=>{
        writemessageandreplyAPI({ message: this.reply_info})
        .then((res) => {
          if (res.data.code == 1014) {
            // console.log("回复成功");
            this.replySuccessed()
            this.handleCancel()
            this.$emit("transWriteMessage",this.reply_level);
            //当回复后，用于打开显示更多按钮,展示子评论
            this.showAppend(this.reply_info['Root_Comment_Id'])
            this.replyed_person_name = ''
            this.reply_info = {}
            this.all +=1
          } else if (res.data.code == 1015) {
            this.replyFailed()
            this.reply_info = {}
            this.replyed_person_name = ''
            // console.log("回复失败");
          }
        })
        .catch((err) => {
          this.reply_info = {}
          this.replyed_person_name = ''
          console.log(err);
        });

      },0)
    },
    handleCancel() {
      this.reply_textarea_commentid = ''
      this.replyed_person_name = ''
    },
  },
  created(){
  },
  watch: {
  },
};
</script>

<style>
@import url("../../assets/incos/iconfont.css");
#message-area {
  width: 100%;
  height: auto;
  min-height: 500px;
  padding-top: 10px;
}
#message-area hr {
  width: 100% !important;

  border-top: 1px solid #e7ebf1 !important;
  border-bottom: none !important;
  border-left: none !important;
  border-right: none !important;
}
/* 回复为空时展现内容 */
.empty-message {
  text-align: center;
  height: 300px;
  width: auto;
  /* background: chocolate; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  line-height: 10px;
}

/* identity-tag 身份标签 */
.identity-tag{
  margin-left: 5px;
  /* border: 1px solid black; */
  height: 16px;
  /* width: 28px; */
  width: auto;
  padding: 1px 5px;
  text-align: center;
  line-height: 16px;
  font-size: 12px !important;
  border-radius: 2px;
  color: #eee;
  overflow: hidden;
}
.is-author{
  background: #ff7043;
}
.is-admin{
  background: #ffab40;
}

.is-tourist{
  background: #00c853;
  /* background: #795548; */
  
}
.is-user{
  background: #ba68c8;
}
.is-master{
  
  background: #2979ff;
}

.write-comment-area {
  margin: 0px 10px;
}
.el-textarea__inner {
  font-size: 13px !important;
  color: black !important;
  font-weight: 100 !important;
  text-indent: 2em;
}
.write-comment-area .title {
  width: 100%;
  height: auto;
  text-align: start;
  font-size: 18px;
  /* margin-left: 20px; */
  font-weight: bold;
}

.write-comment-area .textarea {
  width: 100%;
  height: auto;
  border-radius: 10px;
  margin: 10px 0px 5px 0px;
}
.write-comment-area textarea {
  font-size: 16px;
  font-weight: 600;
}
.show-comments-area {
  width: auto;
  height: auto;
  min-height: 500px;
  /* background: #fff; */
  border-radius: 10px;
  margin-top: 20px;
}
.show-comments-area .title {
  margin-left: 10px;
  font-size: 18px;
  font-weight: bold;
}
.first-level-panel {
  width: auto;
  height: auto;
  display: flex;
}
.first-level-panel .avatar-area {
  width: 80px;
  height: 80px;
  /* 禁止拉伸 */
  flex-shrink: 0;
  border-radius: 40px;
  overflow: hidden;
  margin: 0px 5px;
  border: 1px solid #eee;
}
.first-level-panel .avatar-area img {
  height: 100%;
  width: 100%;
}
.first-level-panel .comment-area {
  display: flex;
  flex-direction: column;
  margin-right: 1em;
}
.comment-area {
  height: auto;
  width: 100%;
}
.comment-area .comment {
  display: flex;
  flex-direction: column;
}
.comment-area .comment div {
  display: flex;
  justify-content: flex-start;
  padding: 0.3em 1em;
}
.comment-area .comment .nickname {
  width: auto;
  flex-wrap: wrap;
}
.comment-area .comment .nickname span {
  font-weight: 500;
  font-size: 14px;
}
.comment-area .comment .time span {
  margin-top: -5px;
  font-size: 12px;
  color: grey;
}
.comment-area .comment .message span {
  /* text-indent: 2em; */
  font-size: 13px;
  text-align: start;
}
.comment-area .opration {
  display: flex;
  justify-content: space-between;
  padding: 0.2em 1em;
}
.comment-area .opration .reply-area {
  width: 45px;
  height: 20px;
  line-height: 20px;
  border-radius: 12px;
  /* background: rgb(211, 210, 210); */
  background: rgb(241, 241, 241);
  text-align: center;
  cursor: pointer;
}
.expend-btn,
.hide-expend-btn {
  margin-top: 8px;
  margin-left: 10px;
  font-size: 12px;
  color: #67696b;
  cursor: pointer;
}
.comment-area .reply-area span {
  font-size: 12px;
}
.opration .like-area {
  min-width: 50px;
  width: auto;
  height: 24px;
  line-height: 24px;
  border-radius: 12px;
  cursor: pointer;
  /* background: darkred; */
}
.comment-area .like-area span {
  font-size: 14px;
  padding-right: 2px;
}
.comment-area .like-area i {
  font-size: 18px;
}
.second-level {
  width: auto;
  height: auto;
  display: block !important;
}
.second-level-format-control{
  display: flex;
}
.second-level .avatar-area {
  width: 60px;
  height: 60px;
  border-radius: 30px;
  overflow: hidden;
  flex-shrink: 0;
  margin-left: 40px;
  border: 1px solid #eee;
}
.second-level .avatar-area img {
  width: 100%;
  height: 100%;
}

.second-level .nickname{
  display: flex;
  justify-content: center;
  align-items: center;
}

</style>

<template>
  <div id="user-notification">
    <!-- <h2>UserNotification</h2> -->
    <!-- nav -->
    <!-- 消息列表为空时 -->
    <div class="empty-notification-list"
    v-if="notification.length==0&&loading"
    >
        <div class="empty-words-area">
            <h3>无消息</h3>
            <h4>快去博客详情和留言板留言吧..</h4>
        </div>
    </div>
    <!-- 消息列表 -->
    <div class="notification-list"
    v-else
    >
        <div class="noti-list-item"
        v-for="(item,index) in notification"
        :key="index"
       
        >
            <!-- <el-badge :is-dot="item.IsRead==0?true:false" class="item-dot"> -->
            <el-badge :value="item.IsRead==0?'1':''" class="item">
                <div class="user-avatar">
                <img
                v-if="item.Comment_Person_Avatar"
                :src="imgbaseurl+item.Comment_Person_Avatar" 
                alt="user-avatar">
                <img
                v-else
                v-once
                :src="img[Math.floor(Math.random() * 6)]" 
                alt="tourist-avatar">
            </div>
            </el-badge>
            
            <div class="user-info"
             @click.stop="showDetailNotification(item)"
            >              
                <span 
                    style="font-weight:bold"
                    >{{item.Comment_Person_Name}}
                </span>

                <span class="identity-tag is-admin"
                    v-show="item['Comment_Person_Role']=='Admin'"
                    >
                      管理
                    </span>
                    <span class="identity-tag is-tourist"
                    v-show="item['Comment_Person_Role']=='Tourist'"
                    >
                      游客
                    </span>
                    <span class="identity-tag is-user"
                    v-show="item['Comment_Person_Role']=='User'"
                    >
                      用户
                    </span>
                <span style="font-size:12px">在 </span>
                <span v-if="item.Blog_Id">
                    <span style="font-size:12px">博客:</span>
                    <span 
                    class="blog-link"
                    @click.stop="linkToDetails(item.Blog_Id)"
                    >{{item.Blog_Title}}</span>
                    <span style="font-size:12px">中评论了:</span> 
                </span>
                <span v-else>
                    <span
                    class="message-link"
                    @click.stop="linkToMessage"
                    >留言板</span>
                    <span style="font-size:12px"> 中回复了: </span>
                </span>
                <br>
                <div class="content-div">
                    <p>{{item.Comment_Content}}</p>
                </div>
            </div>
            <div class="opreation">
                <el-popover
                    placement="bottom"              
                    trigger="click"
                    >
                    <div>
                        <el-button plain type="info" size="mini"
                        :disabled="item.IsRead==1"
                        @click="setToReaded(item)"
                        >设为已读</el-button>
                        <el-button plain type="warning" size="mini"
                        @click="setToCleared(item)"
                        >清除会话</el-button>
                    </div>
                    <div>
                        <el-button plain type="info" size="mini"
                        @click="setAllToReaded"
                        :disabled="$store.getters.unreadnoticount==0"
                        >全部已读</el-button>
                        <el-button plain type="danger" size="mini"
                        @click="setAllToCleared"
                        >清除全部</el-button>
                    </div>
                    <el-button class="op-btn" slot="reference" size="mini">
                        <i class="el-icon-more"></i>
                    </el-button>
                    </el-popover>
            </div>

            
        </div>
    </div>

    <!-- 消息展示面板 -->
    <div class="notification-panel"
    v-if="!hidden_reply_block && !show_locker"
    >
        <div class="noti-content">
            <span 
            style="font-weight:bold"
            v-text="reply_usernickname"></span>
            <span style="font-size:12px;color: gray;">
                <span>(</span>
                <span v-text="reply_date"></span>
                <span>)</span>
            </span>
            
            <span style="font-size:12px"> 说 ：</span>
            <br>
            <div class="reply-words-area">
                <p style="text-indent:2em" 
                v-text="reply_content"></p>
                
            </div>
        </div>
        <div class="reply-textarea">
            <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="1000"
            v-model="information"
            show-word-limit
            ></el-input>

            <div style="margin-top:20px">
                <el-button type="success" size="small"
                @click.stop="submitReply"
                >回复</el-button>
                <el-button type="warning" size="small"
                @click.stop="cancleReply"
                >取消</el-button>
            </div>
        </div>
    </div>
    <!-- 隐藏的 消息展示面板 -->
    <div class="hidden-reply-panel"
    v-if="hidden_reply_block && !hidden_show_locker"
    
    >
        <div class="noti-content-hidden">
            <span 
            style="font-weight:bold"
            v-text="reply_usernickname"></span>
            <span style="font-size:12px;color: gray;">
                <span>(</span>
                <span v-text="reply_date"></span>
                <span>)</span>
            </span>
            <span style="font-size:12px"> 说 ：</span>
            <br>
            <div class="reply-words-area">
                <p style="text-indent:2em" 
                v-text="reply_content"></p>
            </div>
        </div>
        <div class="reply-textarea-hidden">

             <el-input
            type="textarea"
            :autosize="{ minRows: 3, maxRows: 5}"
            maxlength="1000"
            v-model="information"
            show-word-limit
            ></el-input>

            <div style="margin-top:20px">
                <el-button type="success" size="small"
                @click.stop="submitReplyHidden"
                >回复</el-button>
                <el-button type="warning" size="small"
                @click.stop="cancleReplyHidden"
                >取消</el-button>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import {
    getnotificationuserAPI,
    writecommentandreplyAPI,
    writemessageandreplyAPI,
    setnotireadeduserAPI,
    setnoticleareduserAPI,
    setallnotireadeduserAPI,
    setallnoticleareduserAPI,
    addcommentcountAPI
} from '../../http/user_api'
import setting from '../../../../../setting'
export default {
    name:'UserNotification',
    data(){
        return{
            userinfo:this.$store.getters.userinfo,
            notification:[],
            imgbaseurl:setting.imgbaseurl,
            img: [
                require("../../../../../assets/headphoto1.svg"),
                require("../../../../../assets/headphoto2.svg"),
                require("../../../../../assets/headphoto3.svg"),
                require("../../../../../assets/headphoto4.svg"),
                require("../../../../../assets/headphoto5.svg"),
                require("../../../../../assets/headphoto6.svg"),
            ],
            //隐藏的回复区域
            hidden_reply_block:false,
            show_locker:true,
            hidden_show_locker:true,
            //reply
            reply_usernickname:'',
            reply_content:'',
            reply_date:'',
            //your reply
            information:'',
            comment_level:2,
            presend:{},
            //判断 是 blog 还是 message
            condition:'',

            loading:false,
            interval:null
        }
    },
    computed:{
        // showRandomAvatar(){
        //     return this.img[Math.floor(Math.random() * 6)]
        // }
    },
    methods:{
        caculateWidth(){
            this.interval = setInterval(() => {
                let width = document.body.clientWidth
                if(width<900){
                    this.hidden_reply_block = true
                    
                }else{
                    this.hidden_reply_block = false
                    this.show_locker = false
                }
            }, 500);
        },
        //获取消息列表
        getNotificationList(){
            getnotificationuserAPI({
                UserUniqueId:this.userinfo.uniqueid
            }).then(res=>{
                // console.log(res)
                this.notification =  res.data.data
                this.formatDate()
            }).catch(err=>{console.log(err)})
            .finally(()=>{
                this.loading = true
            })
        },
        linkToDetails(id){
            // console.log(id)
            // console.log('link to blogdetails')
            let {href} = this.$router.resolve({
                path:'/details',
                query:{
                    Blog_Id:id
                }
            });
            window.open(href, '_blank');

        },
        linkToMessage(){
            // console.log('link to message')
            let {href} = this.$router.resolve('/message');
            window.open(href, '_blank');
        },
        showDetailNotification(item){
            // console.log(item)
            this.reply_usernickname = item.Comment_Person_Name
            this.reply_content = item.Comment_Content
            this.reply_date = item.Create_Time
            let presend = {
                Blog_Id: '',
                Blog_Title: '',
                Comment_Level: this.comment_level,
                //Comment_Id 后端生成
                // Comment_Id: randomId(16),
                Root_Comment_Id: item.Root_Comment_Id,
                Father_Comment_Id: item.Comment_Id,
                Comment_Person_Role: this.userinfo.role,
                Comment_Person_Acc: this.userinfo.account,
                Comment_Person_Name: this.userinfo.nickname,
                Comment_Person_Id: this.userinfo.uniqueid,
                Comment_Person_Avatar: this.userinfo.avatar,
                Parent_Person_Role: item.Comment_Person_Role,
                Parent_Person_Acc: item.Comment_Person_Acc,
                Parent_Person_Name: item.Comment_Person_Name,
                Parent_Person_Id: item.Comment_Person_Id,
                Parent_Person_Avatar: item.Comment_Person_Avatar,
                Comment_Content: '',
            };
            //当Root_Comment_Id为空，即为回复管理员
            if(presend.Root_Comment_Id==''){
                presend.Root_Comment_Id = item.Comment_Id
                presend.Father_Comment_Id = item.Comment_Id
            }
            if(item.Blog_Id){
                presend.Blog_Id = item.Blog_Id
                presend.Blog_Title = item.Blog_Title        
            }
            this.presend = presend
            //当该条信息未读时
            if(item.IsRead==0){
                //将该条设为已读
                this.setToReaded(item)      
            }
            if(this.hidden_reply_block){
                //移除锁
               this.hidden_show_locker = false
            }
        },
        //封装判断condition
        judgeCondition(item){
            if(item.Blog_Id){
                this.condition = 'blog'
            }else{
                this.condition = 'message'
            }
        },
        //格式化日期
        formatDate(){
            this.notification.map((v,index)=>{
                this.notification[index].Create_Time = this.$moment(v.Create_Time).format("YYYY-MM-DD HH:mm:ss")
            })
            
        },
        //设为已读
        setToReaded(item){
            this.judgeCondition(item)
            //去掉小红点
            let index = this.notification.indexOf(item)
            this.notification[index].IsRead = 1
            this.$store.commit('reduceUnReadNotiCountbyOne')
            setTimeout(()=>{
                setnotireadeduserAPI({
                    Comment_Id:item.Comment_Id,
                    Condition:this.condition
                }).then(res=>{
                    // console.log(res.data)
                    this.condition = ''
                }).catch(err=>{console.log(err)})
            },0)
        },
        //设为清除
        setToCleared(item){
            this.judgeCondition(item)
            //删除清除的那一项
            let idx = this.notification.indexOf(item)
            this.notification = this.notification.filter((v,index)=>{
                return index!=idx
            })
            if(item.IsRead==0){
                this.$store.commit('reduceUnReadNotiCountbyOne')
            }
            setnoticleareduserAPI({
                Comment_Id:item.Comment_Id,
                Condition:this.condition
            }).then(res=>{
                // console.log(res.data)
                this.condition = ''
            }).catch(err=>{console.log(err)})
        },
        //全部设为已读
        setAllToReaded(){
            let blog_list = []
            let message_list = []
            this.$store.commit('modifyUnReadNotiCount',0)
            this.notification.map((v,index)=>{
                if(v.Blog_Id){
                    blog_list.push(v.Comment_Id)
                }else{
                    message_list.push(v.Comment_Id)
                }
                this.notification[index].IsRead=1
            })
            setTimeout(() => {
                setallnotireadeduserAPI({
                    Blog_Id_List:blog_list,
                    Message_Id_List:message_list
                }).then(res=>{
                    console.log(res)
                }).catch(err=>{console.log(err)})
            }, 500);
        },
        //全部设为清除
        setAllToCleared(){
            let blog_list = []
            let message_list = []
            
            this.notification.map(v=>{
                if(v.Blog_Id){
                    blog_list.push(v.Comment_Id)
                }else{
                    message_list.push(v.Comment_Id)
                }
            })
            setTimeout(() => {
                setallnoticleareduserAPI({
                    Blog_Id_List:blog_list,
                    Message_Id_List:message_list
                }).then(res=>{
                    // console.log(res)
                    this.$store.commit('modifyUnReadNotiCount',0)
                    this.notification = []
                }).catch(err=>{console.log(err)})
            }, 500);
            
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
        //未选择评论人
        noneRepliedPerson(){
            this.$message({
                message: '未选择回复人！',
                type: 'warning'
            });
        },
        //评论后，评论数+1（只用于博客评论）
        commentCountPlusOne(id){
            addcommentcountAPI({Blog_Id:id}).then(res=>{}).catch(err=>{})
        },
        //提交回复
        submitReply(){
            if(this.information.split(' ').join('').length==0){
                this.information=''
                this.$message({
                    message:'输入为空！请重新输入！',
                    type:'error',
                    duration:3000,
                    showClose:true
                })

                return
            }
            if(Object.values(this.presend).length==0){
                this.noneRepliedPerson()
                return
            }
            
            this.presend.Comment_Content = this.information
            if(this.presend.Blog_Id!=''){
                writecommentandreplyAPI({
                    Information: this.presend
                }).then(res=>{
                     if (res.data.code == 1012) {
                        this.commentCountPlusOne(this.presend.Blog_Id)
                        // console.log("评论成功");
                        this.replySuccessed()
                    } else if (res.data.code == 1013) {
                        this.replyFailed()
                        // console.log("评论失败");
                    }
                    this.resetParam()
                })
            }else{
                writemessageandreplyAPI({
                    message: this.presend
                }).then(res=>{
                    if (res.data.code == 1014) {
                        // console.log("评论成功");
                        this.replySuccessed()
                    } else if (res.data.code == 1015) {
                        this.replyFailed()
                        // console.log("评论失败");
                    }
                    this.resetParam()

                })
            }
        },
        //取消回复
        cancleReply(){
            this.resetParam()
        },
        //提交回复 hidden panel
        submitReplyHidden(){
            this.submitReply()
            this.hidden_show_locker = true
        },
        ////取消回复 hidden panel
        cancleReplyHidden(){
            this.cancleReply()
            this.hidden_show_locker = true
        },
        //重置参数
        resetParam(){
            this.reply_usernickname = ''
            this.reply_content = ''
            this.reply_date = ''
            this.information = ''
            this.presend = {}
        }
        
    },
    created(){
        this.caculateWidth()
        this.getNotificationList()
    },
    beforeDestroy(){
        clearInterval(this.interval)
    }

}
</script>

<style scoped>
#user-notification{
    overflow: hidden;
    
    height: 100%;
    width: auto;

    display: flex;
    flex-direction: row;
    position: relative;
    /* padding: 2px; */
}

.item{
    margin-top: 5px;
    /* margin-right: 5px; */
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
.empty-notification-list{
    width: 350px;
    height: 150px;
    display: flex;
    padding-bottom: 50%;
    justify-content: center;
    align-items: center;
}
.empty-words-area{
    width: 320px;
    height: 120px;
    border: 1px solid #e7ebf1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);
    border-radius: 5px;
}
.notification-list{
    width: 360px;
    height:calc(100vh - 130px);
    overflow: auto;
    /* border: 1px solid #eee; */

    /* background: steelblue; */
    /* padding: 5px; */
}
.notification-list::-webkit-scrollbar{
    display: none;
    
}
.noti-list-item{
    min-height: 80px;
    height: auto;
    margin-bottom: 5px;
    width: 350px;
    /* background: blanchedalmond; */
    margin: 0px 2px 4px 2px;
    padding: 2px;
    /* overflow: hidden; */
    display: flex;
    flex-direction: row;
    border: 1px solid #e7ebf1;
}
.user-avatar{
    /* background: brown; */
    height: 60px;
    width: 60px;
    border-radius: 30px;
    border: 1px solid #e7ebf1;
    overflow: hidden;
    flex-shrink: 0;
}
.user-avatar img{
    height: 100%;
    width: 100%;
}
.user-info{
    margin-left: 10px;
    height: auto;
    width: 250px;
}
.content-div{
    min-height: 40px;
    height: auto;
    width: 240px;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    color: gray;
    text-overflow: ellipsis;
    overflow: hidden;
    font-size: 13px;
    margin-top: 5px;
}
.content-div p{
    padding: 0px;
    margin: 0px;
}
.blog-link{
    cursor: pointer;
    font-size: 13px;
}
.blog-link:hover{
    font-weight: 600;
}
.message-link{
    cursor: pointer;
    font-size: 13px;
}
.message-link:hover{
    font-weight: 600;
}
.opreation{
    width: 30px;
    height: auto;
    /* background: hotpink; */
    position: relative;
}
.opreation .op-btn{
    width: 30px !important;
    height: 30px !important;
    /* border: 0px ; */
    background: none;
    display: flex;
    border: none;
    justify-content: center;
    align-items: center;
    position: absolute;
    bottom: 0;
    right:0;
}
.op-btn:hover{
    border: 1px solid #DCDFE6;
}
.notification-panel{
    width: 55%;
    height: 100%;
    margin-left: 2px;
    
}
.noti-content{
    height: 45%;
    width: auto;
    padding: 5px;
    margin-left: 5px;
    /* background: chocolate; */
    border: 1px solid #e7ebf1;
}

.reply-words-area p{
    padding: 10px 5px 20px 5px;
    background:rgb(236, 235, 235);
    border-radius: 10px;
    font-size: 13px;
}
.reply-textarea{
    padding: 5px;
    margin-left: 5px;
    width: auto;
    height: 45%;
    /* background: cornflowerblue; */
    margin-top: 5px;
    border: 1px solid #e7ebf1;
}
.hidden-reply-panel{
    width: 99%;
    height: 45%;
    background: #fff;
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    
}
.noti-content-hidden{
    height: 45%;
    width: auto;
    /* background: chocolate; */
    padding: 5px;
    border: 1px solid #e7ebf1;
    overflow: auto;
}
.noti-content-hidden::-webkit-scrollbar{
    display: none;
}
.reply-textarea-hidden{
    width: auto;
    height: 45%;
    overflow: auto;
    padding: 5px;
    border: 1px solid #e7ebf1;
    /* background: cornflowerblue; */
}
.reply-textarea-hidden::-webkit-scrollbar{
    display: none;
}
/* @media screen and (min-width: 0px) and (max-width: 900px) {
  .notification-panel{
      display: none;
  }
} */
</style>
<template>
  <div id="details-page"
  >
    <!-- 博客详情展示 -->
    <!-- 为空时 -->
    <div class="empty-blog"
    v-show="content.length == 0 && load ==false"
    >
      <div>
        <h1>Sorry,The Blog Is Emypt!</h1>
        <h3>可能的情况：</h3>
        <ul>
          <li><h4>1.该博客不存在</h4></li>
          <li><h4>2.该博客被冻结</h4></li>
          <li><h4>3.该博客被删除</h4></li>
          <li><h4>4.该博客未发布</h4></li>
          <li><h4>5.有 BUG !</h4></li>
        </ul>
      </div>
    </div>
    <!-- 不为空时 -->
    <!-- 这里不能用v-show，因为this.highlighthandle无法完成渲染-->
    <div class="formate-control"
    v-if="content.length != 0"
    ref="blog_block"
    >
        <div class="title-area">
          <span v-text="this.content.Blog_Title"></span>
        </div>
        <div class="markdown-area">
          <markdown :value="this.content.Blog_Content"> </markdown>
        </div>
        <div class="share-title">
          <p>分享到：</p>
        </div>
        <div class="blog-like-collect">
          <div class="share-icon">
            <span v-for="(icon, index) in iconbar" :key="index">
              <el-button :class="icon.iconclass" circle> </el-button>
            </span>
          </div>
          <div class="opration">
            <el-button type="danger" round size="medium" 
            @click="handleLike">
              <i class="iconfont "
              :class="islike?'icon-dianzan-then':'icon-dianzan'"
              >
                {{ this.content.Blog_Likes }}
              </i>
            </el-button>
            <el-button type="danger" round size="medium"
            @click="handleCollect"
            >
              <i class="iconfont"
              :class="handleIsCollected?'icon-collection-b':'icon-Star'"
              >{{ this.content.Blog_Collected }}</i>
            </el-button>
          </div>
        </div>

    </div>
    <!-- 留言板 -->
    <!-- 这里不能使用v-show，因为评论组件封装了textarea 写评论 -->
    <!-- 对于不展示的博客，不能进行评论 -->
    <div class="message-formate-control" 
    v-if="content.length != 0"
    ref="comment_block"
    >
      <blogcomments 
      ref="blogcomments" 
      :information="this.comments"
      :all="all_count"
      :Blog_Id="Blog_Id"
      :Blog_Title="content.Blog_Title"
      :Blog_Author_Role="content.Blog_Author_Role"
      :Blog_Author_UniqueId="content.Blog_Author_UniqueId"
      :Blog_Author_Account="content.Blog_Author_Account"
      :Blog_Author_NickName="content.Blog_Author"
      :Blog_Author_Avatar="content.Blog_Author_Avatar"
      @transWriteComment="handleWriteComment"
      >
      </blogcomments>
    </div>

    <!-- 分页器 -->
    <div class="pagenation-formate-control"
    v-if="this.comments.length != 0" 
    >
      <pagenation
        :current="current"
        :start="start"
        :length="length"
        :total="total"
        @transPageParams="handlePagePrams"
      >
      </pagenation>
    </div>

    <!-- 写回复的textarea -->
    <!-- <replytextarea>
    </replytextarea> -->
  </div>
</template>

<script>
import setting from "../../../setting";
import MarkDown from "../../../components/MarkDown/MarkDown.vue";
import BlogComments from "../../../components/Comment/BlogComments.vue";
import Pagenation from "../../../components/Pagenation/Pagenation.vue";
import ReplyTextArea from '../../../components/Textarea/ReplyTextArea.vue'
import { defaultmixin } from "../../../mixins/defaultmixin";
import {
  takeablogAPI,
  blogcommentsAPI,
  blogcommentscountAPI,
  getcollectlistAPI,
  collectAPI,
  uncollectAPI,
  likeAPI,
  viewAPI
} from "../../../http/api";
export default {
  name: "Details",
  mixins: [defaultmixin],
  components: {
    markdown: MarkDown,
    blogcomments: BlogComments,
    pagenation: Pagenation,
    replytextarea : ReplyTextArea
  },
  data() {
    return {
      Blog_Id: "",
      //博客内容
      content: [],
      //博客评论
      comments: {},
      //用户收藏列表
      user_collection_list:[],
      //是否点赞
      islike:false,
      //icon bar
      iconbar: [
        { iconclass: "iconfont icon-shejiaotubiao-03" },
        { iconclass: "iconfont icon-shejiaotubiao-01" },
        { iconclass: "iconfont icon-shejiaotubiao-06" },
        { iconclass: "iconfont icon-shejiaotubiao-10" },
        { iconclass: "iconfont icon-facebook" },
        { iconclass: "iconfont icon-shejiaotubiao-30" },
        { iconclass: "iconfont icon-shejiaotubiao-14" },
      ],
      //分页参数
      length: setting.details.comment_length,

      load:true,
      all_count:0
    };
  },
  computed:{
    //判断是否收藏
    handleIsCollected(){
      return this.user_collection_list.includes(this.Blog_Id)
    }
  },
  methods: {
    getQueryInfo() {
      this.Blog_Id = this.$route.query.Blog_Id;
    },
    //博客浏览量+1
    viewPulsOne(){
      viewAPI({Blog_Id:this.Blog_Id}).then(res=>{}).catch(err=>{})
    },

    //根据Blog_Id 获取对应博客
    getTheBlog() {
      takeablogAPI({ Blog_Id: this.Blog_Id })
        .then((res) => {
          if(Object.values(res.data).length >0){
            this.content = Object.values(res.data)[0];
          }
          else if(Object.values(res.data).length ==0){
            this.content = [];
            this.load = false
            console.log('thhe blog is empty !')
          }

        })
        .catch((err) => {
          console.log(err);
        })
        .finally(()=>{this.load = false})
    },
    //评论
    getBlogComments() {
      blogcommentsAPI({
        Blog_Id: this.Blog_Id,
        Start: this.start,
        Length: this.length,
      })
        .then((res) => {
          // console.log(Object.values(res.data))
          // this.comments = Object.values(res.data);
          this.comments = Object.values(res.data);
        })
        .catch((err) => {
          console.log(err)
        });
    },
    //评论count
    getBlogCommentCount() {
      blogcommentscountAPI({ Blog_Id: this.Blog_Id })
        .then((res) => {
          // console.log(res.data)
          this.total = res.data.total;
          this.all_count = res.data.all
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //获取用户收藏列表
    getUserCollectionList(){
      if(this.$store.getters.userinfo.islogin){
        getcollectlistAPI({User_UniqueId:this.$store.getters.userinfo.uniqueid})
        .then(res=>{
          this.user_collection_list = res.data[0].User_Collection.split(',')
          // console.log(res.data)
        })
        .catch(err=>{
          console.log(err)
        })  
      }
    },
    //点击收藏 或者取消收藏
    handleCollect(){
      if(this.$store.getters.userinfo.islogin){
        let condition = this.user_collection_list.includes(this.Blog_Id)
        if(condition){
          //取消收藏
          let list = []
          this.user_collection_list.map(v=>{
            if(v!=this.Blog_Id)
            list.push(v)
          })

          console.log(list)
          uncollectAPI({
            Blog_Id:this.Blog_Id,
            Collection_List:list.toString(),
            User_UniqueId:this.$store.getters.userinfo.uniqueid
          })
          .then(res=>{
            // console.log(res)
            this.$message({
              message: '已取消收藏',
              type: 'success'
            });
            this.user_collection_list = list
            this.content.Blog_Collected--
          })
          .catch(err=>{
            console.log(err)
          })
        }
        else{
          //添加收藏
          collectAPI({
            Blog_Id:this.Blog_Id,
            User_UniqueId:this.$store.getters.userinfo.uniqueid
          })
          .then(res=>{
            // console.log(res)
            this.$message({
              message: '收藏成功',
              type: 'success'
            });
            this.user_collection_list.push(this.Blog_Id)
            this.content.Blog_Collected++
          })
          .catch(err=>{
            console.log(err)
          })
        }
      }
      else{
        this.$notify.error({
          title: '错误',
          message: '您未登录，无法收藏！'
        });
      }
      
    },
    //点击点赞
    handleLike() {
      //点赞不记录id
      //不设置取消功能
      //不限制身份
      likeAPI({Blog_Id:this.Blog_Id})
      .then(res=>{
        this.$message({
          message: '点赞成功',
          type: 'success'
         });
        this.content.Blog_Likes++
        this.islike = true
      })
      .catch(err=>{
        console.log(err)
      })
    },
    //初始化函数
    async initFunc() {
      await this.getTheBlog();
      await this.getBlogCommentCount();
      await this.getBlogComments();
      this.scrollToTop();
    },
    //点击上一页或者下一页
    handlePagePrams(c, s) {
      this.current = c;
      this.start = s;
      setTimeout(() => {
        //清零 comments组件保存的 ‘判断显示二级评论’数组 show_append_data
        this.$refs.blogcomments._data.show_append_data = [];
        //获取评论
        this.getBlogComments();
        this.scrollToComment()
      }, 0);
    },
    handleWriteComment(level){
      console.log(level)
      // 点击的是直接评论博客
      //这里重置分页start和end和total
      //保证用户评论后，刷新评论列表，第一条就是自己的评论
      if(level==0){
        this.current = 1
        this.start = 0
        this.total = 0
        this.scrollToComment()
      }
      //点击的是第一层评论或者第二层评论的回复按钮
      //level == 1，2，这个时候后，不去处理分页的start 和 current
      //这样做保证评论列表不会被刷新，使用户能看到自己的二级回复    
      else if(level == 1 || level == 2){
        this.total = 0
      }
      this.getBlogCommentCount();
      this.getBlogComments();
    },
    //评论后 根据需求，屏幕回滚到 评论区域
    scrollToComment(){
      let blogblockH = this.$refs.blog_block.clientHeight
      window.scrollTo({
        top: blogblockH+110,
        behavior:'smooth'
      })
    }
  },
  async created() {
    this.getQueryInfo();
    await this.initFunc();
    await this.getUserCollectionList()
  },
  mounted(){
    this.viewPulsOne()
  }
};
</script>
<style scoped>
@import url("../../../assets/incos/iconfont.css");
#details-page {
  height: auto;
  width: 100%;
  min-height: 600px;
  border: none;
}
#details-page .empty-blog{
    height: 400px;
    width: auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
/* 博客区域 格式控制 */
#details-page .formate-control {
  width: auto;
  height: auto;
  /* min-height: 400px; */
  /* border: 1px solid #fff; */
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
}
#details-page .formate-control .empty-blog {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
}
/* 留言板区域 格式控制 */
#details-page .message-formate-control {
  margin-top: 30px;
  min-height: 400px;
  width: auto;
  height: auto;
  border: 1px solid #fff;
  border-radius: 5px;
  background: #fff;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
}
.title-area {
  width: auto;
  height: auto;
  font-size: 24px;
  font-weight: 600;
  padding: 10px 0px;
  border-bottom: 1px solid #e7ebf1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.markdown-area {
  min-height: 500px;
  width: auto;
}
.share-title {
  padding-left: 5px;
  font-size: 12px;
  font-weight: 300;
}
.blog-like-collect {
  height: auto;
  width: auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  font-size: 28px;
  padding: 0px 5px 15px 5px;
  line-height: 60px;
}
.blog-like-collect .share-icon button {
  margin-right: 20px;
}
.pagenation-formate-control {
  height: auto;
  width: 100%;
  display: flex;
  justify-content: center;
}
</style>
<template>
  <div id="item-area">
    <div class="blog-title">
        <div class="title-area">
            <span v-text="blog['Blog_Title']"></span>
        </div>
        <div class="blog-class"
        v-if="showclass"
        >
          <span v-text="blog['Blog_Class']"></span>         
        </div>
    </div>
    <div class="blog-author-date-others">
        <span v-text="'作者：'+blog['Blog_Author']"></span>
        <span><i class="el-icon-view"><p v-text="'浏览：'+blog['Blog_Views']"></p></i></span>
        <span><i class="iconfont icon-custom-love"><p v-text="'喜欢：'+blog['Blog_Likes']"></p></i></span>
        <span><i class="iconfont icon-Star"><p v-text="'收藏：'+blog['Blog_Collected']"></p></i></span>
        <span><i class="el-icon-chat-dot-round"><p v-text="'评论：'+blog['Blog_Comments']"></p></i></span>
        <span>发表于：{{blog['Blog_Createtime'] | dateFormat}}</span>
    </div>
    <div class="blog-summary-area" @dblclick="linkToDetailes">
        
        <div class="blog-summary">
          <markdown   
          :value="blog['Blog_Summary']"
          >
          </markdown>
        </div>   
    </div>
    <div class="blog-tag">
        <tagsformate 
        v-for="(item,index) in blog['Blog_Tags'].split(',')"
        :key="index"
        :tagsinformation='item'> 
        </tagsformate>
        
        <el-button 
        type="info"
        class="readmore"
        size="small"
        plain
        @click="linkToDetailes"
        >
          阅读全文
        </el-button>
    </div>
  </div>
</template>

<script>
import MarkDown from "../MarkDown/MarkDown.vue";
import BlogTagsFormate from '../Tag/BlogTagsFormate.vue'
export default {
  name: "BlogItemFormate",
  components: {
    markdown: MarkDown,
    tagsformate:BlogTagsFormate
  },
  data() {
    return {
      // blog_data:{}
    };
  },
  props: {
    blog:{
      type:Object
    },
    showclass:{
      type: Boolean,
      default: true
    }
  },
  methods: {
    linkToDetailes(){
      console.log(this.blog["Blog_Id"])
      this.$router.push({
          path: "/details",
          query: {
            Blog_Id: this.blog["Blog_Id"],
          },
        });
    }
  },
  mounted(){

  },
  watch:{

  }
};
</script>

<style>
@import url('../../assets/incos/iconfont.css');
#item-area {
  box-sizing: border-box;
  width: 100%;
  height: auto;
  background: #fff;
  padding:0px 4px;
  border-radius: 5px;
  margin-bottom: 30px;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
  overflow: hidden;
}
#item-area:hover{
  /* box-shadow: 0 0 10px rgb(255 193 7 / 25%); */
  box-shadow: 0 0 10px rgb(0 0 0 / 10%); 
}
.blog-title{
    height: auto;
    width: 100%;
    padding: 10px 0px;
    display: flex;
    text-indent: 1em;
    justify-content: flex-start;  
    align-items: center;
    border-bottom: 0.5px solid #e7ebf1;
    position: relative;
}
.title-area{
  width: auto;
  font-size: 24px;
  font-weight: 600;
  flex-grow: 1;
}
.blog-class{
  width: auto;
  text-indent: 0;
  padding: 0px 10px;
  height: 34px;
  background: #82D8CF;
  flex: none;
  border-radius: 15px 0px 0px 15px;
  display: flex;
  align-items: center; 
}

.blog-class span{
  font-weight: 600;
  font-size: 13px;
  color: #000;
}
.blog-author-date-others{
  height: auto;
  width: auto;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 10px;
}
.blog-author-date-others i{
  font-size: 12px;
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
}
.blog-author-date-others span{
  color: grey;
  font-size: 12px;
}
.blog-summary-area{
  width: auto;
  height: auto;
  min-height: 100px;
  overflow: hidden;
  border-bottom: 0.5px solid #e7ebf1;
}
.blog-summary{
  width: 100%;
  height: auto;
  z-index: 100;
}
.blog-tag{
    width: auto;
    height: auto;
    display: flex;
    align-items: center; 
    justify-content: flex-start;
    position: relative;
    padding:5px 90px 5px 10px;
    flex-wrap: wrap;
}
.blog-tag .readmore{
  position: absolute;
  right: 10px;
}
/* 去掉elementui，button的伪类 */
.el-button--success.is-plain:hover{
    background: #f0f9eb;
    color: #67C23A;
    border-color: #c2e7b0;
}
.el-button--success.is-plain:focus{
    background: #f0f9eb;
    color: #67C23A;
    border-color: #c2e7b0;
}

</style>
<template>
  <div id="blog-aside">
    <!-- 广告区域 -->
    <div class="advertisement-block" v-show="handleShowAdv">
      <div class="adv-tittle">
        <h3 v-text="adv_info.Adv_Tittle"></h3>
      </div>
      <div class="adv-intro">
        <p v-text="adv_info.Adv_Introduction"></p>
      </div>
      <div class="adv-img">
        <span
          class="adv-img-control"
          v-for="(item, index) in adv_list"
          :key="index"
        >
          <a :href="item.Adv_Img_Link" target="_blank">
            <img :src="item.Adv_Img_Url" alt="adv-img" />
          </a>
        </span>
      </div>
    </div>

    <!-- Top view blogs -->
    <!-- 最多浏览排行 -->
    <div class="com-title">
      <span class="tittle">
        浏览排行Top10
        <i class="el-icon-s-data"></i>
      </span>
    </div>
    <div class="top-view-block">
        <div class="top-view-item"
        v-for="(item,index) in this.top_view_blogs_list"
        :key="index"
        >
            <span class="item-title"
            @click="clickToDetail(item.Blog_Id)"
            >
                {{item.Blog_Title}}
                <span class="item-title-icon">
                    ——
                    <i class="el-icon-view">
                        {{item.Blog_Views}}
                    </i>
                </span>
            </span>
            
        </div>
    </div>

  </div>
</template>

<script>
import { getadvertisementAPI,gettopviewblogsAPI } from "../../http/api";

export default {
  name: "BlogAside",
  data() {
    return {
      //广告页面信息
      adv_info: {
        Adv_Tittle: "",
        Adv_Introduction: ""
      },
      //广告列表
      adv_list: [],
      //展示广告位的路由
      show_adv: ["/home"],
      
      top_view_blogs_list:[]
    };
  },
  computed: {
    handleShowAdv() {
      return this.show_adv.includes(this.$route.path);
    }
  },
  methods: {
    //获取广告信息
    getAdvertisement() {
      getadvertisementAPI()
        .then(res => {
          let temp = Object.values(res.data)[0];
          this.adv_info.Adv_Tittle = temp.Adv_Tittle;
          this.adv_info.Adv_Introduction = temp.Adv_Introduction;
          let mix = temp.Adv_Img_Link_Url.split(",");
          if (mix.length == 1) {
            let obj = {};
            let item = mix[0].split("*");
            obj.Adv_Img_Url = item[0];
            obj.Adv_Img_Link = item[1];
            this.adv_list.push(obj);
          } else if (mix.length > 1) {
            mix.map(v => {
              let obj = {};
              let item = v.split("*");
              obj.Adv_Img_Url = item[0];
              obj.Adv_Img_Link = item[1];
              this.adv_list.push(obj);
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //获取top view blogs
    getTopViewBlogs(){
        gettopviewblogsAPI()
            .then(res=>{
                this.top_view_blogs_list = Object.values(res.data)
            })
            .catch(err=>console.log(err))
            .finally(()=>{})
    },
    //跳转到详情
    clickToDetail(id){
        // console.log(id)
        let { href } = this.$router.resolve({
            path: "/details",
            query: {
            Blog_Id: id
            }
        });
        window.open(href, "_blank");
    }
  },
  created() {
    this.getTopViewBlogs()
    this.getAdvertisement();
  },
  mounted() {}
};
</script>

<style scoped>
#blog-aside {
  width: 100%;
  height: auto;
  box-sizing: border-box !important;
}
.com-title {
  padding: 15px 0px 5px 0px;
}
.com-title .tittle {
  font-size: 20px;
  font-weight: bold;
}
.advertisement-block {
     box-sizing: border-box;
  width: 100%;
  height: auto;
  background: #fff;
  /* border: 1px solid #fff; */
  border-radius: 5px;
  /* margin-bottom: 10px; */
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
  word-wrap: break-word;
  overflow: hidden;
  margin-top: 20px;
  display: inline-block;
}
.adv-tittle {
  text-align: center;
  width: auto;
  height: auto;
}
.adv-intro {
  width: auto;
  height: auto;
  text-indent: 1em;
  /* word-wrap: break-word; */
  font-size: 13px;
  font-weight: 200;
  color: grey;
}
.adv-img {
  height: auto;
  width: auto;
}
.adv-img-control {
  /* min-height: 300px; */
  height: auto;
  width: 94%;
  margin: 0px auto;
  /* background: chocolate; */
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  border: 1px solid #eee;
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 5px;
  /* cursor: pointer; */
}
.adv-img img {
  height: 100%;
  width: 100%;
  background: #fff;
}


.top-view-block{
    box-sizing: border-box;
    width: 100%;
    height: auto;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px rgb(0 0 0 / 5%);
    word-wrap: break-word;
    padding: 15px 10px;
    color: #303133;
}
.top-view-item{
    /* background: skyblue; */
    width: 100%;
    height: auto;
    padding: 10px 5px;
    /* border: 1px solid #000; */
    display: flex;
    align-items: center;
    justify-content: flex-start;
    
}
.item-title{
    /* font-weight: 600; */
    font-size: 13px;
    cursor: pointer;
}
.item-title:hover{
    font-weight: 600;
    text-decoration: underline 1.5px;
    text-underline-offset: 4px;
}
.item-title-icon{
    font-weight: 400;
    font-size: 12px;
}





</style>

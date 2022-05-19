<template>
  <div id="home-page">
      <!-- 博客为空展示区域 -->
      <div class="empty-block"
      v-show="bloglist.length==0 && load==false"
      >
          <div>
            <h1>Sorry,Emypt List!</h1>
            <h3>可能的情况：</h3>
            <ul>
                <li><h4>1.管理员未发布博客</h4></li>
                <li><h4>2.所有博客为草稿状态未发布</h4></li>
                <li><h4>3.所有博客被删除，冻结</h4></li>
                <li><h4>4.网络问题</h4></li>
                <li><h4>5.有 BUG !</h4></li>
            </ul>
          </div>
      </div>
      <!-- 博客列表区域 -->
      <div class="blog-list-block"
      v-show="bloglist.length!=0"
      >
        <span
        v-for="(item,index) in bloglist"
        :key="index"
        >
            <blogitemformate
            :blog="item"
            :showclass="true"
            >
            </blogitemformate>
        </span>
      </div>
      <!-- 分页器区域 -->
      <div class="pagenation-block"
      v-show="bloglist.length!=0"
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
      
  </div>
</template>

<script>
import setting from '../../setting'
import BlogItemFormate from '../../components/BlogItem/BlogItemFormate.vue'
import Pagenation from '../../components/Pagenation/Pagenation.vue'
import { defaultmixin } from '../../mixins/defaultmixin'
import { blogslistAPI,blogslistcountAPI } from '../../http/api'
export default {
    name:'Home',
    mixins:[defaultmixin],
    data(){
        return {
            //博客列表
            bloglist:[],
            length:setting.home.blogs_length,
            load:true
        }
    },
    components: {
        blogitemformate:BlogItemFormate,
        pagenation:Pagenation
    },
    methods: {
        getBlogList() {
            return new Promise((resolve,reject)=>{
                blogslistAPI({start:this.start,length:this.length})
                .then(res=>{
                    this.bloglist = Object.values(res.data)
                    if(Object.values(res.data).length==0){
                        console.log('empty!!!')
                    }
                    resolve()
                })
                .catch(err=>{
                    reject(console.log(err))
                })
                .finally(()=>{
                    this.load = false
                })
            })
        },
        getBlogListCount(){
            return new Promise((resolve,reject)=>{
                blogslistcountAPI()
                .then(res=>{
                    this.total = Object.values(res.data)[0].count
                    resolve()
                })
                .catch(err=>{
                    reject(console.log(err))
                })
            })
        },
        async initFunc(){
            await this.getBlogList()
            await this.getBlogListCount()
            await this.scrollToTop()
        },
        handlePagePrams(c,s){
            this.current = c
            this.start = s            
            this.initFunc()
        },
    },
    created () {
        this.initFunc()
    },
    
}
</script>

<style>
#home-page{
    width: 100%;
    height: auto;
    box-sizing: border-box;
    padding-top: 20px;
}
#home-page .empty-block{
    height: 400px;
    width: auto;
    background: #fff;
    border-radius: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
#home-page .blog-list-block{
    height: auto;
    width: auto;
}
#home-page .pagenation-block{
    height: auto;
    width: 100%;
    display: flex;
    justify-content: center;
}
</style>
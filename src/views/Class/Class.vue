<template>
  <div id="about-page">
      <!-- <h1>this is class page</h1> -->

      <!-- empty class list block -->
      <div class="empty-class-block"
      v-show="class_list.length==0 && class_list_load== false"
      >
        <div>
          <ul>
            <h1>Sorry,Empty Class List</h1>
            <h3>可能的情况:</h3>
            <li><h4>1.管理员未添加分类</h4></li>
            <li><h4>2.所有分类被删除</h4></li>
            <li><h4>3.网络问题</h4></li>
            <li><h4>4.有 BUG !</h4></li>
          </ul>
        </div>
      </div>

      <!-- tab区域 -->
      <div class="blog-tab-block"
      v-if="class_list.length!=0"
      >
        <blogclasstab
        :classlist="class_list"
        :activeclass="active_class"
        @transTabClick="handleTabClick"
        >
        </blogclasstab>
      </div>

      <!-- empty blog block -->
      <div class="empty-blog-block"
      v-show="blog_list.length==0 && blog_list_load==false"
      >
        <div>
          <ul>
            <h1>Sorry,Empty Blog List</h1>
            <h3>可能的情况:该分类<span>{{active_class}}</span></h3>
            <li><h4>1.没有博客</h4></li>
            <li><h4>2.博客被冻结</h4></li>
            <li><h4>3.博客被删除</h4></li>
            <li><h4>4.博客未发布</h4></li>
            <li><h4>5.有 BUG !</h4></li>
          </ul>
        </div>
      </div>

      <!-- 博客区域 -->
      <div class="blog-list-block"
      v-if="this.blog_list.length!=0"
      >
        <span
          v-for="(blog,index) in blog_list"
          :key="index"
          >
            <blogitemformate
            :blog="blog"
            :showclass="false"
            >
            </blogitemformate>
        </span>
      </div>

      <!-- 分页器区域 -->
      <div class="pagenation-block"
      v-if="this.blog_list.length!=0"
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
import BlogClassTab from './tab/BlogClassTab.vue'
import BlogItemFormate from '../../components/BlogItem/BlogItemFormate.vue'
import Pagenation from '../../components/Pagenation/Pagenation.vue'

// import Skeleton from '../../components/Skeleton/Skeleton.vue'
import { defaultmixin } from '../../mixins/defaultmixin'
import { classlistAPI,
        getblogbyclassAPI,
        getblogbyclasscountAPI,       
        } from '../../http/api'

export default {
    name:'Class',
    mixins:[defaultmixin],
    data(){
      return{
        class_list:[],
        blog_list:[],
        length:setting.class.blogs_length,
        active_class:'',
        class_list_load:true,
        blog_list_load:true
      }
    },
    components:{
      blogclasstab : BlogClassTab,
      blogitemformate:BlogItemFormate,
      pagenation:Pagenation,
      // skeleton : Skeleton
      // 技术帖,日记,随笔,实验
    },
    methods:{
      getClassList(){
        return new Promise((resolve,reject)=>{
          classlistAPI()
            .then(res=>{
              let temp = Object.values(res.data)[0].Class_List
              if(temp.length > 0){
                this.class_list = temp.split(',')
                this.active_class = temp.split(',')[0]
              }
              else if(temp.length == 0){
                this.class_list_load = false
              }
              resolve()
            })
            .catch(err=>{
              reject(console.log(err))
            })
            .finally(()=>{
              this.class_list_load = false
            })
        })
      },
      //根据class name 获取博客列表
      getBlogListByClass(){
        return new Promise((resolve,reject)=>{
          getblogbyclassAPI({
            Blog_Class:this.active_class,
            Start:this.start,
            Length:this.length
          })
          .then(res=>{
            
            if(Object.values(res.data).length>0){
              this.blog_list = Object.values(res.data)
            }
            else if(Object.values(res.data).length==0){
              this.blog_list_load = false
            }
            resolve()
          })
          .catch(err=>{
            reject(console.log(err))
          })
          .finally(()=>{
            this.blog_list_load = false
          })
        })
      },
      getBlogListClassCount(){
        return new Promise((resolve,reject)=>{
          getblogbyclasscountAPI({
            Blog_Class:this.active_class
          })
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
        await this.getClassList()
        await this.getBlogListByClass()
        await this.getBlogListClassCount()
      },
      async fetchAgain(){
        await this.getBlogListByClass()
        await this.getBlogListClassCount()
        await this.scrollToTop()
      },
      async handleTabClick(n){
        if(this.class_list.length!=0){
          this.active_class = n
          this.blog_list = []
          //能点击tab 说明 class_list 不为空，
          // 因此这里只重置博客列表数据

          // 1.空列表多，blog_list_load 不处理

          // 2.空列表少，blog_list_load 设为 true
          this.blog_list_load = true
          this.fetchAgain()
        }
      },
      async handlePagePrams(c,s){
        this.current = c
        this.start = s
        this.fetchAgain()
      },
    },
    async created(){
      this.initFunc() 
    },
    updated(){
    },
    watch:{
    }
}
</script>

<style scoped>

#about-page{
  width: 100%;
  height: auto;
  /* background: cadetblue; */
  display: flex;
  flex-direction: column;
}
#about-page .empty-class-block{
    height: 360px;
    width: auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    box-shadow: 0 0 5px rgb(0 0 0 / 5%);
}
#about-page .blog-tab-block{
  height: auto;
  width: 100%;
  /* background: darkorange; */
}
#about-page .empty-blog-block{
  height: 400px;
    width: auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 20px;
}
#about-page .empty-blog-block span{
  color: goldenrod;
}


#about-page .blog-list-block{
  margin-top: 20px;
  width: auto;
  min-height: 500px;
  height: auto;
  /* padding: 0px 10px ; */
  /* background:darkgreen; */
}
#about-page .pagenation-block{
  /* margin-top: 20px; */
  height: 100px;
  width: auto;
  display: flex;
  justify-content: center;
  /* align-items: center; */
  /* background: darksalmon; */
}
</style>
<template>
  <div id="searched-page">

      <div class="tittle">
        <span>
            文章搜索
            <i class="el-icon-document"></i>
        </span>
      </div>
      <!-- 搜索结果为空时 -->
      <div class="empty-blog-blok"
      v-show="bloglist.length==0 && load==false"
      >
          <div>
              <h1>Sorry,Empty Search Result!</h1>
              <h3>可能的情况:搜索关键字(<span>{{keywords}}</span>)：</h3>
              <ul>
                  <li><h4>1.无对应搜索结果</h4></li>
                  <li><h4>2.服务器或者网络的问题</h4></li>
              </ul>
              <h4>建议检查网络情况，或者约束，更换搜索关键字</h4>
          </div>
      </div>
      <!-- <h1>this is Searched Page</h1>
      <h3>keywords:{{keywords}}</h3>
      <h3>length:{{length}}</h3>
      <h3>limiter:{{limiter}}</h3>
      <h3>pagearray:{{pagearray}}</h3>
      <h3>initend:{{initend}}</h3> -->

      
      <!-- 搜索结果 不为空时 -->
      <div class="blog-block"
      v-show="bloglist.length!=0"
      >
        <span
        v-for="(item,index) in bloglist"
        :key="index"
        >
            <blogitemformate
            :blog="item"
            >
            </blogitemformate>
        </span>
      </div>


      <!-- 分页器 -->
      <div class="pagenation-block"
      v-show="bloglist.length!=0"
      >
        <searchedpagenation
        
        :length="length"
        :total="total"
        @transPrevClick="handlePrevClick"
        @transNextClick="handleNextClick"
        >
        </searchedpagenation>
      </div>





      
  </div>
</template>

<script>
import setting from '../../../setting'
import { defaultmixin } from '../../../mixins/defaultmixin'
import BlogItemFormate from '../../../components/BlogItem/BlogItemFormate.vue'
import SearchedPagenation from './Pagenation/SearchedPagenation.vue'
import { 
    searchblogsAPI,
    searchblogscountAPI
 } from '../../../http/api'
export default {
    name:'Searched',
    mixins:[defaultmixin],
    data(){
        return {
            //搜索关键字
            keywords:'',
            //empty-block v-show条件
            load:true,
            //博客搜索结果列表
            bloglist:[],

            //搜索参数
            //搜索博客列表长度
            length:setting.searched.blogs_length,
            //搜索限制,也是博客搜索后，最后一个结果的Blog_Id,初始为0
            limiter:0,
            //初始化查找标识，当初始化查询完成，立即设为 1
            //初始化为0
            initend:0,
            //搜索结果完成后，将最后一位Blog_Id存入pagearray，
            //当点击上一页时，查找pagearray的上一页记录，
            //再将limiter替换为该值,
            //（这里后台已经处理好了，返回limiter属性直接设置即可）
            //（初始化值为0 代替 limiter）
            pagearray:[0],
            //是否点击了上一页
            clickprev:false,

            //分页器参数
            total : 0
            
        }
    },
    components:{
        blogitemformate: BlogItemFormate,
        searchedpagenation : SearchedPagenation
    },
    methods:{
        //获取传来的搜素关键字
        getSearchKeyWords(){
            this.keywords = this.$route.query.keywords
        },
        initSearchBlogs(){
            //重置 点击过上一页 的 flag(clickprev)
            //因为点击上一页功能，再点击到第一页时，调用了此函数 
            this.clickprev = false
            
            searchblogsAPI({
                keywords:this.keywords,
                limiter:this.limiter,
                needlength:this.length,
                initend:0
            }).then(res=>{
                this.pagearray.push(res.data.limiter)
                this.limiter = res.data.limiter
                this.initend = 1
                if(res.data.list && res.data.list.length!=0){
                    this.bloglist = res.data.list
                }
            }).catch(err=>{
                console.log(err)
            }).finally(()=>{
                this.load  = false
            })
        },
        searchBlogsCount(){
            searchblogscountAPI({keywords:this.keywords})
            .then(res=>{
                this.total = res.data.fetchcount
            })
            .catch(err=>{console.log(res.data)})
        },
        searchPrevBlogs(){
            searchblogsAPI({
                keywords:this.keywords,
                limiter:this.limiter,
                needlength:this.length,
                initend:this.initend
            }).then(res=>{
                this.bloglist = res.data.list
            }).catch(err=>{
                console.log(err)
            })
        },
        //一直点击下一页
        searchNextBlogs(){
            searchblogsAPI({
                keywords:this.keywords,
                limiter:this.limiter,
                needlength:this.length,
                initend:this.initend
            }).then(res=>{
                this.pagearray.push(res.data.limiter)
                this.limiter = res.data.limiter
                this.bloglist = []
                this.bloglist = res.data.list
            }).catch(err=>{
                console.log(err)
            })
        },
        //点击了上一页按钮后再点击下一页
        searchPrevThenNextBlogs(){
            searchblogsAPI({
                keywords:this.keywords,
                limiter:this.pagearray[this.pagearray.length-1],
                needlength:this.length,
                initend:this.initend
            }).then(res=>{
                this.pagearray.push(res.data.limiter)
                this.limiter = res.data.limiter
                this.bloglist = res.data.list
            }).catch(err=>{
                console.log(err)
            })
        },
        async handlePrevClick(c){
            //只要点击 prev按钮，flag （clickprev） 变为 true
            //直到点击到了第一页，触发 初始化查询函数，该函数再将 clickprev 变为 false
            this.clickprev = true
            if(c==1){
                this.limiter = this.pagearray[c-1]
                this.pagearray = [0]
                await this.initSearchBlogs()            
            }
            else{
                this.pagearray = this.pagearray.slice(0,c+1)
                this.limiter = this.pagearray[c-1]
                await this.searchPrevBlogs()
            }
            await this.searchBlogsCount()
            await this.scrollToTop()
        },
        async handleNextClick(c){
            if(!this.clickprev){
                await this.searchNextBlogs()
            }else{
                await this.searchPrevThenNextBlogs()
            }
            await this.searchBlogsCount()
            await this.scrollToTop()
        },
        async initFunc(){
            await this.initSearchBlogs()
            await this.searchBlogsCount()
        }

    },
    created(){
        this.getSearchKeyWords()
        this.initFunc()
    },
    beforeDestroy(){
        console.log('destory!!')
        this.$store.commit('modifyKeyWords','')
    },
    watch:{
        '$route.query.keywords':{
            handler(newVal,oldVal){
                // console.log(newVal)
                // console.log(oldVal)
                if(oldVal!=newVal){
                    // console.log('++++++>'+this.$route.query.keywords)
                    this.keywords = newVal
                    this.load = true
                    this.bloglist = []
                    this.limiter = 0
                    this.initend = 0
                    this.pagearray = [0]
                    this.clickprev = false
                    this.total = 0
                    this.initFunc()
                }
            },
            immediate:true
        },
    }

}
</script>

<style scoped>
#searched-page{
    height: auto;
    width: auto;
}
.tittle{
  height: auto;
  width: auto;
  padding: 10px 0px;
}
.tittle span{
    font-size: 20px;
    font-weight: bold;
}
.empty-blog-blok{
    height: 400px;
    width: auto;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
}
.empty-blog-blok span{
    color: red;
}
.pagenation-block{
    height: auto;
    width: auto;
    /* background: gray; */
}
.blog-block{
    height: auto;
    width: auto;
    /* background: #fff; */
    border-radius: 5px;
    /* overflow: hidden; */
}
</style>
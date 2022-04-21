<template>
  <div id="user-collection">
      <h2>Collection</h2>

      <!-- 收藏为空 -->
      <div class="collect-empty-format-control"
      v-if="user_collection_list.length==0 && loading"
      >
          <div class="empty-block">
              <h3>收藏夹为空</h3>
              <h4>快去收藏感兴趣的文章吧..</h4>
          </div>
      </div>
      <!-- 收藏文章区域 -->
      <div class="collect-format-control">
          <div
          class="collect-block"
            v-for="(item,index) in user_collection_list"
            :key="index"
          >
            <div
            class="collect-item"
            @dblclick="details(item.Blog_Id)"
            >
                <div class="collect-info-panel">
                    <h4>{{item.Blog_Title}}</h4>
                    <p>{{item.Blog_Summary}}</p>
                </div>
                <div class="collect-opreation">
                    <el-button size="small" class="un-collect-btn"
                    type="warning"
                    plain
                    @click.stop="unCollect(item.Blog_Id)"
                    >取消收藏</el-button>
                </div>
            </div>
          </div>
      </div>

      <div class="load-more-fromat-control">
          <div class="load-more-block">
              <el-button
              class="load-more-btn"
              type="success"
              size="medium"
              @click="loadMore"
              v-if="show_load_more"
              >加载更多</el-button>
          </div>
      </div>
  </div>
</template>

<script>
import setting from '../../../../../setting'
import { 
    getCollectListUserAPI,
    uncollectuserAPI
 } from '../../http/user_api'
export default {
    name:'UserCollection',
    data(){
        return{
            //收藏列表
            user_collection_list:[],
            start:0,
            length:setting.userzone.collection.length,
            show_load_more:true,
            loading:false
        }   
    },
    methods:{
        getCollection(){
            getCollectListUserAPI({
                User_UniqueId:this.$store.getters.userinfo.uniqueid,
                Start:this.start,
                Length:this.length
            })
            .then(res=>{
                if(Object.values(res.data).length==0){
                    this.$message({
                        message: '加载完成，没有收藏',
                        type: 'warning'
                    });                   
                    this.show_load_more = false
                }
                this.user_collection_list =this.user_collection_list.concat(Object.values(res.data)) 
                // console.log(res.data)
            })
            .catch(err=>{
                console.log(err)
            })
            .finally(()=>{
                this.loading = true
            })
        },
        //点击收藏item，跳转到详情页面
        details(id){
            let {href} = this.$router.resolve({
                path:'/details',
                query:{
                    Blog_Id:id
                }
            });
            window.open(href, '_blank');
        },
        //取消收藏
        unCollect(id){
            // console.log(id)            
            uncollectuserAPI({
                Blog_Id:id,
                User_UniqueId:this.$store.getters.userinfo.uniqueid
            }).then(res=>{
                this.$message({
                    message: '已取消收藏',
                    type: 'success'
                });
                this.user_collection_list=this.user_collection_list.filter(v=>{
                    return v.Blog_Id!=id
                })
            }).catch(err=>{console.log(err)})
        },
        //加载更多
        loadMore(){
            this.start = this.start+this.length
            // console.log('load more '+this.start)
            this.getCollection()
        }
    },
    created(){
        this.getCollection()
    }
}
</script>

<style scoped>
#user-collection{
    overflow: auto;
    /* height: 100%;
    width: 100%; */
    height:100%;
    width: 100%;
    
}
.collect-format-control{
    padding: 5px;
}
.load-more-fromat-control{
    padding: 5px;
}
.collect-empty-format-control{
    padding: 5px;
}
.empty-block{
    height: 200px;
    width: 90%;
    border-radius: 4px;
    
    box-shadow: 0 0 5px rgb(0 0 0 / 10%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
}
/* .collect-block{
    
} */
.collect-item{
    min-height: 80px;
    width: 90%;
    background: #fff;
    margin: 4px 0px;
    padding: 2px 8px;
    line-height: 24px;
    border-radius: 4px;
    box-shadow: 0 0 3px rgb(0 0 0 / 10%);
    word-wrap: break-word;

    position: relative;
}
.collect-item:hover{
    box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
    background: rgb(250, 250, 250 ,0.5);
}
.collect-item p,h4{
    text-indent: 1em;
    margin:0 !important;
    padding: 0 !important;
}
.collect-info-panel{
    width: 80%;
    min-height: 80px;
    /* background: rgb(241, 240, 240); */   
    display: -webkit-box; 
    line-height: 28px;
    -webkit-box-orient: vertical;    
    -webkit-line-clamp: 3;    
    overflow: hidden; 
}

.collect-opreation{
    position: absolute;
    right: 5px;
    top: 5px;
}
.un-collect-btn{
    width: 54px;
    height: 30px;
    text-align: center;
    text-overflow:ellipsis;
    padding: 0 !important;
    /* margin: 0 !important; */
}
</style>
<template>
    <div id="blog-aside">
        <!-- 广告区域 -->
        <div class="advertisement-block">
            <div class="adv-tittle">
                <h3 v-text="adv_info.Adv_Tittle"></h3>
            </div>
            <div class="adv-intro">
                <p v-text="adv_info.Adv_Introduction"></p>
            </div>
            <div class="adv-img"
            v-if="adv_list&&adv_list.length>0"
            >
                <span
                class="adv-img-control"
                v-for="(item,index) in adv_list"
                :key="index"
                >
                    <a :href="item.Adv_Img_Link" target="_blank">
                        <img :src="item.Adv_Img_Url" alt="adv-img">
                    </a>
                </span>
                
            </div>
            
        </div>
        <!-- 文章归档区域-->
        <div class="arranged-block">
            <h2 style="padding-left:15px">归档</h2>
            <div
            v-for="(item,index) in arranged_blogs_list"
            :key="index"
            >
                <span class="year-area">
                    <h2
                    @click="showHiddenItem(item.year)"
                    >
                        {{item.year}}
                        <span class="blog-total">
                            ({{item.children.length}}) 篇
                        </span>
                    </h2>
                </span>
                

                 <span v-show="show_year.includes(item.year)">
                     <el-timeline>
                        <el-timeline-item
                        v-for="(it,index) in item.children"
                        :key="index"
                        
                        color="#00bcd4"

                        :timestamp="it.Blog_Createtime">
                        <span 
                        class="blog-item"
                        @click.stop="linkToDetails(it.Blog_Id)"
                        >
                            {{it.Blog_Title}}
                        </span>
                        </el-timeline-item>
                    </el-timeline>
                 </span>
            </div>
           
        </div>
    </div>
</template>

<script>
import {
    getarrangedblogsAPI,
    getadvertisementAPI,
} from '../../http/api'

export default {
    name:'BlogAside',
    data(){
        return{
            //归档博客列表
            arranged_blogs_list:[],
            //展示年份（只展示最顶层年份的博客，有其他年份的 则隐藏）
            show_year:[],
            //广告页面信息
            adv_info:{
                Adv_Tittle:'',
                Adv_Introduction:'',
            },
            //广告列表
            adv_list:[]
        }
    },
    methods: {
        //获取广告信息
        getAdvertisement(){
            getadvertisementAPI().then(res=>{
                let temp = Object.values(res.data)[0]
                this.adv_info.Adv_Tittle = temp.Adv_Tittle
                this.adv_info.Adv_Introduction = temp.Adv_Introduction                
                let mix = temp.Adv_Img_Link_Url.split(',')               
                if(mix.length==1){
                    let obj = {}
                    let item = mix[0].split('*')
                    obj.Adv_Img_Url = item[0]
                    obj.Adv_Img_Link = item[1]
                    this.adv_list.push(obj)
                }else if(mix.length>1){
                    mix.map(v=>{
                        let obj = {}
                        let item = v.split('*')
                        obj.Adv_Img_Url = item[0]
                        obj.Adv_Img_Link = item[1]
                        this.adv_list.push(obj)                   
                    })
                }
            }).catch(err=>{console.log(err)})
        },
        //点击年份，显示隐藏的博客
        showHiddenItem(y){
            if(!this.show_year.includes(y)){
                this.show_year.push(y)
            }else{
                this.show_year = this.show_year.filter(v=>{
                    return v!=y
                })
            }
        },
        //点击blog title ，跳转到详情
        linkToDetails(id){
            // console.log(id)
            let {href} = this.$router.resolve({
                path:'/details',
                query:{
                    Blog_Id:id
                }
            });
            window.open(href, '_blank');
        },
        //获取归档博客，按照年份重组
        getArrangedBlogs(){
            getarrangedblogsAPI().then(res=>{
                let temp = Object.values(res.data)
                let year_list = []
                temp.forEach(v=>{
                    v.year = this.$moment(v.Blog_Createtime).format("YYYY")
                    v.Blog_Createtime = this.$moment(v.Blog_Createtime).format("MM-DD")                    
                    year_list.push(v.year)
                })
                //年份去重
                let unique_year =new Set(year_list)
                //map 存 年份 的index,因为set的foreach没有index
                let map = new Map()
                let save = []
                let index =0
                unique_year.forEach((v)=>{
                    let obj = new Object()
                    obj.year = v
                    obj.children = []
                    save.push(obj)
                    map.set(v,index)
                    temp.map(val=>{                        
                        if(v==val.year)
                        save[map.get(v)].children.push(val)
                    })
                    //默认展示最近年份博客，将年份存入展示数组
                    if(index==0){
                        this.show_year.push(v)
                    }
                    index++
                })
                this.arranged_blogs_list = save
            }).catch(err=>{console.log(err)})
        }
    },
    created(){
        this.getArrangedBlogs()
        this.getAdvertisement()
    }
}
</script>

<style scoped>
#blog-aside{
    width: auto;
    height: auto;
}
.advertisement-block{
    width: auto;
    min-height: 400px;
    height: auto;
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    margin-bottom: 10px;
    box-shadow: 0 0 10px rgb(0 0 0 / 12%);
    word-wrap: break-word;
    padding-bottom: 20px;
    overflow: hidden;
}

.adv-tittle{
    text-align: center;
    width: auto;
    height: auto;
}
.adv-intro{
    width: auto;
    height: auto;
    text-indent: 1em;
    /* word-wrap: break-word; */
    font-size: 13px;
    font-weight: 200;
    color: grey;
}
.adv-img{
    height: auto;
    width: auto;
}
.adv-img-control{
    min-height: 300px;
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
.adv-img img{
    min-height: 295px;
    min-width: 100%;
    height: auto;
    width: auto;
    background: #fff;
}
.arranged-block{
    width: 100%;
    /* height: 600px; */
    height: auto;
    min-height: 500px;
    /* overflow: auto; */
    background: #fff;
    border: 1px solid #fff;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 10px;
    box-shadow: 0 0 10px rgb(0 0 0 / 12%);
    word-wrap: break-word;
}
/* .year-area{
    word-wrap: break-word;
} */
.year-area h2{
    margin-left: 30px;
    cursor: pointer;
}
.year-area h2:hover{
    text-decoration: underline;
}
.blog-total{
    font-size:13px;
    font-weight:500
}
.blog-item{
    cursor: pointer;
    font-weight: 500;
    font-size: 13px;
}
.blog-item:hover{
    font-weight: bold;
}
</style>
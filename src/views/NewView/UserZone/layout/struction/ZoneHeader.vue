<template>
  <div id="zone-header">
      <span>
          <i class="back-to-home el-icon-back" @click="$router.push('/home')"></i>
          <span class="back-title">BackToHome</span>
      </span>
        <div class="badge-control">
            <el-badge
            class="item"
            :value="$store.getters.unreadnoticount!=0?$store.getters.unreadnoticount:''"

            ></el-badge>
        </div>
        <div class="hidden-btn">
            <el-dropdown
            ref="dropdown"
            trigger="hover"
            >
                <span class="el-dropdown-link">
                    <i class="el-icon-s-operation"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <span
                    v-for="(item,index) in navbar"
                    :key="index"                  
                    >
                    <div
                    class="nav-item"
                    :class="acitive==item.path?'nav-active':''"
                    @click="handleNavClick(item.path)"
                    >
                        <el-badge 
                        :value="index==2&&$store.getters.unreadnoticount!=0?$store.getters.unreadnoticount:''" 
                        :max=99
                        class="item">
                            {{item.title}}
                        </el-badge>
                    </div>
                    </span>
                </el-dropdown-menu>
            </el-dropdown>
        </div>
  </div>
</template>

<script>
export default {
    name:'ZoneHeader',
    data(){
        return {
            navbar:[
                {
                title:'用户主页',
                path:'/userzone/userindex'
                },
                {
                title:'收藏文章',
                path:'/userzone/usecollection'
                },
                {
                title:'消息通知',
                path:'/userzone/usernotification'
                },
                {
                title:'个人资料',
                path:'/userzone/userinformation'
                },
            ],
            acitive:this.$route.path,
        }
    },
    methods:{
        handleNavClick(p){
            // this.acitive = p
            this.$router.push(p)
            this.$refs.dropdown.hide()
        },
    },
    watch:{
        '$route.path':{
            handler(newval,oldval){
                // console.log(newval)
                this.acitive = newval
            },
            deep:true
        }
    }
}
</script>
<style>

</style>
<style scoped>
#zone-header{
    height: 50px;
    width: auto;
    background: #fff;
    box-shadow: 0 0 5px 1px rgb(0 0 0 / 10%);
    display: flex;
    align-items: center;
   
}
.back-to-home{
    font-size: 38px;
    cursor: pointer;
    border-radius: 2px;
    width: auto;
    height: auto;

    box-shadow: 0 0 5px 1px rgb(0 0 0/10%);
    margin-left: 20px;
}
.back-to-home:hover{
    box-shadow: 0 0 10px 2px rgb(0 0 0/20%);
}
.back-title{
    font-size: 24px;
    font-weight: 600;
}
/* 控制 隐藏按钮上 消息图标 */
.badge-control{
    display: block;
    position: absolute;
    right: 0;
    top: 0;
    margin-right: 15px;
    z-index: 100;
    display: none;
}
/* 隐藏按钮 控制隐藏dropdown面板 */
.hidden-btn{
    display: block;
    position: absolute;
    right: 0;
    margin-right: 20px;
    border-radius: 2px;

    display: none;    
}

.el-dropdown-link i{
    font-size:38px;
    color: #000000;
    /* border: 1px solid #eee; */
    box-shadow: 0 0 5px 1px rgb(0 0 0/10%);

}
.el-dropdown-link i:hover{
    box-shadow: 0 0 5px 2px rgb(0 0 0/20%);
}
.el-dropdown-menu__item{
    line-height: 42px;
    padding: 0 45px !important;
    font-size: 14px;
    color: #000000;
    margin: 4px 0px;
}

.nav-item{
  cursor: pointer;
  padding: 0 45px;
  margin-top: 2px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  
}
.nav-active{
  box-shadow: 0 0 5px 0 rgb(0 0 0/15%) !important;
}
@media screen and (min-width: 0px) and (max-width:520px) {
    .hidden-btn{
        display: block;
        position: absolute;
        right: 0;
        margin-right: 20px;
        border-radius: 2px;
        
    }
    .badge-control{
        display: block;
        position: absolute;
        right: 0;
        top: 0;
        margin-right: 15px;
        z-index: 100;
    }
}
</style>
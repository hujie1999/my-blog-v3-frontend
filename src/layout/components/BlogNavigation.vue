<template>
  <div>
    <div class="nav" ref="nav">
      <div class="nav-left">
        <div class="avatar-area">
          

          <span
          v-if="$store.getters.avatar==''"         
          >
            <a href="/">
              <img src="../../assets/logo1.jpg" alt="默认" />
            </a>
          </span>
          <span
          v-else       
          >
            <span @click="$router.push({name:'userzone'})">
              <img :src="imgbaseurl+$store.getters.avatar" alt="用户头像" />
            </span>
          </span>
        </div>
      </div>
      <div class="nav-list">
        <ul>
          <li
            v-for="(item, index) in nav"
            :key="index"
            @click="changeNavIndex(index)"
            :class="navIndex == index ? 'navactive' : ''"
          >
            <router-link :to="item.path">
              <i :class="item.iclass"></i>
              <span v-text="item.title"></span>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="nav-search">
        <!-- <input type="text"> -->
        <el-input
          placeholder="多条件用*号隔开"
          class="input-with-select"
          maxlength="20"
          v-model="keywords"
          size="medium"
          @keydown.enter.native="enterSearch"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
            class="search-btn-default"
            @click="clickToSearched"
          ></el-button>
        </el-input>
      </div>
      
      <div class="nav-opra"
      v-if="!showOperatePanel"
      >
        <ul>
          <li
          @click="login('/login')"
          >
            <a>
              <span>登陆</span>
            </a>
          </li>
          <li>
            <span>|</span>
          </li>
          <li
          @click="regist('/regist')"
          >
            <a>
              <span>注册</span>
            </a>
          </li>
        </ul>
      </div>

      <div class="nav-search-hidden">
        <el-input
          v-if="this.show_hidedeninput"
          placeholder="多条件用*号隔开"
          class="input-hidden"
          maxlength="20"
          v-model="keywords"
          size="medium"
          @keydown.enter.native="enterSearch"
          >
            
          </el-input>
          <span class="hidden-search-icon-control"
          @click="changeHiddenInput"
          >
            <i class="el-icon-search"></i>
          </span>
      </div>
      <!-- 用户空间(登陆成功显示) -->
      <div 
      v-if="showOperatePanel"
      class="nav-opra nav-user-space">
        <ul>
          <li
          @click="logout"
          >
            <a>
              <i class="el-icon-switch-button"></i>
              <span>登出</span>
            </a>
          </li>
          <li>
            <span>|</span>
          </li>
          <li
          @click="userZone"
          >
            <a>
              <el-badge 
              :value="$store.getters.unreadnoticount==0?'':$store.getters.unreadnoticount" 
              :max=99
              class="item">
                <i class="el-icon-star-off"></i>
                <span>个人空间</span>
              </el-badge>
              
            </a>
          </li>
        </ul>
      </div>
      <!-- 折叠面板点击显示按钮 -->
      <div class="collapse-btn">
        <el-badge 
              :value="$store.getters.unreadnoticount==0?'':$store.getters.unreadnoticount" 
              :max=99
              class="item">

              <span>
                <i class="el-icon-s-operation" @click="showHiddenList"></i>
              </span>
        </el-badge>
        
      </div>
    </div>

    <div class="hidden-list" ref="hiddenlist" v-show="show_hiddenlist">
      <ul>
        <!-- <li
        style="padding:2px 0px"
        >
          <div>
            <el-input
              placeholder="多个查询条件请使用*号隔开"
              class="input-with-select"
              maxlength="20"
              v-model="keywords"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="clickToSearched"
              ></el-button>
            </el-input>
          </div>
        </li> -->

        <li
          v-for="(item, index) in nav"
          :key="index"
          @click="changeNavIndex(index)"
          :class="navIndex == index ? 'navactive' : ''"
        >
          <router-link :to="item.path">
            <i :class="item.iclass"></i>
            <span v-text="item.title"></span>
          </router-link>
        </li>
        <span
        v-if="!showOperatePanel"
        >
          <li
          @click="login('/login')"
          >
          <a>
            <span>登陆</span>
          </a>
          </li>
          <li
          @click="regist('/regist')"
          >
            <a>
              <span>注册</span>
            </a>
          </li>
        </span>
        <span
        v-if="showOperatePanel"
        >
          <li  
          @click="userZone">
          <a>
            <el-badge 
              :value="$store.getters.unreadnoticount==0?'':$store.getters.unreadnoticount" 
              :max=99
              class="item">
                <i class="el-icon-star-off"></i>
                <span>个人空间</span>
            </el-badge> 
          </a>
          </li>
          <li 
          @click="logout">
            <a>
              <i class="el-icon-switch-button"></i>
              <span>登出</span>
            </a>
          </li>
        </span>

        
      </ul>
    </div>
  </div>
</template>


<script>
import { 
  searchblogsAPI,
} from "../../http/api";
import setting from '../../setting'
import { randomId } from "../../utils/randomid";
export default {
  name: "BlogNavigation",
  data() {
    return {
      imgbaseurl:setting.imgbaseurl,
      show_hiddenlist: false,
      show_hidedeninput : false,
      keywords: "",
      nav: [
        { title: "首页", path: "home", iclass: "el-icon-s-home" },
        { title: "分类", path: "class", iclass: "el-icon-menu" },
        { title: "实验室", path: "laboratory", iclass: "el-icon-price-tag" },
        { title: "留言", path: "message", iclass: "el-icon-s-comment" },
        { title: "关于", path: "about", iclass: "el-icon-s-custom" },
      ],
      navIndex: 0,
    };
  },
  computed: {
    //登录 注册 登出 个人空间
    showOperatePanel(){
      return this.$store.getters.islogin
    }
  },
  methods: {
    changeNavIndex(i) {
      this.navIndex = i;
      this.show_hiddenlist = false
    },
    dealPath() {
      let path = this.$route.path;
      this.navIndex = this.nav.findIndex((item) => "/" + item.path === path);
    },
    showHiddenList() {
      this.show_hiddenlist = !this.show_hiddenlist;
    },

    //改变隐藏的搜索框状态
    changeHiddenInput(){
      this.show_hidedeninput = !this.show_hidedeninput
    },
    //键入 Enter 进行搜索
    enterSearch(){
      this.clickToSearched()
    },
    throttle(fn) {
      let canRun = true;
      return ()=>{
        if(canRun) {
          canRun = false;
          fn.call(this, arguments);
          setTimeout(() => {
            canRun = true;
          },1000);
        }
        else
        return;
      };
    },
    //登录
    login(path){
      this.$router.push(path)
      this.show_hiddenlist = false
    },
    //登出
    logout() {
      localStorage.removeItem("UserInfo");
      let touristinfo = {
        islogin: false,
        token: "",
        nickname: '游客'+randomId(10),
        role: "Tourist",
        account: randomId(15),
        uniqueid: randomId(16),
        avatar:"",
      };
      this.$store.commit("modifyUserInfo", touristinfo);
      this.$store.commit('modifyUnReadNotiCount',0)
      this.show_hiddenlist = false
      // this.$router.history.go(0)
    },
    //注册
    regist(path){
      this.$router.push(path)
      this.show_hiddenlist = false
    },
    //用户空间
    userZone(){
      this.$router.push('/userzone')
      this.show_hiddenlist = false
    },
    //点击搜索
    clickToSearched() {
      if(this.keywords.split(' ').join('').length==0){
        this.keywords = ''
        this.$message({
          message:'输入为空！请重新输入！',
          type:'error',
          duration:3000,
          center:true,
          showClose:true
        })
      }else{
        let store_keywords = this.$store.getters.keywords;
        if (store_keywords != this.keywords) {
          this.$store.commit("modifyKeyWords", this.keywords);
          this.$router.push({
            path: "/searched",
            query: {
              keywords: this.keywords,
            },
          });
        }
      }

    },



    
  },
  created() {
    this.dealPath();
    //屏幕尺寸改变或者有屏幕滚动时，隐藏appen nav list
    window.addEventListener("resize",this.throttle(()=>{
      this.show_hiddenlist=false
    }));
    window.addEventListener("scroll",this.throttle(()=>{
      this.show_hiddenlist=false
    }));
  },
  beforeDestory() {
    // 因为nav全局都需展示，需要全局监听resize scroll，所以不用销毁
  },
};
</script>

<style scoped>
.nav {
  width: auto;
  text-align: center;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 80px;
  background: #fff;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
}
.nav a {
  color: #000000;
}
.nav a:hover {
  color: #9e9e9e;
}

.avatar-area {
  height: 74px;
  width: 74px;
  background: #fff;
  border-radius: 37px;
  overflow: hidden;
  border: 1px solid #eee;
  position: relative;
}
/* .avatar-area:hover{
  border: 1px solid grey;
} */
.avatar-area img {
  width: 100%;
  height: 100%;
}
.nav-list {
  height: auto;
  width: auto;
}
.nav-list ul {
  margin: 0;
  padding: 0;
  height: 80px;
}
.nav-list ul li {
  float: left;
  list-style: none;
  text-decoration: none;
  height: 80px;
  /* background: #fff; */
  display: flex;
  align-items: center;
  overflow: hidden;
}
.nav-list ul li a {
  text-decoration-line: none;
  padding: 100% 15px;
}
/* 导航的高亮 active类 */
.navactive {
  box-shadow: 0 0 10px 1px rgb(0 0 0 / 10%);
  font-weight: bold;
  background: #fafafa;
}
/* .nav-search{

} */
.nav-search .input-with-select{
  width: 190px !important;
}
.nav-search-hidden{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80px;
}

.nav-search-hidden .input-hidden{
  width: 160px !important;
}
.hidden-search-icon-control{
  padding: 8px;
  font-size: 24px;
}
.nav-opra ul {
  margin: 0;
  padding: 0;
}
.nav-opra ul li {
  float: left;
  list-style: none;
  height: 80px;
  /* background: #fff; */
  display: flex;
  align-items: center;
  overflow: hidden;
}
.nav-opra ul li a {
  text-decoration-line: none;
  padding: 100% 15px;
}
/* 折叠面板 */
.hidden-list {
  text-align: center;
  position: relative;
  width: 100%;
  /* mavon editor z-index为2000,因此需此元素>2000才能不被遮盖 */
  z-index: 2001;
  background: #fff;
  border-radius: 0px 0px 10px 10px;
  box-shadow: 0 0 5px 0 rgb(0 0 0 / 5%);
  position: fixed;
}
.hidden-list ul {
  margin: 0;
  padding: 0;
}
.hidden-list ul li {
  list-style: none;
  height: 40px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}
.hidden-list ul li a {
  width: 100%;
  padding: 100% 0px;
  text-decoration: none;
  color: #000;
  font-size: 1.2em;
}
/* .hidden-list ul li a:hover {
  background: #fafafa;
} */
.hidden-list ul li a span {
  margin-left: 10px;
}
.hidden-list ul li input[type="text"] {
  height: 38px;
  width: 200px;
}
.collapse-btn{
  height: auto;
  width: auto;
}
.collapse-btn i{
  font-size:38px;
  color: #000000;
  box-shadow: 0 0 5px 1px rgb(0 0 0/10%);

}
.collapse-btn i:hover{
    box-shadow: 0 0 5px 2px rgb(0 0 0/20%);
}
ul li,
i,
a,
span {
  cursor: pointer;
}
/* 这里只是测试，设置为xl尺寸的max为1500， */
/* 屏幕尺寸为>1920px  才属于xl */
/* 屏幕尺寸>1920px时 --->xl*/

@media screen and (min-width: 1500px) {
  .collapse-btn {
    display: none;
  }
  .nav-search-hidden{
    display: none;
  }
}
/* 屏幕尺寸>1200px时 --->lg*/
@media screen and (min-width: 1200px) and (max-width: 1500px) {
  .collapse-btn {
    display: none;
  }
  .nav-search-hidden{
    display: none;
  }
}
/* 屏幕尺寸>992px ,<1200px时 --->md*/
@media screen and (min-width: 992px) and (max-width: 1200px) {
  
  .nav {
    justify-content: space-between;
  }
  .nav-left {
    padding-left: 10px;
  }
  .collapse-btn {
    display: none;
  }
  .nav-search-hidden{
    display: none;
  }
}
/* 屏幕尺寸>768px, <992px时 --->sm*/
@media screen and (min-width: 768px) and (max-width: 992px) {
  .nav {
    /* background: yellow; */
    border-bottom: 1px solid #eee;
    /* padding: 0px 65px; */
    justify-content: space-around;
  }
  .nav-search {
    display: none;
  }
  .nav-list {
    display: none;
  }
  .nav-opra {
    display: none;
  }
  .nav-left {
    position: absolute;
    left: 8%;
  }
  .collapse-btn {
    position: absolute;
    right: 8%;
  }
  .nav-search-hidden{
    position: absolute;
    right: 160px;
  }
}
/* 屏幕尺寸>0px , <768px时 --->xs*/
@media screen and (min-width: 0px) and (max-width: 768px) {
  .nav {
    /* background: green; */
    border-bottom: 1px solid #eee;
    justify-content: space-around;
  }
  .nav-list {
    display: none;
  }
  .nav-search {
    display: none;
  }
  .nav-opra {
    display: none;
  }
  .nav-left {
    position: absolute;
    left: 2%;
  }
  .collapse-btn {
    position: absolute;
    right: 2%;
  }
  .nav-search-hidden{
    position: absolute;
    right: 60px;
  }
}
</style>
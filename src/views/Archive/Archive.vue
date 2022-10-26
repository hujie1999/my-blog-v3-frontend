<template>
  <div id="archive">
    <!-- 归档 -->

    <div class="archive-block">
      <div class="total-title">
        <h2>
          总计
          <span class="blog-total"> ({{ this.total_archive_count }}) 篇 </span>
        </h2>
      </div>

      <div v-for="(item, index) in archive_blogs_list" :key="index">
        <div class="year-area">
          <h2 @click="showHiddenItem(item.year)">
            {{ item.year }}
            <span class="blog-total"> ({{ item.children.length }}) 篇 </span>
          </h2>
        </div>

        <div class="timeline-list" v-show="show_year.includes(item.year)">
          <el-timeline>
            <el-timeline-item
              v-for="(it, index) in item.children"
              :key="index"
              color="#4b7bec"
              :timestamp="it.Blog_Createtime"
            >
              <span class="blog-item" @click.stop="linkToDetails(it.Blog_Id)">
                {{ it.Blog_Title }}
              </span>
            </el-timeline-item>
          </el-timeline>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getarchivesAPI } from "../../http/api";
export default {
  name: "Archive",
  data() {
    return {
      //归档博客列表
      archive_blogs_list: [],
      //展示年份（只展示最顶层年份的博客，有其他年份的 则隐藏）
      show_year: [],
      total_archive_count: 0
    };
  },
  methods: {
    //点击年份，显示隐藏的博客
    showHiddenItem(y) {
      if (!this.show_year.includes(y)) {
        this.show_year.push(y);
      } else {
        this.show_year = this.show_year.filter(v => {
          return v != y;
        });
      }
    },
    //点击blog title ，跳转到详情
    linkToDetails(id) {
      // console.log(id)
      let { href } = this.$router.resolve({
        path: "/details",
        query: {
          Blog_Id: id
        }
      });
      window.open(href, "_blank");
    },
    //获取归档博客，按照年份重组
    getArchives() {
      getarchivesAPI()
        .then(res => {
          const temp = Object.values(res.data) || [];
          this.total_archive_count = temp.length;
          const year_list = [];
          temp.forEach(v => {
            v.year = this.$moment(v.Blog_Createtime).format("YYYY");
            v.Blog_Createtime = this.$moment(v.Blog_Createtime).format("MM-DD");
            year_list.push(v.year);
          });
          //年份去重
          const unique_year = new Set(year_list);
          //map 存 年份 的index,因为set的foreach没有index
          const map = new Map();
          const save = [];

          let index = 0;
          unique_year.forEach(v => {
            const obj = new Object();
            obj.year = v;
            obj.children = [];
            save.push(obj);
            map.set(v, index);
            temp.map(val => {
              if (v == val.year) save[map.get(v)].children.push(val);
            });
            //默认展示最近年份博客，将年份存入展示数组
            if (index == 0) {
              this.show_year.push(v);
            }
            index++;
          });
          this.archive_blogs_list = save;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getArchives();
  }
};
</script>

<style scoped>
#archive {
  height: auto;
  width: 100%;
  padding-top: 20px;
}
.archive-block {
  box-sizing: border-box;
  width: 100%;
  height: auto;

  background: #fff;
  border-radius: 5px;
  box-shadow: 0 0 5px rgb(0 0 0 / 5%);
  word-wrap: break-word;
  padding-bottom: 20px;
}
.total-title{
    padding: 20px 0px 0px 20px;
}
.year-area{
    padding: 10px 10px 0px 30px;
}
.year-area h2 {
  margin-left: 30px;
  cursor: pointer;
  padding: 0;
  margin: 0;
}
.year-area h2:hover {
  text-decoration: underline;
}
.timeline-list{
    margin: 40px 0px 0px 20px;
}
.blog-total {
  font-size: 13px;
  font-weight: 500;
}
.blog-item {
  cursor: pointer;
  font-weight: 500;
  font-size: 13px;
}
.blog-item:hover {
  font-weight: bold;
}
.blog-item:hover:after{
    content: '点击跳转到该博客';
    /* font-weight: bold; */
    font-size: 12px;
    font-weight: 200;
    padding: 4px;
    margin: 0px 0px 0px 5px;
    color: #fff;
    background: #000;
    border-radius: 5px;
  }
</style>

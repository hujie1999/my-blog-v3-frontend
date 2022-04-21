<template>
  <div id="searched-pagenation">
    <!-- searched-pagenation 组件专属分页器 -->
    <el-pagination
      @prev-click="prevClick"
      @next-click="nextClick"
      :current-page="current"
      :page-size="blogs_length"
      layout="total, prev, next ,slot"
      :total="total"
    >
      <div class="slotclass" style="">
        <span>
            <span 
            style="margin-left:10px">
                总计 {{Math.ceil(total/this.blogs_length)}} 页
            </span>
        </span>
        <span
        style="margin-left:10px">
            当前页
            <span
            style="color: #409eff; font-weight: 600; font-size: 16px">
                {{current}}
            </span>
        </span>
      </div>
    </el-pagination>
  </div>
</template>

<script>
import setting from '../../../../setting'
export default {
  name: "SearchedPagenation",
  data() {
    return {
        blogs_length:setting.searched.blogs_length,
        current:1
    };
  },
  computed:{
  },
  props: {
    // current: {
    //   default: 1,
    //   type: Number,
    // },
    // start: {
    //   default: 0,
    //   type: Number,
    // },
    length: {
      default: 4,
      type: Number,
    },
    total: {
      default: 400,
      type: Number,
    },
    transPrevClick:{
        type: Function,
    },
    transNextClick:{
        type: Function,
    },
  },
  methods: {
    prevClick(val){
        // console.log(`prevClick当前页: ${val}`);
        this.current = val
        this.$emit('transPrevClick',val)
    },
    nextClick(val){
        // console.log(`nextClick当前页: ${val}`);
        this.current = val
        this.$emit('transNextClick',val)
    }

  },
};
</script>

<style>
#searched-pagenation{
    width: auto;
    height: auto;
    display: flex;
    justify-content: center;
}
.slotclass {
  display: inline-flex;
  margin-right: 10px;
}
.slotclass span {
  font-weight: 400;
  color: #606266;
}
</style>
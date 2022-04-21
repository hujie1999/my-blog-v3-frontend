<template>
  <div id="block">
    <el-pagination
      hide-on-single-page
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-size="length"
      :pager-count='5'
      layout=" prev, pager, next"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: "Pagenation",
  data() {
    return {
      handled_current_page: null,
      handled_start:null
    };
  },
  computed:{
  },
  components: {},
  props:{
      current:{
          default:1,
          type:Number
      },
      start:{
          default:0,
          type:Number
      },
      length:{
          default:4,
          type:Number
      },
      total:{
          default:4,
          type:Number
      }
      ,
      transPageParams:{
          type:Function
      }
  },
  methods: {
    handleFunc(v){
          this.handled_current_page = v
          this.handled_start = this.length*(v-1)
    },
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      // window.scrollTo(0,0)
      
      
      this.handleFunc(val)
      this.$emit('transPageParams',this.handled_current_page,this.handled_start)
    },
  },
};
</script>

<style scoped>
#block{
    padding: 20px 0px;
}
</style>
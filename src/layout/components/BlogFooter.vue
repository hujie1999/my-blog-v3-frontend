<template>
  <div id="footer">
     <div class="block">
       <p>本站已运行 {{runtime}}</p>
       <!-- <p>Email.1256215927@qq.com</p> -->
       <p>
         <a href="https://beian.miit.gov.cn/" target="_blank">
           蜀ICP备2022003545号-1
         </a>
      </p>
      <p>Copyright &copy; 2022 HJ.AllRightsReserved.</p>
     </div>
  </div>
</template>
<script>
export default {
  name:"BlogFooter",
  data() {
    return {
      // createdate:'2022-04-24',
      createdate:'1650758400000',
      nowdate:'',
      runtime:''
    }
  },
  methods: {
    initCreateDate() {
      this.nowdate = new Date().getTime()
    },
    execRunTime() {
      this.runtime = this.$moment(this.nowdate-this.createdate).format('D天H时m分s秒')
    }
  },
  created() {
    this.initCreateDate()
  },
  mounted() {
    const timmer = setInterval(()=>{
      this.nowdate+=1000
      this.execRunTime()
    },1000)
    this.$once('beforeDestroy',()=>{
      clearInterval(timmer)
    })
  },
  
}
</script>
<style scoped>
#footer{
  background:#374046;
  width: 100%;
  height: 80px;
  border-radius: 4px 4px 0 0 ;
  font-size: 14px;
  line-height: 8px;
  /* color:#efebe9; */
  text-align: center;

  display: flex;
  justify-content: center;
  align-items: center;
}
.block{
  height: auto;
  width: auto;
  line-height: 18px;
}
.block p,a{
  color: rgb(170, 170, 170);
  font-size: 12px;
  letter-spacing: 1px;
  margin: 0;
  padding: 0;
}
</style>
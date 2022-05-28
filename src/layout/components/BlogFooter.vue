<template>
  <div id="footer">
     <div class="block">
       <p>{{runtime}}</p>
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
      runtime:''
    }
  },
  methods: {
    execRunTime() {
      let seconds = 1*1000
      let minutes = seconds*60
      let hours = minutes*60
      let days = hours*24
      let years = days*365

      let today = new Date().getTime()
      let diff = today-this.createdate
      let diffYears = Math.floor(diff/years);
      let diffDays = Math.floor((diff/days)+diffYears*365);
      let diffHours = Math.floor((diff-(diffYears*365+diffDays)*days)/hours);
      let diffMinutes = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours)/minutes);
      let diffSeconds = Math.floor((diff-(diffYears*365+diffDays)*days-diffHours*hours-diffMinutes*minutes)/seconds);
      this.runtime = `本站已运行 ${diffDays}天${diffHours}时${diffMinutes}分${diffSeconds}秒`
    }
  },
  created() {
    this.execRunTime()
  },
  mounted() {
    const timmer = setInterval(()=>{
      this.nowdate+=1000
      this.execRunTime()
    },1000)
    //运行时间计算不销毁
    // this.$once('beforeDestroy',()=>{
    //   clearInterval(timmer)
    // })
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
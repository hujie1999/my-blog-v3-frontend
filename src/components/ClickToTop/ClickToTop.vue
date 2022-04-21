<template>
  <div id="back-top">
    <div
    class="back-top-block"
    @click="backTop"
    >
      UP
    </div>
  </div>
   
</template>

<script>
export default {
    name:'ClickToTop',
    data(){
        return {

        }
    },
    methods:{
      backTop(){
        window.scrollTo({
          top:0,
          left:0,
          behavior: 'smooth'
        })
      }
    }

}
</script>

<style>
#back-top{
  height: auto;
  width: auto;
  position: fixed;
  bottom: 100px;
  right: 4%;
  z-index: 2001;
}
.back-top-block{
  height: 40px;
  width: 40px;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 0 10px rgb(0 0 0 / 10%);
  text-align: center;
  line-height: 40px;
  color: #2c3e50;
  cursor: pointer;
}

.back-top-block:hover{
  box-shadow: 0 0 10px rgb(0 0 0 / 20%) !important;
  background: rgb(192, 192, 192);
}

</style>
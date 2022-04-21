<template>
  <div id="skeleton-block">
      <!-- 骨架屏 -->
        <div class="title"></div>
        <div class="info"></div>
        <div class="content"></div>
        <div class="bottom"></div>
  </div>
</template>

<script>
export default {
    name:'Skeleton',
    data(){
        return{

        }
    },

}
</script>

<style>
#skeleton-block{
    margin: 0;
    padding: 0;
    height: 460px;
    width: auto;
    background: #fff;
    overflow: hidden;
    border:1px solid black;
    border-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    flex-direction: column;
}
#skeleton-block div{
    border-radius: 10px;
    background: #f2f2f2;
}
#skeleton-block .title{
    width: 96%;
    height: 50px;
}
#skeleton-block .info{
    width: 96%;
    height: 35px;

}
#skeleton-block .content{
    width: 96%;
    height: 240px;

}
#skeleton-block .bottom{
    width: 96%;
    height: 60px;


}
</style>
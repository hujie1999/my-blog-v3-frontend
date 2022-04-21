<template>
  <div id="zone-main">
      <!-- <h2>ZoneMain</h2> -->
        <keep-alive>
            <router-view v-if='$route.meta.keepAlive'></router-view>
        </keep-alive>

        <router-view v-if='!$route.meta.keepAlive'></router-view>
  </div>
</template>

<script>
export default {
    name:'ZoneMain'
}
</script>

<style scoped>
#zone-main{
    /* border: 1px solid rgb(233, 230, 230); */
    /* overflow: auto; */
    word-wrap: break-word;
    height: 100%;
    width: 100%;
    background: #fff;
    overflow: hidden;
}
</style>
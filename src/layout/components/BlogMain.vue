<template>
  <div id="content-area" >
    <keep-alive>
      <router-view v-if='$route.meta.keepAlive'></router-view>
    </keep-alive>

    <router-view v-if='!$route.meta.keepAlive'></router-view>

  </div>
</template>

<script>


export default {
  name: "BlogMain",
  components: {
  },
  data() {
    return {
      
    };
  },
  computed: {

  },
  methods: {
    
  },
  mounted() {
    
  },
};
</script>
<style>
#content-area {
  /* position: relative; */
  width: auto;
  min-height: 75vh;
  height: auto;
  
}


</style>
<template>
  <div id="user-index">
      <h2>UserIndex</h2>
      <h3>login：{{userinfo.islogin}}</h3>
      <h3>token：{{userinfo.token}}</h3>
      <h3>uniqueid：{{userinfo.uniqueid}}</h3>
      <h3>nickname：{{userinfo.nickname}}</h3>
      <h3>account：{{userinfo.account}}</h3>
      <h3>role：{{userinfo.role}}</h3>
      <h3>avatar：{{userinfo.avatar}}</h3>
      <h3>unread:{{unread}}</h3>
  </div>
</template>

<script>
export default {
    name:'UserIndex',
    data(){
        return{
          userinfo:this.$store.getters.userinfo,
          unread:this.$store.getters.unreadnoticount
        }
    },
    methods:{

    }

}
</script>

<style scoped>
#user-index{
    overflow: auto;
    height:calc(100vh - 120px);
    /* height: 100%;
    width: auto; */
    /* height:100%; */
    width: 100%;
}
</style>
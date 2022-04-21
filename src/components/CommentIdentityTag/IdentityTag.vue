<template>
  <div id="identity-tag">
    <!-- 身份标签 -->
    <!-- <h4>{{comments}}</h4> -->
  </div>
</template>

<script>
// import { blogcommentsAPI } from '../../http/api'
export default {
    name:'identityTag',
    data(){
        return{
          // start:0,
          // length:5,
          // Blog_Id:10015,
          // comments:[]
        }
    },
    created(){
      // blogcommentsAPI({
      //   Blog_Id: this.Blog_Id,
      //   Start: this.start,
      //   Length: this.length,
      // })
      //   .then((res) => {
      //     // console.log(Object.values(res.data))
      //     this.comments = Object.values(res.data);
      //   })
      //   .catch((err) => {
      //     console.log(err)
      // });
    }
};
</script>

<style>
/* identity-tag 身份标签 */
#identity-tag{
  height: 900px;
  width: 600px;
  background: #fff;
}


</style>
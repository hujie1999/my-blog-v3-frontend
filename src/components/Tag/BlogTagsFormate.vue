<template>
    <div id="tags-item">
        <el-tag
        class="tag"
            :type="color[Math.floor(Math.random()*4)]"
            effect="light"
            >
            {{tagsinformation}}
        </el-tag>
    </div>
</template>
<script>
export default {
    name:'BlogTagsFormate',
    data () {
        return {
            color:['success','primary','warning','danger'],
        }
    },
    props : {
        tagsinformation:{
            type : String
        }
    },
    methods: {

    },
    created () {
     
    }
}
</script>
<style>
#tags-item{
    margin-right: 10px;
    width: 100%;
    height: auto;
    flex: 0;
   

}
.tag{
    cursor: pointer;
}
</style>
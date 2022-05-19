<template>
  <div id="append-textarea">
      <!-- 这个回复组件，是append在一级或者二级评论下的 -->
      <div>
      <el-input
            type="textarea"
            :placeholder="dealReplyedPersonInfo"
            v-model="reply"
            :autosize="{ minRows: 3}"
            maxlength="1000"
            show-word-limit
          >
        </el-input>
      <div
      class="btn-format-control"
      >
        <el-button
        type="primary"
        size="mini"
        @click="submitReply"
        >
        提交回复
        </el-button>
        <el-button
        type="info"
        size="mini"
        @click="cancelShow"
        >
        取消
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
    name:'AppendReplyTextArea',
    data() {
        return {
            reply:'',
        }
    },
    computed:{
        dealReplyedPersonInfo(){
            return '回复：'+this.replyedpersoninfo
        }
    },
    props:{
        transReply:{
            type:Function
        },
        // 被回复人的信息
        replyedpersoninfo:'',
        transCancel:{
            type:Function
        }
    },
    methods:{
        submitReply(){
            this.$emit('transReply',this.reply)
        },
        cancelShow(){
            this.$emit('transCancel')
        },
    }
}
</script>

<style scoped>
#append-textarea{
    height: auto;
    width: 100%;
    padding: 10px;
    margin-top: 10px;
    box-sizing: border-box;
    border-top: 0.5px solid #e7ebf1;
}
.btn-format-control{
    display: flex;
    padding-top: 10px;
}
</style>
<template>
  <div id="reply-text-area">
      <!-- 写回复时的textarea -->
      <div class="write-reply-textarea">
      <div>
        <el-input
            type="textarea"
            :placeholder="dealReplyedPersonInfo"
            v-model="reply"
            :autosize="{ minRows: 3, maxRows: 6}"
            maxlength="300"
            show-word-limit
          >
        </el-input>
      </div>
      <div
      class="btn-format-control"
      >
        <el-button
        type="primary"
        size="medium"
        @click="submitReply"
        >
        提交回复
        </el-button>
        <el-button
        type="warning"
        size="medium"
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
    name:'ReplyTextArea',
    data(){
        return{
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

<style>
#reply-text-area{
    height: auto;
    width: auto;
    display: flex;
    justify-content: center;
}
#reply-text-area .write-reply-textarea{
    padding: 10px;
  /* min-height: 300px; */
  height: auto;
  width: 450px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  z-index: 2001;
  position: fixed;
  bottom: 15%;
}
.btn-format-control{
    /* display: flex; */
    margin: 10px 0 0 0;
}
@media screen and (min-width: 0px) and (max-width: 768px) {
    #reply-text-area .write-reply-textarea{
        width: 95%;
    }
}
</style>
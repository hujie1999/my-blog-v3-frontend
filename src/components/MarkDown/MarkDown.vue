<template>
  <div id="markdown">
      <!-- 展示 -->
      <mavon-editor
        ref="md"
        :name='name'
        :value="value"
        defaultOpen="preview"
        :ishljs='true'
        codeStyle='stackoverflow-dark'
        style="z-index: 2000; min-height: 100px;"
        :boxShadow="false"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      ></mavon-editor>
  </div>
</template>

<script>
export default {
  name: "MarkDown",
  components: {},
  props: {
    value: {
      // 预览传来的prop
      type: String,
      default: "",
    },
    name:''
  },
  data() {
    return { 
      markdownOption: {
        
      },
    };
  },
  methods: {
  },
  mounted () {
  },
  updated(){
  },

  created(){
  },
  watch:{
  }
};
</script>

<style>
.v-note-wrapper{
  border: none !important;
  box-shadow: none !important;
}
.v-note-wrapper .v-note-panel .v-note-show .v-show-content, 
.v-note-wrapper .v-note-panel .v-note-show .v-show-content-html {
  padding: 5px 10px !important;
}
.markdown-body img{
  height: auto;
  width: auto;
  max-width: 100%;
}
.scroll-style{
  background: #fff !important;
}
/* 隐藏markdown编辑器的滚动条样式 */
.markdown-body::-webkit-scrollbar{
  display: none;
}
.markdown-body {
  font-family: Menlo, "Ubuntu Mono", Consolas, "Courier New", 
    "Microsoft Yahei", "Hiragino Sans GB", "WenQuanYi Micro Hei", sans-serif !important;
  /* font-size: 14px !important; */
}
.markdown-body pre code {
  font-family: SFMono-Regular,Consolas,"Liberation Mono",Menlo,Courier,monospace !important;
  font-size: 15px;
}
.markdown-body .highlight pre, .markdown-body pre {
  padding: 8px 4px !important;
  display: inline-block !important;
  width:100% !important;
  background: #1c1b1b !important;
  color: #fff;
  border-radius: 6px !important;
}
</style>
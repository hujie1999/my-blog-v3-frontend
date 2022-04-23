<template>
  <div id="markdown">
      <!-- 展示 -->
      <mavon-editor
        ref="md"
        :name='name'
        :value="value"
        defaultOpen="preview"
        
        :ishljs='true'
        codeStyle='paraiso-dark'
        style="z-index: 2000; min-height: 100px;"
        :boxShadow="false"
        :editable="false"
        :subfield="false"
        :toolbarsFlag="false"
      ></mavon-editor>
  </div>
</template>

<script>
// import 'mavon-editor/dist/markdown/github-markdown.min.css'

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
  padding: 8px 5px 15px 5px !important;
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
    font-size: 14px !important;
}
.markdown-body code {
    font-family: SFMono-Regular,Consolas,"Liberation Mono",Menlo,Courier,monospace;
    font-size: 14px;
}
/* .markdown-body .highlight pre, .markdown-body pre {
    background-color: mintcream !important;

} */
.highlight pre, .markdown-body pre {
    padding: 2px !important;
    background: #2f1e2e !important;
}
</style>
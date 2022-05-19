<template>
  <div id="blog-class-tab">
    <ul>
      <li
        v-for="(item, index) in classlist"
        :key="index"
        :class="active_tab == classlist[index] ? 'tab-active' : ''"
        @click="tabClick(item)"
      >
        {{ item }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BlogClassTab",
  data() {
    return {
      active_tab: null,
    };
  },
  props: {
    classlist: {
      type: Array,
    },
    activeclass: {
      type: String,
      default: "",
    },
    transTabClick: {
      type: Function,
    },
  },
  methods: {
    tabClick(n) {
      this.active_tab = n;
      this.$emit("transTabClick", n);
    },
  },
  watch: {
    activeclass: {
      handler(newVal, oldVal) {
        this.active_tab = newVal;
      },
      immediate: true,
    },
  },
};
</script>

<style scoped>
#blog-class-tab {
  height: auto;
  width: 100%;
}
#blog-class-tab ul {
  margin: 0;
  padding: 0;
  overflow-x: scroll;
  overflow-y: hidden;
  height: 100%;
  list-style-type: none;
  display: flex;
  align-items: flex-start;
}
#blog-class-tab ul::-webkit-scrollbar {
  display: none;
}
#blog-class-tab ul li {
  flex: none;
  height: 38px;
  width: 80px;
  margin: 0px 4px 0px 0px;
  border: 1px solid #e7ebf1;
  background: #fff;
  border-radius: 5px;

  list-style: none;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
}
#blog-class-tab ul li:hover {
  font-weight: bold;
}
/* tab的 active 类 */
.tab-active {
  box-shadow: 0 0 10px rgb(0 0 0 / 10%) !important;
  /* margin-right: 0 !important; */
  padding: 0px 0px 6px 0px !important;
  background: #fafafa !important;
  font-weight: bold;
}
</style>
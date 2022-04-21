<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-12-01 20:31:08
 * @LastEditors: Linyer
 * @LastEditTime: 2021-12-01 20:37:39
-->
<template>
  <input v-model="text" @input="handleChange" />
</template>
<script>
import { defineComponent } from 'vue';
export default defineComponent({
  props: {
    value: {
      type: String,
      default: '',
    },
  },
  model: {
    prop: 'value', //绑定的值，通过父组件传递
    event: 'update', //自定义时间名
  },
  setup() {},
  data() {
    return {
      text: '',
    };
  },
  methods: {
    handleChange($event) {
      console.log('%c [  ]-34-「test」', 'font-size:13px; background:pink; color:#bf2c9f;', $event);

      this.$emit('update', this.text);
    },
  },
});
</script>

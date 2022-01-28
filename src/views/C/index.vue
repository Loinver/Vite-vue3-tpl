<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-02-23 10:27:42
 * @LastEditors: Linyer
 * @LastEditTime: 2021-11-22 14:19:43
-->
<template>
  <div>
    <p>{{ count }}</p>
    <van-button @click="handleAdd">加法</van-button>
    <van-button @click="handleSub">减法</van-button>
    <van-button :to="{ name: 'CenterIndex' }" type="primary" block>跳转去B页面</van-button>
  </div>
</template>
<script>
import { ref, defineComponent } from 'vue';

export default defineComponent({
  name: 'CIndex', // 最好必须添加name
  setup() {
    let count = ref(1);
    const handleAdd = () => {
      count.value += 1;
    };
    return {
      count,
      handleAdd,
    };
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {
    this.$toast(111);
  },
  methods: {
    handleSub() {
      this.count -= 1;
    },
  },
});
</script>

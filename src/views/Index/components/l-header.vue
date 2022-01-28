<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-05 09:50:47
 * @LastEditors: Linyer
 * @LastEditTime: 2021-09-26 17:37:35
-->
<template lang="">
  <div class="">
    {{ userInfo }}
  </div>
</template>
<script>
import { inject, defineComponent } from 'vue';
export default defineComponent({
  setup() {
    const userInfo = inject('userInfo');
    return {
      userInfo,
    };
  },
});
</script>
<style lang="scss" scoped>
.circle {
  width: 300px;
  height: 300px;
  border: 1px solid #ccc;
  border-radius: 100%;
  position: relative;
  .child {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 100%;
    background: linear-gradient(90deg, rgb(51, 204, 117), rgb(51, 151, 204));
  }
}
</style>

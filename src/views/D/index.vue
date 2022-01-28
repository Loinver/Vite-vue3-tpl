<!--
 * @Description: 详情
 * @Version:
 * @Author: Linyer
 * @Date: 2021-02-23 10:27:42
 * @LastEditors: Linyer
 * @LastEditTime: 2021-11-22 14:19:22
-->
<template>
  <div>
    <van-list v-model:loading="list.loading" :finished="list.finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="item in list.data" :key="item" :title="item" />
    </van-list>
  </div>
</template>
<script>
import { reactive, defineComponent } from 'vue';

export default defineComponent({
  name: 'DIndex', // 最好必须添加name
  setup() {
    const list = reactive({
      data: [],
      loading: false,
      finished: false,
    });

    const onLoad = () => {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        console.log('加载了');
        for (let i = 0; i < 10; i++) {
          list.data.push(list.data.length + 1);
        }

        // 加载状态结束
        list.loading = false;

        // 数据全部加载完成
        if (list.data.length >= 40) {
          list.finished = true;
        }
      }, 1000);
    };

    return {
      list,
      onLoad,
    };
  },
  data() {
    return {};
  },
  computed: {},
  mounted() {},
  methods: {},
});
</script>

<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-08-05 09:50:47
 * @LastEditors: Linyer
 * @LastEditTime: 2022-04-21 16:43:03
-->
<template lang="">
  <div>
    <van-search
      v-model="searchKey.keywords"
      show-action
      placeholder="请输入搜索关键词"
      @search="onSearch"
      @cancel="onCancel"
    />
  </div>
</template>

<script>
import { reactive, defineComponent, inject } from 'vue'
export default defineComponent({
  setup(props) {
    const userInfo = inject('userInfo')
    // console.log('[ props ]', props, userInfo);
    const searchKey = reactive({
      keywords: '',
      name: userInfo.name
    })
    const onSearch = (val) => {
      console.log(val)
    }
    const onCancel = (val) => {
      console.log(val)
    }
    return {
      searchKey,
      userInfo,
      onSearch,
      onCancel
    }
  },
  methods: {}
})
</script>
<style lang="scss" scoped></style>

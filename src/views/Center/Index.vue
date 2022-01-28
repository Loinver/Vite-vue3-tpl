<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-04-14 13:32:37
 * @LastEditors: Linyer
 * @LastEditTime: 2022-01-27 17:14:58
-->
<template>
  <van-nav-bar safe-area-inset-top title="日期选择控件" left-arrow @click-left="onClickLeft" />
  <ul safe-area-inset-top>
    <li v-for="item in datePicker" :key="item" class="item">
      <van-button type="primary" block @click="handleDatePicker(item)"
        >{{ item.type }}、{{ item.name }}</van-button
      >
    </li>
  </ul>
  <ul>
    <van-button @click="calendar.show = true">选择日期</van-button>
    <van-button @click="datePicker.show = true">选择时间</van-button>
  </ul>
  <van-calendar v-model:show="calendar.show" @confirm="onConfirm" />
  <van-datetime-picker
    v-model="currentDate"
    type="month-day"
    title="选择完整时间"
    :min-date="minDate"
    :max-date="maxDate"
    @confirm="onConfirmDate"
  />
</template>
<script>
import { defineComponent, ref } from 'vue'
export default defineComponent({
  name: 'CenterIndex', // 最好必须添加name
  setup() {
    const currentDate = ref(new Date())
    const onClickLeft = () => history.back()
    return {
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1),
      currentDate,
      onClickLeft
    }
  },
  data() {
    return {
      datePicker: [
        {
          type: 0,
          name: '年月日时分秒'
        },
        {
          type: 1,
          name: '年月日时分'
        },
        {
          type: 2,
          name: '月日时分'
        },
        {
          type: 3,
          name: '年月日'
        },
        {
          type: 4,
          name: '日时分'
        },
        {
          type: 5,
          name: '年月'
        },
        {
          type: 6,
          name: '月日'
        },
        {
          type: 7,
          name: '时分秒'
        },
        {
          type: 8,
          name: '时分'
        }
      ],
      calendar: {
        show: false,
        value: ''
      },
      datePicker1: {
        show: false,
        value: ''
      },
      date: {
        timeStamp: '2137812831231',
        list: {
          year: 2021,
          month: 9,
          day: 27,
          hour: 14,
          minute: 23,
          second: 49
        },
        timeStr: '2021/09/27 14:23:49'
      }
    }
  },
  computed: {},
  created() {},
  methods: {
    /**
     * 触发事件选择控件，返回所选值
     */
    handleDatePicker(item) {
      try {
        window.AlipayJSBridge.call(
          'aj_time_choice',
          {
            title: item.name, // 标题
            type: item.type,
            time: '' // 默认时间
          },
          (res) => {
            this.$toast(JSON.stringify(res))
            console.log(res)
          }
        )
      } catch (error) {
        console.log('[ error ]', error)
      }
    },
    /**
     * 原生通道选择图片
     */
    handlePhotoSelect() {
      window.AlipayJSBridge.call(
        'photoSelect',
        {
          sourceType: ['album', 'camera'],
          allowSelectVideo: 0, // 禁用拍视频
          count: 1
        },
        (res) => {
          console.log(res)
        }
      )
    },
    onConfirm(val) {
      console.log(val)
    },
    onConfirmDate(val) {
      console.log(val)
    }
  }
})
</script>
<style lang="scss" scoped>
.item {
  margin: 30px;
}
</style>

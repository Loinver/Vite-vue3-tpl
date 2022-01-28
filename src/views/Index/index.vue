<!--
 * @Description: 详情
 * @Version:
 * @Author: Linyer
 * @Date: 2021-02-23 10:27:42
 * @LastEditors: Linyer
 * @LastEditTime: 2022-01-27 15:03:52
-->
<template>
  <div class="container">
    <l-header class="header"></l-header>
    <l-search class="search"></l-search>
    <div class="content">
      <van-button @click="targetTo" type="primary">跳转到C页面</van-button>
      <van-button @click="handleUserInfo" type="primary">改变userInfo</van-button>
      <ul class="item" v-for="student in students" :key="student.name">
        <li>姓名：{{ student.name }}</li>
        <li v-for="score in student.score" :key="score.name">
          {{ score.subject }}：{{ score.number }}
        </li>
        <li class="dp-f">
          <span>总分：{{ student.total }}</span>
          <van-button size="small" type="primary" @click="getTotal(student)">计算总分</van-button>
        </li>
        <li class="dp-f">
          <span>平均分：{{ student.average }}</span>
          <van-button size="small" type="primary" @click="getAverage(student)"
            >计算平均分
          </van-button>
        </li>
      </ul>
      <ul class="item">
        <li class="dp-f">
          <van-button size="small" type="primary" @click="getAllTotal"
            >模拟接口请求计算总分
          </van-button>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { reactive, defineComponent, provide } from 'vue'
import LHeader from './components/l-header.vue'
import LSearch from './components/l-search.vue'
import api from 'apis/index.js'

export default defineComponent({
  name: 'IndexIndex', // 最好必须添加name
  components: { LHeader, LSearch },
  setup() {
    let userInfo = reactive({
      name: '张三1',
      sex: '男1',
      age: 121
    })
    // provide/inject传递
    provide('userInfo', userInfo)
    // 模拟接口请求
    const getUserInfo = () => {
      api.userInfo.getUserInfo().then((res) => {
        Object.keys(res).forEach((key) => {
          userInfo[key] = res[key]
        })
      })
    }
    getUserInfo()

    // 模拟数据请求
    const getList = () => {
      const list = [
        {
          name: '章三',
          score: [
            {
              subject: '语文',
              number: 88
            },
            {
              subject: '数学',
              number: 98
            },
            {
              subject: '英语',
              number: 82
            }
          ]
        },
        {
          name: '李四',
          score: [
            {
              subject: '语文',
              number: 98
            },
            {
              subject: '数学',
              number: 98
            },
            {
              subject: '英语',
              number: 80
            }
          ]
        },
        {
          name: '王武',
          score: [
            {
              subject: '语文',
              number: 92
            },
            {
              subject: '数学',
              number: 98
            },
            {
              subject: '英语',
              number: 82
            }
          ]
        },
        {
          name: '赵六',
          score: [
            {
              subject: '语文',
              number: 83
            },
            {
              subject: '数学',
              number: 98
            },
            {
              subject: '英语',
              number: 82
            }
          ]
        }
      ]
      list.forEach((item) => {
        item.total = 0
        item.average = 0
      })
      return list
    }
    // 必须将返回的数据进行响应式
    const students = reactive(getList())
    // 修改userInfo
    const handleUserInfo = () => {
      userInfo.sex = '女'
    }
    return { userInfo, students, handleUserInfo }
  },
  data() {
    return {}
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    targetTo() {
      this.$router.push({
        path: 'c.html'
      })
    },
    /**
     * 获取用户信息
     */
    async getUserInfo() {
      const res = await this.$api.userInfo.getUserInfo()
      Object.keys(res).forEach((key) => {
        this.userInfo[key] = res[key]
      })
      console.log('[ res ]', res)
    },
    /**
     * 计算总分
     * return total
     */
    getTotal(student) {
      student.total = student.score.reduce((total, subject) => {
        return total + subject.number
      }, 0)
    },
    /**
     * 计算平均分
     * return average
     */
    getAverage(student) {
      student.average = (
        student.score.reduce((total, subject) => {
          return total + subject.number
        }, 0) / student.score.length
      ).toFixed(2)
    },
    /**
     * 模拟请求计算所有人总分
     * return total
     */
    getAllTotal() {
      this.students.forEach((item) => {
        setTimeout(() => {
          this.getTotal(item)
        }, Math.random() * 1000)
      })
    }
  }
})
</script>
<style lang="scss" scoped>
.container {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #f5f5f5;
  .header {
    flex-shrink: 0;
  }
  .search {
    flex-shrink: 0;
  }
  .content {
    overflow-y: scroll;
    flex-grow: 1;
    .item {
      background-color: #fff;
      margin: 20px 30px;
      padding: 20px 30px;
      border-radius: 10px;
      > li {
        font-size: 28px;
        margin: 10px 0;
      }
    }
  }
}
</style>

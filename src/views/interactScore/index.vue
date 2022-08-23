<!--
 * @Description:
 * @Version:
 * @Author: Linyer
 * @Date: 2021-02-23 10:27:42
 * @LastEditors: Linyer
 * @LastEditTime: 2022-08-23 10:56:17
-->

<script setup>
import { ref, reactive, onMounted, getCurrentInstance, nextTick, onUnmounted } from 'vue'

import bg from './images/bg.png'
import boy from './images/boy.png'
import banana from './images/banana.png'
import present1 from './images/present1.png'
import present2 from './images/present2.png'
import present3 from './images/present3.png'
import nothing from './images/nothing.png'
import tumble from './images/boy-tumble.png'
// 获取vue3 globalProperties
const {
  ctx,
  appContext: {
    config: { globalProperties: global }
  }
} = getCurrentInstance()

const gameConfig = reactive({
  speed: 4,
  time: 0,
  isBegin: false,
  canMove: false,
  isOver: false,
  isTumble: false,
  totalScore: 0
})
let game = {}
onMounted(() => {
  const windowWidth = document.documentElement.clientWidth // 浏览器宽
  const windowHeight = document.documentElement.clientHeight // 浏览器高
  const OBSTACLE_STEP = windowHeight / 1.5 // 障碍物距离
  const maxObjWidth = Math.round(windowWidth * 0.2)
  const maxObjHeight = Math.round(windowHeight * 0.2)
  const MEN_WIDTH = 67
  const MEN_HEIGHT = 134
  const canvas = document.getElementById('canvas') // 背景的画布
  const canvasCtx = canvas.getContext('2d')
  canvas.width = windowWidth
  canvas.height = windowHeight
  const canvasBuffer = document.createElement('canvas') // 可移动的画布
  canvasBuffer.width = canvas.width
  canvasBuffer.height = canvas.height
  const canvasBufferCtx = canvasBuffer.getContext('2d')

  // 定义一个game对象
  game = {
    nothingImg: (() => {
      const image = new Image()
      image.src = nothing
      return image
    })(), // 空白图片
    objType: [
      {
        type: 0,
        score: -100,
        imgSrc: (() => {
          const image = new Image()
          image.src = banana
          return image
        })()
      }, //减分
      {
        type: 1,
        score: 100,
        imgSrc: (() => {
          const image = new Image()
          image.src = present1
          return image
        })()
      }, // 加分
      {
        type: 2,
        score: 100,
        imgSrc: (() => {
          const image = new Image()
          image.src = present2
          return image
        })()
      }, // 加分
      {
        type: 3,
        score: 100,
        imgSrc: (() => {
          const image = new Image()
          image.src = present3
          return image
        })()
      } // 加分
    ], // 掉落的物品源数组
    maxNumber: 4, //最多4种加减分元素
    downObj: [], // 生成的掉落的物品对象数组
    bgObj: {
      width: windowWidth,
      height: windowHeight * 2,
      left: 0,
      top: -windowHeight,
      imgSrc: (() => {
        const image = new Image()
        image.src = bg
        return image
      })()
    }, // 背景配置
    menObj: {
      width: MEN_WIDTH,
      height: MEN_HEIGHT,
      left: (windowWidth - MEN_WIDTH) / 2,
      top: canvas.height - MEN_HEIGHT,
      imgSrc: (() => {
        const image = new Image()
        image.src = boy
        return image
      })(),
      defaultSrc: (() => {
        const image = new Image()
        image.src = boy
        return image
      })(),
      tumbleSrc: (() => {
        const image = new Image()
        image.src = tumble
        return image
      })()
    }, // 小人配置
    // 初始化
    initState: function () {
      // 渲染背景图
      canvasCtx.drawImage(
        this.bgObj.imgSrc,
        this.bgObj.left,
        this.bgObj.top,
        this.bgObj.width,
        this.bgObj.height
      )
      // 生成掉落的物品对象配置参数
      for (let i = 0; i < this.maxNumber; i++) {
        let type = this.objType[Math.floor(Math.random() * game.objType.length)]
        this.downObj.push({
          left: parseInt(Math.random() * (windowWidth - maxObjWidth)), // x轴随机位置
          top: i * OBSTACLE_STEP - 1000, // 顶部位置，先不在视图区域
          type: type.type,
          imgSrc: type.imgSrc,
          width: maxObjWidth,
          height: maxObjHeight,
          isImpact: false,
          score: type.score
        })
      }
    },
    // 展示信息
    showInfo: function (type) {
      if (type === 1) {
        global.$toast('加分')
      } else {
        global.$toast('减分')
      }
    },
    // 游戏开始  绘制开始
    drawStart: function () {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasBufferCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasBufferCtx.drawImage(
        this.bgObj.imgSrc,
        this.bgObj.left,
        this.bgObj.top,
        this.bgObj.width,
        this.bgObj.height
      )
      for (let i = 0; i < this.downObj.length; i++) {
        canvasBufferCtx.drawImage(
          this.downObj[i].imgSrc,
          this.downObj[i].left,
          this.downObj[i].top,
          maxObjWidth,
          maxObjWidth
        )
      }
      canvasBufferCtx.drawImage(
        this.menObj.imgSrc,
        this.menObj.left,
        this.menObj.top,
        this.menObj.width,
        this.menObj.height
      )
      canvasCtx.drawImage(canvasBuffer, 0, 0)
      game.update()
    },
    // 绘制小人
    drawMenObj: function () {
      canvasCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasBufferCtx.clearRect(0, 0, canvas.width, canvas.height)
      canvasBufferCtx.drawImage(
        this.menObj.imgSrc,
        this.menObj.left,
        this.menObj.top,
        this.menObj.width,
        this.menObj.height
      )
      canvasCtx.drawImage(canvasBuffer, 0, 0)
    },
    // 更新位置
    update: function () {
      this.bgObj.top += gameConfig.speed
      if (this.bgObj.top >= 0) {
        this.bgObj.top = -windowHeight
      }
      for (let i = 0; i < this.downObj.length; i++) {
        let $this = game.downObj[i]
        $this.top += gameConfig.speed
        if (this.impact($this, this.menObj) && !$this.isImpact) {
          if ($this.type === 0) {
            // 踩到香蕉皮,摔倒了
            this.menObj.imgSrc = this.menObj.tumbleSrc
            this.menObj.left = this.menObj.left - 10
            this.menObj.top = canvas.height - MEN_HEIGHT * 1.3
            this.menObj.width = 153
            this.menObj.height = 153
            game.showInfo(2, 1000)
            this.timer1()
            this.timer2(this)
          } else {
            this.showInfo(1, 400)
          }
          gameConfig.totalScore += $this.score
          gameConfig.totalScore = gameConfig.totalScore < 0 ? 0 : gameConfig.totalScore
          $this.isImpact = true
          $this.imgSrc = this.nothingImg
        }
        if ($this.top > windowHeight) {
          this.setProperty($this)
        }
      }
    },
    setProperty: function (obj) {
      let type = this.objType[Math.floor(Math.random() * game.objType.length)]
      obj.left = parseInt(Math.random() * (windowWidth - maxObjWidth))
      obj.top = -maxObjWidth
      obj.type = type.type
      obj.score = type.score
      obj.imgSrc = type.imgSrc
      obj.isImpact = false
    },
    // 比较掉落物品是否与小人碰撞
    impact: function (obj, menObj) {
      const o = {
        x: obj.left,
        y: obj.top,
        w: obj.width,
        h: obj.height
      }
      const d = {
        x: menObj.left,
        y: menObj.top,
        w: menObj.width,
        h: menObj.height
      }
      let px
      let py
      px = o.x <= d.x ? d.x : o.x
      py = o.y <= d.y ? d.y : o.y
      return (
        px >= o.x &&
        px <= o.x + o.w &&
        py >= o.y &&
        py <= o.y + o.h &&
        px >= d.x &&
        px <= d.x + d.w &&
        py >= d.y &&
        py <= d.y + d.h
      )
    },
    // 开始游戏
    anim: function () {
      // game.drawMenObj()
      if (gameConfig.isBegin && gameConfig.canMove && !gameConfig.isTumble && !gameConfig.isOver) {
        // 游戏已开始, 可以移动, 未摔倒, 未结束
        game.drawStart()
      }
      window.requestAnimationFrame(game.anim)
    },
    // 小人恢复原状，重置参数
    timer2: function (that) {
      setTimeout(() => {
        that.menObj.imgSrc = that.menObj.defaultSrc
        that.menObj.width = 67
        that.menObj.height = 134
        that.menObj.top = canvas.height - MEN_HEIGHT
        that.menObj.left += 10
        gameConfig.isTumble = false
      }, 1000)
    },
    // 小人与香蕉皮碰撞了
    timer1: function () {
      setTimeout(() => {
        gameConfig.isTumble = true
      }, 50)
    }
  }

  nextTick(() => {
    game.anim()
    game.initState()
    document.body.addEventListener('touchmove', function (e) {
      e.preventDefault()
    })

    window.addEventListener('touchstart', function (ev) {
      const oEvent = ev,
        _left = game.menObj.left,
        distanceX = oEvent.changedTouches[0].clientX - _left,
        lastY = oEvent.changedTouches[0].clientY
      window.addEventListener('touchmove', function (e) {
        if (gameConfig.isBegin && gameConfig.canMove) {
          game.menObj.left = Math.min(
            windowWidth - game.menObj.width,
            Math.max(0, e.changedTouches[0].clientX - distanceX)
          )
        }
        if (e.changedTouches[0].clientY !== lastY) {
          e.preventDefault()
        }
      })
      window.addEventListener('touchend', function (e) {
        window.removeEventListener('touchmove', function () {})
        window.removeEventListener('touchend', function () {})
      })
    })
  })
  console.log(
    '%c [  ]-37-「index」',
    'font-size:13px; background:pink; color:#bf2c9f;',
    game,
    gameStart
  )
}) // 点击触发游戏开始
const gameStart = () => {
  console.log(
    '%c [  ]-312-「index」',
    'font-size:13px; background:pink; color:#bf2c9f;',
    'gameStart'
  )
  gameConfig.isBegin = true
  gameConfig.canMove = true
}
onUnmounted(() => {
  game = null
})
</script>
<template>
  <div class="game">
    <van-button
      class="btn"
      v-if="!gameConfig.isBegin"
      size="small"
      type="primary"
      @click="gameStart"
      >开始游戏
    </van-button>
    <div class="game__info">
      <div class="time">{{ gameConfig.time }}s</div>
      <div class="score">{{ gameConfig.totalScore }}元</div>
    </div>
    <canvas id="canvas"></canvas>
  </div>
</template>
<style lang="scss" scoped>
.game {
  font-size: 24px;
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  &__info {
    position: fixed;
    top: 0;
    color: #fff;
    width: 100%;
    padding-top: 3%;
    box-sizing: border-box;
    z-index: 9;
    .time,
    .score {
      line-height: 72px;
      font-size: 40px;
      text-indent: 90px;
      color: #571e05;
      background: url(./images/time.png) center no-repeat;
      background-size: contain;
    }
    .time {
      width: 196px;
      height: 74px;
      float: left;
    }
    .score {
      width: 260px;
      height: 74px;
      float: right;
      background-image: url(./images/score.png);
    }
  }
  &__mask {
    width: 80%;
    color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    &::before {
      content: '';
      display: block;
      width: 270px;
      height: 270px;
      margin: 0 auto -70px auto;
      position: relative;
      z-index: 9;
      background: url(./images/boy.png) center no-repeat;
      background-size: contain;
    }
    &-container {
      color: #fff;
      font-size: 32px;
      padding: 60px 30px 0;
      line-height: 45px;
      background: #ff5745;
      border: 2px solid #ffaf2b;
      border-radius: 20px;
    }
  }
  // &::before {
  //   content: '';
  //   width: 100%;
  //   height: 55.89%;
  //   position: absolute;
  //   top: 0;
  //   left: 0;
  //   z-index: 3;
  //   background: url(./images/bg-top.png) center no-repeat;
  //   background-size: 100% 100%;
  // }

  // &::after {
  //   content: '';
  //   width: 100%;
  //   height: 70.7%;
  //   position: absolute;
  //   top: 29.3%;
  //   left: 0;
  //   z-index: 1;
  //   background: url(./images/bg-bottom.jpg) center no-repeat;
  //   background-size: 100% 100%;
  // }
  .btn {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 5;
  }
  #canvas {
    position: relative;
    z-index: 2;
  }
}
</style>

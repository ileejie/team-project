<template>
  <div class="echart-content" :style="{ width: width, height: height }">
    <div ref="myEchart" :id="id" :style="{ width: width, height: height }"></div>
  </div>
</template>

<script>
export default {
  name: 'EchartCard',
  props: {
    id: {
      type: String,
      default: 'myId'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '100%'
    },
    data: { // 数据
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      chart: null
    }
  },
  watch: {
    data: {
      deep: true,
      handler(val) {
        const that = this
        this.$nextTick(() => {
          that.chart.setOption(val, true)
        })
      },
    },
  },
  mounted() {
    window.addEventListener('message', this.resizeEchart, false);
    // 初始化echarts
    this.initEchart()
  },
  methods: {
    initEchart() {
      this.$nextTick(() => {
        this.chart = this.$echarts.init(this.$refs.myEchart, null, { renderer: 'canvas', devicePixelRatio: 3 })
        // 把配置和数据放这里
        this.chart.setOption(this.data, true)
        this.chart.on('click', params => {
          // 这个params可以获取你要的图中的当前点击的项的参数
          this.$emit('callback', params)
        })
      })
    },
    resizeEchart(e) {
      this.chart.resize()
    }
  }
}
</script>

<style lang='scss' scoped>
.echart-content,
.empty-wrap {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
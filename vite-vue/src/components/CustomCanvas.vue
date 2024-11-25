<!--
  *@description Vue3 Files Modules
  *@fileName Canvas.vue
  *@author leejie
  *@date 2024/03/26 11:20:24
!-->
<template>
  <canvas id="canvas" width="800" height="600" @mousedown="handleMouseDown" @mouseup="handleMouseUp" @mousemove="handleMouseMove" :style="`cursor:${cursor}`" />
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
export default {
  name: 'CustomCanvas',
  setup() {
    const data = reactive({
      cursor: 'crosshair',
      ctx: null,
      clickDownFlag: false, // 鼠标按下状态
      clickInRect: false, // 当前点击是否在框内
      startPoints: {},
      rectPoints: {},
      moveRect: {},
      clickDownPoint: { x: 0, y: 0 }, // 记录鼠标摁下时的坐标位置
      moveDirection: 'leftTop' // 鼠标绘制图形时，起始点作为图形的哪个角
    });
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount');
      // width: 475px;
      // top: 467px;
      // position: absolute;
      // left: 1110px;
    });
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted');
      const canvas = document.getElementById('canvas');
      data.ctx = canvas.getContext('2d');
      data.ctx.lineWidth = 2;
    });
    const drawRectActive = (rectData) => {
      data.ctx.clearRect(0, 0, 800, 600);
      data.ctx.beginPath();
      data.ctx.setLineDash([4, 4]);
      data.ctx.fillStyle = 'rgba(13, 142, 255, 0.1)';
      data.ctx.strokeStyle = '#0D8EFF';
      data.ctx.rect(rectData.x, rectData.y, rectData.width, rectData.height);
      data.ctx.stroke();
      data.ctx.fill();
      data.ctx.closePath();
    };
    const drawRect = (rectData) => {
      data.ctx.clearRect(0, 0, 800, 600);
      data.ctx.beginPath();
      data.ctx.setLineDash([0, 0]);
      data.ctx.fillStyle = 'transparent';
      data.ctx.strokeStyle = '#FF0000';
      data.ctx.rect(rectData.x, rectData.y, rectData.width, rectData.height);
      data.ctx.stroke();
      data.ctx.fill();
      data.ctx.closePath();
    };
    // 鼠标经过画布根据位置改变鼠标形状
    const changeCursor = (x, y) => {
      // 画布上没有矩形框
      if (!data.rectPoints.x) return 'crosshair';
      // 鼠标在矩形框内移动
      if (x > data.rectPoints.x && x < data.rectPoints.x + data.rectPoints.width && y > data.rectPoints.y && y < data.rectPoints.y + data.rectPoints.height) {
        return 'move';
      }
      // 鼠标移动到矩形框右下角上
      if (Math.abs(x - data.rectPoints.x - data.rectPoints.width) <= 3 && Math.abs(y - data.rectPoints.y - data.rectPoints.height) <= 3) {
        return 'se-resize';
      }
      return 'crosshair';
    };
    // 鼠标按下事件
    const handleMouseDown = (e) => {
      // 记录鼠标按下状态
      data.clickDownFlag = true;
      data.clickInRect = changeCursor(e.offsetX, e.offsetY)
      // 鼠标位于绘制区域外
      if (data.clickInRect === 'crosshair') {
        data.startPoints = {
          x: e.offsetX,
          y: e.offsetY
        }
      } else {
        data.clickDownPoint = {
          x: e.offsetX,
          y: e.offsetY
        }
        data.startPoints = {
          x: data.rectPoints.x,
          y: data.rectPoints.y
        }
        drawRectActive(data.rectPoints)
        data.moveRect = data.rectPoints
      }
    };
    const handleMouseMove = (e) => {
      if (!data.clickDownFlag) {
        data.cursor = changeCursor(e.offsetX, e.offsetY);
      } else {
        let rectInfo = {}
        // 绘制新图形
        if (data.clickInRect === 'crosshair') {
          rectInfo = {
            x: data.startPoints.x,
            y: data.startPoints.y,
            width: e.offsetX - data.startPoints.x,
            height: e.offsetY - data.startPoints.y
          }
          drawRect(rectInfo);
        } else {
          // 已绘制图形平移
          if (data.clickInRect === 'move') {
            rectInfo = {
              x: e.offsetX - (data.clickDownPoint.x - data.rectPoints.x),
              y: e.offsetY - (data.clickDownPoint.y - data.rectPoints.y),
              width: data.rectPoints.width,
              height: data.rectPoints.height
            }
          } else {
            // 已绘制图形拖拽
            rectInfo = {
              x: data.startPoints.x,
              y: data.startPoints.y,
              width: e.offsetX - data.rectPoints.x,
              height: e.offsetY - data.rectPoints.y
            }
          }
          data.moveRect = rectInfo
          drawRectActive(rectInfo);
        }
      }
    };
    const handleMouseUp = (e) => {
      data.clickDownFlag = false;
      if (data.clickInRect === 'crosshair') {
        data.rectPoints = {
          x: data.startPoints.x,
          y: data.startPoints.y,
          width: e.offsetX - data.startPoints.x,
          height: e.offsetY - data.startPoints.y
        }
      } else {
        data.rectPoints = data.moveRect
      }
      data.startPoints = {}
    };
    // 判断当前鼠标的坐标是否在所选的矩形区域内
    const pointInRact = (x, y) => {
      // 左上角
      if (x === points[0].x && y === points[0].y) {
        return 'nw-resize';
      }
      // 右上角
      if (x === points[1].x && y === points[1].y) {
        return 'ne-resize';
      }
      // 右下角
      if (x === points[2].x && y === points[2].y) {
        return 'se-resize';
      }
      // 左下角
      if (x === points[3].x && y === points[3].y) {
        return 'sw-resize';
      }
      // 上
      if (x > points[0].x && x < points[1].x && y === points[0].y) {
        return 'n-resize';
      }
      // 右
      if (x === points[1].x && y > points[1].y && y < points[2].y) {
        return 'e-resize';
      }
      // 下
      if (x > points[3].x && x < points[2].x && y === points[2].y) {
        return 's-resize';
      }
      // 左
      if (x === points[0].x && y > points[0].y && y < points[3].y) {
        return 'w-resize';
      }
      // 在矩形区域内
      if (x > points[0].x && x < points[2].x && y > points[0].y && y < points[2].y) {
        return 'move';
      }
      return false;
    };
    return {
      ...toRefs(data),
      handleMouseDown,
      handleMouseUp,
      handleMouseMove,
      pointInRact,
      drawRectActive,
      drawRect,
      changeCursor
    };
  }
};
</script>

<style scoped lang='scss'>
#canvas {
  background: #eee;
}
</style>

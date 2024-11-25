<!--
  *@description Vue3 Files Modules
  *@fileName CountDown.vue
  *@author leejie
  *@date 2024/06/19 10:42:07
!-->
<template>
  <canvas id="count-down-canvas" width="800" height="600"></canvas>
</template>

<script>
import { reactive, toRefs, onBeforeMount, onMounted } from 'vue';
export default {
  name: 'CountDown',
  setup() {
    const data = reactive({
      ctx: null
    });
    onBeforeMount(() => {
      console.log('2.组件挂载页面之前执行----onBeforeMount');
    });
    onMounted(() => {
      console.log('3.-组件挂载到页面之后执行-------onMounted');
      const canvas = document.getElementById('count-down-canvas');
      data.ctx = canvas.getContext('2d');
      data.ctx.lineWidth = 10;
      data.ctx.lineColor = '#FF0000';
      data.ctx.clearRect(0, 0, 800, 600);
      data.ctx.beginPath();
      data.ctx.moveTo(50, 50);
      data.ctx.lineTo(50, 150);
      data.ctx.stroke();
      data.ctx.closePath();
    });
    return {
      ...toRefs(data)
    };
  }
};
</script>

<style scoped lang='scss'>

</style>

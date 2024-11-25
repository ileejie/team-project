<template>
  <div class="operate-view" :style="{ bottom: `${props.bottom}px`, right: `${props.right}px` }" @click="rotateOperate()">
    <div class="fixed-item" :class="{ 'rotate-view': isRotate }">
      <el-icon :size="30" color="#409EFF">
        <MoreFilled />
      </el-icon>
    </div>
    <div class="operate-item" title="返回顶部" :class="{ 'top-move': isRotate }">
      <el-icon :size="20">
        <Top />
      </el-icon>
    </div>
    <div class="operate-item" title="切换主题" :class="{ 'left-top-move': isRotate }">
      <el-icon :size="20">
        <Tools />
      </el-icon>
    </div>
    <div class="operate-item" title="菜单" :class="{ 'left-move': isRotate }">
      <el-icon :size="20">
        <House />
      </el-icon>
    </div>
  </div>
</template>

<script setup>
import {ref, reactive, onMounted} from 'vue';
import {MoreFilled, Top, Tools, House} from "@element-plus/icons";

// props
const props = defineProps({
  bottom: { type: Number, default: 20 },
  right: { type: Number, default: 20 }
})

// emit
const emit = defineEmits(['update:bottom'])
emit('update:bottom');

const data = reactive({});
let isRotate = ref(false);
onMounted(() => {
});
const rotateOperate = () => {
  isRotate.value = !isRotate.value;
}
</script>

<style scoped lang="scss">
.operate-view {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  position: fixed;
  //bottom: 20px;
  //right: 20px;
  z-index: 9;
  background: #fff;
  box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .2);
  .fixed-item {
    position: relative;
    width: 100%;
    height: 100%;
    background: #fff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all linear 0.2s;
    transform: rotate(0deg);
    z-index: 2;
  }
  .operate-item {
    position: absolute;
    top: 5px;
    left: 5px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: #fff;
    box-shadow: 0 2px 4px 1px rgba(0, 0, 0, .2);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all linear 0.2s;
    transform: translate(0, 0);
    z-index: 1;
  }
  .rotate-view {
    transform: rotate(270deg);
  }
  .top-move {
    transform: translate(0, -80px);
  }
  .left-move {
    transform: translate(-80px, 0);
  }
  .left-top-move {
    transform: translate(-56.5px, -56.5px);
  }
}
</style>

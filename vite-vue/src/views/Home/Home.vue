<template>
  <div class="content-container pagination-container">
    <div class="charts-view">
      <div class="echarts-wrap">
        <div class="wrap-head">
          <span>任务统计</span>
          <el-select v-model="taskType" size="small" placeholder="请选择" @change="handleTask">
            <el-option
              v-for="item in echartType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="echarts-card">
          <echart-card :data="taskOptions"></echart-card>
        </div>
      </div>
      <div class="echarts-wrap">
        <div class="wrap-head">
          <span>费用统计</span>
          <el-select v-model="feeType" size="small" placeholder="请选择" @change="handleFee">
            <el-option
              v-for="item in echartType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="echarts-card">
          <echart-card :data="feeOptions"></echart-card>
        </div>
      </div>
      <div class="echarts-wrap">
        <div class="wrap-head">
          <span>报告统计</span>
          <el-select v-model="reportType" size="small" placeholder="请选择" @change="handleReport">
            <el-option
              v-for="item in echartType"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </div>
        <div class="echarts-card">
          <echart-card :data="reportOptions"></echart-card>
        </div>
      </div>
    </div>
    <div class="message-view">
      <div class="message-title">消息通知</div>
      <div class="message-list">
        <div class="message-item" v-for="item in 10" :key="item">
          <el-tag size="medium">账号申请</el-tag>
          <span class="message-con">[User]的账号申请通知</span>
          <span class="message-date">6-30</span>
        </div>
      </div>
    </div>
    <el-button @click="handleRegister">注册</el-button>
    <!-- <CustomCanvas></CustomCanvas>
    <CountDown></CountDown>
    <el-upload
      class="upload-demo"
      action=""
      :show-file-list="false"
      :auto-upload="false"
      :on-change="handleChange"
      :limit="1">
      <el-button size="small" type="primary">点击上传</el-button>
    </el-upload>
    <el-button @click="exportData">导出数据</el-button> -->
    <!-- <el-form ref="queryForm" :model="form" :inline="true" label-width="60px">
      <el-form-item label="姓名" prop="name">
        <el-input size="small" v-model="form.name" placeholder="输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="年龄" prop="age">
        <el-input size="small" v-model="form.age" placeholder="输入年龄"></el-input>
      </el-form-item>
      <el-form-item label="关键字" prop="query">
        <el-input size="small" v-model="form.query" placeholder="输入关键字"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select size="small" v-model="form.status" placeholder="选择状态">
          <el-option v-for="item in statusArr" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" icon="Search" @click="searchQuery">查询</el-button>
        <el-button size="small" icon="RefreshRight" @click="resetForm">重置</el-button>
      </el-form-item>
    </el-form>
    <el-table v-loading="laoding" :data="tableData" stripe style="width: 100%">
      <el-table-column prop="id" label="ID" align="center" width="80" />
      <el-table-column prop="name" label="姓名" align="center" width="180" />
      <el-table-column prop="age" label="年龄" align="center" width="180" />
      <el-table-column prop="comment" label="描述" align="center" />
      <el-table-column prop="date" label="日期" align="center" width="180" />
      <el-table-column label="状态" width="100" align="center">
        <template #default="scope">
          <span v-if="scope.row.status == 1">未开始</span>
          <span v-if="scope.row.status == 2">进行中</span>
          <span v-if="scope.row.status == 3">已结束</span>
        </template>
      </el-table-column>
    </el-table>
    <Pagination :total="total" :current="current" @currentPage="getList"></Pagination> -->
    <!-- 注册 -->
    <register ref="registerRef" />
    <page-operate :bottom="70" :right="30" />
  </div>
</template>

<script>
import echartCard from './components/echartCard.vue';
import register from './components/register.vue';
import PageOperate from "comps/PageOperate.vue";
export default {
  name: 'Home',
  components: { echartCard, register, PageOperate },
  data() {
    return {
      echartType: [
        {
          label: '柱状图',
          value: 'bar'
        },
        {
          label: '折线图',
          value: 'line'
        },
        {
          label: '饼图',
          value: 'pie'
        }
      ],
      taskType: 'bar',
      feeType: 'line',
      reportType: 'pie',
      taskOptions: {},
      feeOptions: {},
      reportOptions: {}
    }
  },
  mounted() {
    this.setEchartCard('taskOptions', 'bar');
    this.setEchartCard('feeOptions', 'line');
    this.setEchartCard('reportOptions', 'pie');
  },
  methods: {
    setEchartCard(dataName, type) {
      switch(type) {
        case 'bar':
          this[dataName] = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {// 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '8%',
              top: '5%',
              right: '3%',
              bottom: '16%'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [120, 200, 150, 80, 70, 110, 130],
                type: 'bar',
                barWidth: 20
              }
            ]
          };
          break;
        case 'line':
          this[dataName] = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {// 坐标轴指示器，坐标轴触发有效
                type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
              }
            },
            grid: {
              left: '8%',
              top: '5%',
              right: '3%',
              bottom: '16%'
            },
            xAxis: {
              type: 'category',
              data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
            },
            yAxis: {
              type: 'value'
            },
            series: [
              {
                data: [150, 230, 224, 218, 135, 147, 260],
                type: 'line'
              }
            ]
          };
          break;
        case 'pie':
          this[dataName] = {
            tooltip: {
              trigger: 'item'
            },
            legend: {
              orient: 'horizontal',
              left: 'center'
            },
            series: [
              {
                name: '报告统计',
                type: 'pie',
                radius: '50%',
                data: [
                  { value: 1048, name: '一月' },
                  { value: 735, name: '二月' },
                  { value: 580, name: '三月' },
                  { value: 484, name: '四月' },
                  { value: 300, name: '五月' }
                ],
                emphasis: {
                  itemStyle: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                  }
                }
              }
            ]
          };
          break;
      }
    },
    handleTask(val) {
      this.setEchartCard('taskOptions', val);
    },
    handleFee(val) {
      this.setEchartCard('feeOptions', val);
    },
    handleReport(val) {
      this.setEchartCard('reportOptions', val);
    },
    handleRegister() {
      this.$refs.registerRef.openDialog();
    }
  }
};
</script>

<style lang="scss" scoped>
.content-container {
  .charts-view {
    display: flex;
    justify-content: space-between;
    .echarts-wrap {
      width: 32.5%;
      height: 300px;
      background: #fff;
      border-radius: 5px;
      box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
      .wrap-head {
        padding: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #eee;
        span {
          font-size: 18px;
          color: #333;
          font-weight: bold;
        }
      }
      .echarts-card {
        width: 100%;
        height: calc(100% - 38px);
      }
    }
  }
  .message-view {
    width: 390px;
    height: 300px;
    background: #fff;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.05);
    margin-top: 20px;
    .message-title {
      padding: 10px;
      font-size: 18px;
      color: #333;
      font-weight: bold;
      border-bottom: 1px solid #eee;
    }
    .message-list {
      width: 100%;
      height: calc(100% - 46.5px);
      padding: 10px;
      box-sizing: border-box;
      overflow-y: auto;
      .message-item {
        display: flex;
        align-items: center;
        padding: 5px 0;
        font-size: 14px;
        color: #333;
        .message-con {
          flex: 1;
          margin: 0 10px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
    }
  }
}
</style>

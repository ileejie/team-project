<!--
  *@description Vue Files Modules
  *@fileName Info.vue
  *@author leejie
  *@date 2024/06/27 13:58:14
!-->
<template>
  <div id="mainbox" class='page-wrap'>
    <el-form ref="form" :model="queryForm">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="任务名称">
            <el-input v-model="queryForm.params.taskName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="任务状态">
            <el-select v-model="queryForm.params.taskState" placeholder="请选择">
              <el-option
                v-for="item in taskStateOptions"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="创建时间">
            <el-date-picker
              v-model="dateRange"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
            <el-button @click="resetQuery">重置 {{ t('login.username') }}</el-button>
            <el-button type="success" @click="operateTask('run')">运行</el-button>
            <el-button type="danger" @click="operateTask('pause')">暂停</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="taskTable" :data="tableData.list" stripe height="calc(100% - 105px)" max-height="calc(100% - 105px)" style="width: 100%" @selection-change="selectionLineChangeHandle">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="80" align="center"></el-table-column>
      <el-table-column prop="taskName" label="任务名称" align="center"></el-table-column>
      <el-table-column prop="taskState" label="任务状态" align="center">
        <template v-slot="scope">
          <span>{{ scope.row.taskState === '1' ? '运行' : '暂停' }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="trigGap" label="触发间隔" align="center"></el-table-column>
      <el-table-column prop="trigTimes" label="触发总次数" align="center"></el-table-column>
      <el-table-column prop="startTime" label="开始时间" align="center"></el-table-column>
      <el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
      <el-table-column
        align="center"
        label="操作"
        width="180">
        <template v-slot="scope">
          <el-button
            @click.prevent="runRecord(scope.row.id)"
            type="text"
            size="small">
            运行记录
          </el-button>
          <el-button
            @click.prevent="historyRecord(scope.row.id)"
            type="text"
            size="small">
            历史记录
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryForm.params.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryForm.params.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
import { ElMessage } from "element-plus";
import { ref, reactive } from 'vue';
// 定义国际化方法
const { t } = useI18n()
// 固定数据
const totalTable = [
  { id: 1, taskName: '微件使用分析定时任务', taskState: '1', trigGap: '2次/天', trigTimes: 3, startTime: '', createTime: '', isShow: true },
  { id: 2, taskName: '定时上报微件统计数据', taskState: '1', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 3, taskName: '定时上报分辨率统计数据', taskState: '1', trigGap: '1次/10天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 4, taskName: '检测统计任务', taskState: '2', trigGap: '3次/20天', trigTimes: 0, startTime: '', createTime: '', isShow: true },
  { id: 5, taskName: '实时监控任务', taskState: '1', trigGap: '1次/2小时', trigTimes: 10, startTime: '', createTime: '', isShow: true },
  { id: 6, taskName: '', taskState: '1', trigGap: '1次/3天', trigTimes: 2, startTime: '', createTime: '', isShow: true },
  { id: 7, taskName: '', taskState: '1', trigGap: '1次/10天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 8, taskName: '', taskState: '2', trigGap: '1次/7天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 9, taskName: '', taskState: '2', trigGap: '1次/3天', trigTimes: 3, startTime: '', createTime: '', isShow: true },
  { id: 10, taskName: '', taskState: '1', trigGap: '1次/1小时', trigTimes: 12, startTime: '', createTime: '', isShow: true },
  { id: 11, taskName: '', taskState: '1', trigGap: '2次/3天', trigTimes: 2, startTime: '', createTime: '', isShow: true },
  { id: 12, taskName: '', taskState: '2', trigGap: '5次/天', trigTimes: 10, startTime: '', createTime: '', isShow: true },
  { id: 13, taskName: '', taskState: '1', trigGap: '1次/10天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 14, taskName: '', taskState: '2', trigGap: '1次/15天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 15, taskName: '', taskState: '1', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 16, taskName: '', taskState: '1', trigGap: '1次/3天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 17, taskName: '', taskState: '1', trigGap: '1次/12天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 18, taskName: '', taskState: '1', trigGap: '3次/5天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 19, taskName: '', taskState: '1', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 20, taskName: '', taskState: '2', trigGap: '2次/3天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 21, taskName: '', taskState: '2', trigGap: '3次/天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 22, taskName: '', taskState: '2', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 23, taskName: '', taskState: '1', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 24, taskName: '', taskState: '1', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 25, taskName: '', taskState: '1', trigGap: '1次/30天', trigTimes: 1, startTime: '', createTime: '', isShow: true },
  { id: 26, taskName: '', taskState: '2', trigGap: '1次/15天', trigTimes: 1, startTime: '', createTime: '', isShow: true }
];
const taskStateOptions = [
  { label: '运行', value: '1' },
  { label: '暂停', value: '2' }
];
// 定义表格ref
let taskTable = ref();
let dateRange = reactive([]);
let queryForm = reactive({
  params: {
    taskName: '',
    taskState: '',
    page: 1,
    pageSize: 20
  }
});
let tableData = reactive({ list: [] });
let total = ref(0);
let tableChecked = reactive({ list: [] });
tableData.list = totalTable.slice(0, 20);
total.value = totalTable.length;
// 数据查询方法
const queryData = () => {
  tableData.list = [];
  totalTable.forEach(item => {
    if (queryForm.params.taskState) {
      if (item.taskName.includes(queryForm.params.taskName) && item.taskState === queryForm.params.taskState) {
        tableData.list.push(item)
      }
    } else {
      if (item.taskName.includes(queryForm.params.taskName)) {
        tableData.list.push(item)
      }
    }
  });
  total.value = tableData.list.length;
};
// 重置查询方法
const resetQuery = () => {
  queryForm.params = {
    taskName: '',
    taskState: '',
    page: 1,
    pageSize: 20
  }
  tableData.list = totalTable.slice(0, 20);
  total.value = totalTable.length;
};
const handleSizeChange = (size) => {
  queryForm.params.pageSize = size;
  queryForm.params.page = 1;
  tableData.list = totalTable.slice(0, size);
};
const handleCurrentChange = (page) => {
  queryForm.params.page = page;
  tableData.list = totalTable.slice((page - 1) * queryForm.params.pageSize, page * queryForm.params.pageSize);
};
// 选择行数据
const selectionLineChangeHandle = (val) => {
  console.log(val);
  tableChecked.list = val;
};
// 运行任务、暂停任务
const operateTask = (type) => {
  if (!tableChecked.list.length) {
    ElMessage({
      message: '请选择要操作的数据',
      type: "warning"
    });
    return;
  }
  tableChecked.list.forEach(item => {
    tableData.list.forEach(obj => {
      if (item.id === obj.id) {
        obj.taskState = type === 'run' ? '1' : '2';
      }
    })
  })
  taskTable.value.clearSelection();
  ElMessage({
    message: '操作成功',
    type: "success"
  })
};
// 运行记录
const runRecord = (id) => {};
// 历史记录
const historyRecord = (id) => {};
</script>

<style lang='scss' scoped>
.page-wrap {
  height: 100%;
}
.pagination-wrap {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
</style>

<!--
  *@description Vue Files Modules
  *@fileName Info.vue
  *@author leejie
  *@date 2024/06/27 13:58:14
!-->
<template>
  <div id="mainbox" class='page-wrap'>
    <el-form ref="form" :model="queryForm" size="small">
      <el-row :gutter="20">
        <el-col :span="4">
          <el-form-item label="任务名称">
            <el-input v-model="queryForm.taskName"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item label="任务状态">
            <el-select v-model="queryForm.taskState" placeholder="请选择">
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
        <el-col :span="4">
          <el-form-item>
            <el-button type="primary" @click="queryData">查询</el-button>
            <el-button @click="resetQuery">重置</el-button>
            <el-button type="success" @click="operateTask('run')">运行</el-button>
            <el-button type="danger" @click="operateTask('pause')">暂停</el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <el-table ref="taskTable" :data="tableData" stripe size="small" height="calc(100% - 105px)" max-height="calc(100% - 105px)" style="width: 100%" @selection-change="selectionLineChangeHandle">
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column type="index" label="序号" width="50" align="center"></el-table-column>
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
        width="160">
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
        :current-page="queryForm.page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="queryForm.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
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
export default {
  name: 'TaskManage',
  data() {
    return {
      dateRange: [],
      queryForm: {
        taskName: '',
        taskState: '',
        page: 1,
        pageSize: 20
      },
      tableData: [],
      total: 0,
      taskStateOptions: [
        { label: '运行', value: '1' },
        { label: '暂停', value: '2' }
      ],
      tableChecked: []
    };
  },
  mounted() {
    this.tableData = totalTable.slice(0, 20);
    this.total = totalTable.length;
  },
  // 方法实现
  methods: {
    queryData() {
      this.tableData = []
      totalTable.forEach(item => {
        if (this.queryForm.taskState) {
          if (item.taskName.includes(this.queryForm.taskName) && item.taskState === this.queryForm.taskState) {
            this.tableData.push(item)
          }
        } else {
          if (item.taskName.includes(this.queryForm.taskName)) {
            this.tableData.push(item)
          }
        }
      });
      this.total = this.tableData.length;
    },
    resetQuery() {
      this.queryForm = {
        taskName: '',
        taskState: '',
        page: 1,
        pageSize: 20
      }
      this.queryForm.page = 1;
      this.tableData = totalTable.slice(0, 20);
    },
    handleSizeChange(size) {
      this.queryForm.pageSize = size;
      this.queryForm.page = 1;
      this.tableData = totalTable.slice(0, size);
    },
    handleCurrentChange(page) {
      this.queryForm.page = page;
      console.log(page, this.queryForm.pageSize);
      this.tableData = totalTable.slice((page - 1) * this.queryForm.pageSize, page * this.queryForm.pageSize);
    },
    // 选择行数据
    selectionLineChangeHandle(val) {
      console.log(val);
      this.tableChecked = val;
    },
    // 运行任务、暂停任务
    operateTask(type) {
      if (!this.tableChecked.length) {
        this.$messge.warning('请选择要操作的数据');
        return;
      }
      this.tableChecked.forEach(item => {
        this.tableData.forEach(obj => {
          if (item.id === obj.id) {
            obj.taskState = type === 'run' ? '1' : '2';
          }
        })
      })
      this.$refs.taskTable.clearSelection();
      this.$messge.success('操作成功');
    },
    // 运行记录
    runRecord(id) {},
    // 历史记录
    historyRecord(id) {}
  }
};
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

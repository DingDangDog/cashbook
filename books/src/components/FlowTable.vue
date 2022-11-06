<template>
  <el-row class="queryRow">
    <div class="queryParam">
      <el-button type="primary">新增</el-button>
    </div>
    <div class="queryParam">
      <el-date-picker v-model="queryRef.startDay" type="date" placeholder="开始时间" />
    </div>
    <div class="queryParam">
      <el-date-picker v-model="queryRef.endDay" type="date" placeholder="结束时间" />
    </div>
    <div class="queryParam">
      <el-select v-model="queryRef.type" class="m-2" clearable placeholder="消费类型">
        <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value" />
      </el-select>
    </div>
    <div class="queryParam">
      <el-input v-model="queryRef.name" placeholder="名称" />
    </div>
    <div class="queryParam">
      <el-input v-model="queryRef.description" placeholder="描述" />
    </div>

    <div class="queryParam">
      <el-button :icon="Search" circle @click="doQuery()" />
    </div>
  </el-row>

  <el-table :data="flowPageRef.pageData" stripe row-key="row" height="530">
    <el-table-column type="index" width="50" />
    <el-table-column prop="id" label="ID" width="180" v-if=false />
    <el-table-column prop="day" label="日期" :formatter="timeFormatter" width="180" />
    <el-table-column prop="type" label="消费类型" width="180" />
    <el-table-column prop="name" label="名称" width="180" />
    <el-table-column prop="money" label="金额" width="180" />
    <el-table-column prop="description" label="描述" />
    <el-table-column label="操作" prop="id" width="120">
      <template v-slot="scop">
        <el-button type="primary" :icon="Edit" circle />
        <el-button type="danger" :icon="Delete" circle @click="deleteById(scop.row.id)" />
      </template>
    </el-table-column>
  </el-table>

  <div class="pageDiv">
    <!-- {{ queryRef }},{{ flowPageRef }} -->
    <el-pagination :current-page="queryRef.pageNum" :page-size="queryRef.pageSize" :total="flowPageRef.totalCount"
      :page-sizes="[10, 20, 50, 100]" @size-change="pageSizeChange" @current-change="pageNumChange" background
      layout="->, sizes, prev, pager, next">
    </el-pagination>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { ElMessageBox, ElMessage } from 'element-plus'
import { Search, Delete, Edit } from '@element-plus/icons-vue';

import { getFlowPage, deleteFlow } from '../api/api';
import type { Page } from '../types/page';
import type { Flow, FlowQuery } from '../types/flow';

const typeOptions = [
  { value: '饮食', label: '饮食' },
  { value: '办公', label: '办公' },
  { value: '娱乐', label: '娱乐' },
  { value: '生活', label: '生活' },
  { value: '医疗', label: '医疗' },
  { value: '社交', label: '社交' },
  { value: '学习', label: '学习' },
  { value: '交通', label: '交通' },
  { value: '住宿', label: '住宿' },
  { value: '其他', label: '其他' }
]

const query: FlowQuery = {
  pageNum: 1,
  pageSize: 10,
  id: undefined,
  name: undefined,
  description: undefined,
  startDay: undefined,
  endDay: undefined
}

const flowPage: Page<Flow> = {
  pageNum: 1,
  pageSize: 0,
  totalPage: 1,
  totalCount: 0,
  pageData: []
}

const queryRef = ref(query);
const flowPageRef = ref(flowPage);

// 初始化后自动执行
onMounted(() => {
  doQuery();
})

// 切换页码
const pageNumChange = (pageNum: number) => {
  queryRef.value.pageNum = pageNum;
  doQuery();
}

// 切换分页容量
const pageSizeChange = (pageSize: number) => {
  queryRef.value.pageSize = pageSize;
  doQuery();
}

const doQuery = () => {
  getFlowPage(queryRef.value).then(res => {
    flowPageRef.value.pageData = res.pageData;
    flowPageRef.value.pageNum = res.pageNum;
    flowPageRef.value.pageSize = res.pageSize;
    flowPageRef.value.totalPage = res.totalPage;
    flowPageRef.value.totalCount = res.totalCount;
    // console.log(JSON.stringify(flowPage) + "doQuery");
  });
}

// 删除
const deleteById = (id: number) => {
  ElMessageBox.confirm(
    '确定删除此流水？',
    '确认删除',
    {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    }
  ).then(() => {
    deleteFlow(id);
    doQuery();
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
  }).catch(() => {
    ElMessage({
      type: 'info',
      message: '取消删除',
    })
  })
}

/**
 * 日期格式化方法
 * @param row 
 * @param column 
 * @param cellValue 
 * @param index 
 */
const timeFormatter = (row: any, column: Date, cellValue: string, index: number) => {
  let format: string = 'YYYY-mm-dd'
  let date = new Date(cellValue);
  const dataItem = {
    YYYY: date.getFullYear().toString(),
    mm: (date.getMonth() + 1).toString(),
    dd: date.getDate().toString(),
    // 'HH': date.getHours().toString(),
    // 'Mm': date.getMinutes().toString(),
    // 'ss': date.getSeconds().toString(),
  };
  format = format.replace('YYYY', dataItem.YYYY);
  format = format.replace('mm', dataItem.mm);
  format = format.replace('dd', dataItem.dd);
  return format
}

// ref(1)

// 将需要对外暴露的方法和对象添加到这里
// defineExpose({
//   queryRef, flowPageRef, pageChange, doQuery
// });

</script>

<style scoped>
.queryRow .queryParam {
  margin: 8px;
}

.pageDiv {
  margin: 10px 0;
}
</style>

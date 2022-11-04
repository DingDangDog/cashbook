<template>
    <el-table :data="tableData" height="300" style="width: 100% ">
        <el-table-column prop="date" label="Date" width="180" />
        <el-table-column prop="name" label="Name" width="180" />
        <el-table-column prop="address" label="Address" />
    </el-table>
    <!-- <div>{{ flowPage }}
    </div> -->
</template>

<script setup lang="ts">
import { getFlows } from '../api/api'
import type { FlowPage } from '../types/flow';
// 初始化假数据，用于展示验证
// const flowPage: FlowPage = {
//     pageNum: 1,
//     pageSize: 1,
//     dataList: [{
//         id: 1,
//         day: new Date(),
//         name: "测试",
//         description: "测试流水",
//         money: 1,
//         type: "测试类型",
//     }],
//     totalNum: 1
// };
const flowPage: FlowPage = await getFlows();

const tableData = [
  {
    date: '2016-05-03',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-02',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-04',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
  {
    date: '2016-05-01',
    name: 'Tom',
    address: 'No. 189, Grove St, Los Angeles',
  },
]
// 将需要对外暴露的方法和对象添加到这里
defineExpose({
    flowPage, tableData
});
</script>

<style scoped>

</style>

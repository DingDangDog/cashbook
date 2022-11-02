<template>
    <div>{{ flowPage }}
    </div>
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
// 将需要对外暴露的方法和对象添加到这里
defineExpose({
    flowPage
});
</script>

<style scoped>

</style>

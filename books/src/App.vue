<template>
  <div class="common-layout">
    <el-container>

      <el-header>
        <div class="headerInfo">
          <a href="https://oldmoon.top/">
            <img alt="oldmoon logo" class="logo" src="./static/images/oldmoon.dark.png" width="60" height="60" />
          </a>
        </div>
        <div class="headerInfo">
          <h1 style="margin-top: 20px;">DDD-CashBook</h1>
        </div>
      </el-header>

      <el-main>
        <div class="charts">
          <div class="chart">
            <LineChart />
          </div>
          <div class="chart">
            <PieChart />
          </div>
        </div>

        <div class="table">
          <Suspense>
            <template #default>
              <FlowTable />
            </template>
            <template #fallback>
              <div>加载中...</div>
            </template>
          </Suspense>
        </div>
      </el-main>


      <el-footer>
        Footer
      </el-footer>

    </el-container>
  </div>
</template>

<script setup lang="ts">
import "./assets/base.css";
// 同步组件引用
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'

// 异步组件引用
import { defineAsyncComponent } from 'vue'
const FlowTable = defineAsyncComponent(() => import("./components/FlowTable.vue"));
</script>

<style scoped>
.headerInfo {
  margin-top: 10px;
  margin-right: 20px;
  float: left;
}

.el-main {
  padding-top: 5px;
  padding-left: 200px;
  padding-right: 200px;
}

.charts {
  height: 300px;
}

.chart {
  float: left;
}


.table {
  float: none;
}

.el-footer {
  box-align: center;
  text-align: center;
}
</style>
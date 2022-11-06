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
        <button class="themeButton" style="margin-top: 30px;" @click="toggleDark()">
          <i inline-block align-middle i="dark:carbon-moon carbon-sun"
            style="background-color: rgb(193, 230, 198); border-color: rgba(0, 0, 0, 0.35); color: rgb(0, 0, 0);">
          </i>
          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button>
      </el-header>

      <el-main>
        <el-row class="mb-4">
          <el-button round>Round</el-button>
          <el-button type="primary" round>Primary</el-button>
          <el-button type="success" round>Success</el-button>
          <el-button type="info" round>Info</el-button>
          <el-button type="warning" round>Warning</el-button>
          <el-button type="danger" round>Danger</el-button>
        </el-row>

        <!-- 图标类型按钮 -->
        <!-- <el-row>
          <el-button :icon="Search" circle />
          <el-button type="primary" :icon="Edit" circle />
          <el-button type="success" :icon="Check" circle />
          <el-button type="info" :icon="Message" circle />
          <el-button type="warning" :icon="Star" circle />
          <el-button type="danger" :icon="Delete" circle />
        </el-row> -->

        <!-- <div class="charts">
          <div class="chart">
            <LineChart />
          </div>
          <div class="chart">
            <PieChart />
          </div>
        </div> -->

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


      <el-footer height="40px">
        Footer
      </el-footer>

    </el-container>
  </div>
</template>

<script setup lang="ts">
import { useToggle } from '@vueuse/shared';
import { useDark } from '@vueuse/core';

// 同步组件引用
import LineChart from './components/LineChart.vue'
import PieChart from './components/PieChart.vue'

import {
  Check,
  Delete,
  Edit,
  Message,
  Search,
  Star,
} from '@element-plus/icons-vue'

// 异步组件引用
import { defineAsyncComponent } from 'vue'
const FlowTable = defineAsyncComponent(() => import("./components/FlowTable.vue"));


const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
})

const toggleDark = useToggle(isDark);

</script>

<style scoped>
.headerInfo {
  margin-top: 10px;
  margin-right: 20px;
  float: left;
}

.themeButton {
  padding: 3px 15px;
  background-color: #44bd87;
  border: none;
  outline: none;
  color: #000;
  margin: 0.5rem 0;
  border-bottom: 2px solid #33a06f;
  text-shadow: 1px 1px 1px #33a06f;
  border-radius: 4px;
  font-size: 1rem;
  box-sizing: border-box;
  vertical-align: middle;
  float: right;
}

.el-main {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 200px;
  padding-right: 200px;
}

.mb-4 {
  margin: 10px;
}

.table {
  float: none;
  margin-top: 10px;
}

.el-footer {
  box-align: center;
  text-align: center;
}
</style>
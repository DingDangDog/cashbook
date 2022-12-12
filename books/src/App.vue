<template>
  <div class="common-layout">
    <el-container>

      <el-header>
        <div class="headerInfo">
          <a href="https://oldmoon.top/">
            <img alt="oldmoon logo" v-if="isDark ? true : false" class="logo" src="./static/images/oldmoon.dark.png"
              :width="tableDivStyle.paddingleft.replace('px', '')"
              :height="tableDivStyle.paddingleft.replace('px', '')" />
            <img alt="oldmoon logo" v-if="isDark ? false : true" class="logo" src="./static/images/oldmoon.light.png"
              :width="tableDivStyle.paddingleft.replace('px', '')"
              :height="tableDivStyle.paddingleft.replace('px', '')" />
          </a>
        </div>
        <div class="headerInfo">
          <h1>DDD-CashBook</h1>
        </div>

        <div class="themeButton">
          <el-button plain @click="toggleDark()">{{ isDark ? 'Dark' : 'Light' }}
          </el-button>
        </div>
        <div class="themeButton">
          <span v-if="!haveUserIdRef()">账本：{{ bookName }}&nbsp;</span>
          <el-button v-if="!haveUserIdRef()" type="info" plain @click="clearUser()">关闭账本</el-button>
        </div>
        <div class="themeButton">
          <el-button v-if="haveUserIdRef()" type="primary" plain @click="openSet()">打卡账本</el-button>
        </div>

        <!-- <button class="themeButton" style="margin-top: 30px;" @click="toggleDark()">
          <i inline-block align-middle i="dark:carbon-moon carbon-sun"
            style="background-color: rgb(193, 230, 198); border-color: rgba(0, 0, 0, 0.35); color: rgb(0, 0, 0);">
          </i>
          <span class="ml-2">{{ isDark ? 'Dark' : 'Light' }}</span>
        </button> -->
      </el-header>

      <el-main>
        <el-row class="mb-4">
          <el-button round @click="showChart(1, '每日消费曲线')">每日消费曲线</el-button>
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


      <el-footer>
        <b>当前为内测版本，数据随时可能清除，请知悉！</b>
        <p>Powered by <a href="https://github.com/DingDangDog/cashbook">cashbook</a></p>
      </el-footer>

    </el-container>

  <el-dialog v-model="chartDialog.chartDiaLogShow" :title="chartDialog.chartDiaLogTitle">
    <div v-if="(chartDialog.showChartNum == 1)"><DailyLineChart/></div>
  </el-dialog>

  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useToggle } from '@vueuse/shared';
import { useDark } from '@vueuse/core';
import { openSet, clearUser } from './utils/setKey'
// import { deviceAgent } from './api/common'

// 异步组件引用
import { defineAsyncComponent } from 'vue'
const FlowTable = defineAsyncComponent(() => import("./components/FlowTable.vue"));
const DailyLineChart = defineAsyncComponent(() => import("./components/DailyLineChart.vue"));

// 设置账本
const bookName = localStorage.getItem('bookName');

const haveUserId = (): boolean => {
  if (bookName || 'none' === bookName) {
    return false;
  } else {
    return true;
  }
}
const haveUserIdRef = ref(haveUserId);

// 设置主题
const isDark = useDark({
  storageKey: 'vitepress-theme-appearance',
})

const toggleDark = useToggle(isDark);

// 图表控制
const chartDialog = ref({
  chartDiaLogShow: false,
  chartDiaLogTitle: '每日消费曲线',
  showChartNum: 1,
})

const showChart = (showChartNum: number, chartDiaLogTitle: string) => {
  chartDialog.value.chartDiaLogShow = true;
  chartDialog.value.chartDiaLogTitle = chartDiaLogTitle;
  chartDialog.value.showChartNum = showChartNum;
}

// 动态表格样式
const tableDivStyle = ref({
  paddingtop: document.documentElement.clientHeight * 0.01 + `px`,
  paddingbottom: document.documentElement.clientHeight * 0.01 + `px`,
  paddingleft: document.documentElement.clientWidth * 0.03 + `px`,
  paddingright: document.documentElement.clientWidth * 0.03 + `px`,
  header: document.documentElement.clientWidth * 0.033 + `px`,
  footer: document.documentElement.clientWidth * 0.02 + `px`
});

</script>

<style scoped>
.headerInfo {
  margin-top: 10px;
  margin-right: 20px;
  float: left;
}

.headerInfo>.h1 {
  margin-top: v-bind('tableDivStyle.paddingtop');
}

.themeButton {
  float: right;
  margin: 30px 5px;
}

/* .el-main {
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: v-bing('mainRef.padding-left');
  padding-right: v-bing('mainRef.padding-right');
} */

.mb-4 {
  margin: 10px;
  padding-left: v-bind('tableDivStyle.paddingleft');
  padding-right: v-bind('tableDivStyle.paddingright');
}

.table {
  float: none;
  /* padding-top: v-bind('tableDivStyle.paddingtop');
  padding-bottom: v-bind('tableDivStyle.paddingbottom'); */
  padding-left: v-bind('tableDivStyle.paddingleft');
  padding-right: v-bind('tableDivStyle.paddingright');
}

.el-header {
  height: v-bind('tableDivStyle.header');
}

.el-footer {
  box-align: center;
  text-align: center;
  height: v-bind('tableDivStyle.footer');
}
</style>
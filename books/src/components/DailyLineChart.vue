<template>
  <el-row class="queryRow" justify="center">
    <div class="queryParam">
      <el-date-picker v-model="queryRef.startDay" type="date" placeholder="开始时间" />
    </div>
    <div class="queryParam">
      <el-date-picker v-model="queryRef.endDay" type="date" placeholder="结束时间" />
    </div>
    <div class="queryParam">
      <el-button :icon="Search" circle @click="doQuery(queryRef)" />
    </div>
  </el-row>
  <div id="lineDiv" style="width:100%; height:400px; padding:10px">
  </div>
</template>

<script setup lang="ts">
import type { DailyLineChartQuery } from '@/types/model/analysis';
import { dateFormater } from '@/utils/common';
import { Search } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';
import { onMounted, ref } from 'vue';
import { dailyLine } from '../api/api.analysis'

const query: DailyLineChartQuery = {
}
const queryRef = ref(query);

// 横轴数据
const xAxisList: string[] = [];
// 纵轴数据
const dataList: number[] = [];

const optionRef = ref({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross',
      label: {
        backgroundColor: '#6a7985'
      }
    }
  },
  toolbox: {
    feature: {
      saveAsImage: {}
    }
  },
  dataZoom: [
    {
      type: 'inside',
      start: 80,
      end: 100
    },
    {
      start: 80,
      end: 100
    }
  ],
  xAxis: {
    name: '日期',
    type: 'category',
    data: xAxisList
  },
  yAxis: {
    name: '金额(元)',
    show: true,
    type: 'value'
  },
  series: [
    {
      name: '每日消费统计',
      type: 'line',
      stack: 'Total',
      symbol: 'none',
      areaStyle: {},
      emphasis: {
        focus: 'series'
      },
      data: dataList
    }
  ]
});

var lineDiv: any;
var lineChart: echarts.ECharts;

const doQuery = (query: DailyLineChartQuery) => {
  if (query.startDay) {
    query.startDay = new Date(+(query.startDay || new Date()));
  }
  if (query.endDay) {
    query.endDay = new Date(+(query.endDay || new Date()));
  }
  dailyLine(query).then(res => {
    if (res) {
      if (res.length === 0) {
        ElMessage.error("未查询到数据！");
        return;
      }
      xAxisList.length = 0;
      dataList.length = 0;
      res.forEach((data) => {
        xAxisList.push(dateFormater('YYYY-MM-dd', data._id));
        dataList.push(data.daySum);
      })
      optionRef.value.xAxis.data = xAxisList;
      optionRef.value.series[0].data = dataList;
      optionRef.value.dataZoom[0].start = zoomChange(xAxisList.length);
      optionRef.value.dataZoom[1].start = zoomChange(xAxisList.length);

      lineDiv = document.getElementById('lineDiv');
      lineChart = echarts.init(lineDiv);
      lineChart.setOption(optionRef.value);
    }
  })
}

// 缩放比例动态计算，保证美观
const zoomChange = (total: number): number => {
  return (Math.ceil(total / 30) - 1)  * 10;
}

onMounted(() => {
  doQuery(queryRef.value);
})
</script>

<style scoped>
.queryRow .queryParam {
  margin: 8px 3px;
}
</style>
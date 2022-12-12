<template>
  <div id="lineDiv" style="width:100%; height:400px; padding:10px">
  </div>
</template>

<script setup lang="ts">
import type { DailyLineChartQuery } from '@/types/model/analysis';
import { dateFormater } from '@/utils/common';
import * as echarts from 'echarts';
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
  xAxis: {
    type: 'category',
    data: xAxisList
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      data: dataList,
      type: 'line'
    }
  ]
});

var lineDiv: any;
var lineChart: echarts.ECharts;

const doQuery = (query: DailyLineChartQuery) => {
  dailyLine(query).then(res => {
    if (res) {
      xAxisList.slice(0);
      dataList.slice(0);
      res.forEach((data) => {
        xAxisList.push(dateFormater('MM-dd', data._id));
        dataList.push(data.daySum);
      })
      optionRef.value.xAxis.data = xAxisList;
      optionRef.value.series[0].data = dataList;

      lineDiv = document.getElementById('lineDiv');
      lineChart = echarts.init(lineDiv);
      lineChart.setOption(optionRef.value);
    }
  })
}
onMounted(() => {
  doQuery(queryRef.value);
})
</script>

<style scoped>

</style>
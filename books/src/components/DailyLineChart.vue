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

const quertRef = ref(query);

const xAxisList: string[] = [];
const dataList: number[] = [];
onMounted(() => {
  const option = {
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
  };

  const lineDiv: any = document.getElementById('lineDiv');
  const lineChart = echarts.init(lineDiv);
  lineChart.setOption(option);


  dailyLine(quertRef.value).then(res => {
    if (res) {
      res.forEach((data) => {
        xAxisList.push(dateFormater('MM-dd', data._id));
        dataList.push(data.daySum);
      })
      lineChart.setOption(option);
    }
  })


})
</script>

<style scoped>

</style>
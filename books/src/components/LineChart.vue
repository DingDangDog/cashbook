<template>
  <div id="lineDiv" style="width:790px; height:300px; padding:10px">
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts';
import { onMounted } from 'vue';

onMounted(() => {
  const option = {
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: [150, 230, 224, 218, 135, 147, 260, 150, 230, 224, 218, 135, 147],
        type: 'line'
      }
    ]
  };
  const lineDiv: any = document.getElementById('lineDiv');
  const lineChart = echarts.init(lineDiv);
  lineChart.setOption(option);
})
</script>

<style scoped>

</style>
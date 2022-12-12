<template>
  <div id="pieDiv" style="width:100%; height:400px; padding:10px">
  </div>
</template>

<script setup lang="ts">
import type { TypePieChartQuery } from '@/types/model/analysis';
import * as echarts from 'echarts';
import { onMounted, ref } from 'vue';
import { typePie } from '../api/api.analysis'

const query: TypePieChartQuery = {
}
const queryRef = ref(query);

const dataList: any[] = [];

const optionRef = ref({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    top: '5%',
    left: '0',
    orient: 'vertical'
  },
  series: [
    {
      name: '消费类型',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: '40',
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: dataList
    }
  ]
});

var pieDiv: any;
var pieChart: echarts.ECharts;

const doQuery = (query: TypePieChartQuery) => {
  typePie(query).then(res => {
    if (res) {
      dataList.slice(0);
      res.forEach((data) => {
        dataList.push({
          value: data.typeSum,
          name: data._id,
        });
      })
      optionRef.value.series[0].data = dataList;
      pieDiv = document.getElementById('pieDiv');
      pieChart = echarts.init(pieDiv);
      pieChart.setOption(optionRef.value);
    }
  })
}

onMounted(() => {
  doQuery(queryRef.value);
})
</script>

<style scoped>

</style>
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
  <div id="pieDiv" style="width:100%; height:400px; padding:10px">
  </div>
</template>

<script setup lang="ts">
import type { TypePieChartQuery } from '@/types/model/analysis';
import { Search } from '@element-plus/icons-vue';
import * as echarts from 'echarts';
import { ElMessage } from 'element-plus';
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
  toolbox: {
    feature: {
      saveAsImage: {}
    }
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
  if (query.startDay) {
    query.startDay = new Date(+(query.startDay || new Date()));
  }
  if (query.endDay) {
    query.endDay = new Date(+(query.endDay || new Date()));
  }
  typePie(query).then(res => {
    if (res) {
      if (res.length === 0) {
        ElMessage.error("未查询到数据！");
        return;
      }
      dataList.length = 0;
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
.queryRow .queryParam {
  margin: 8px 3px;
}
</style>
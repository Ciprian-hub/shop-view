<template>
  <div>
    Orders Report
    <BarChart :width="40" :data="dataForBoar.chartData" :options="dataForBoar.chartOptions"/>
  </div>
</template>

<script setup>
import axiosClient from "../../axios.js";
import {ref} from "vue";
import BarChart from "../../components/Charts/Bar.vue";

const chartData = ref([])

const dataForBoar = {
  chartData: {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    datasets: [
      {
        label: 'Data One',
        backgroundColor: '#f87979',
        data: [40, 20, 12, 39, 10, 40, 39, 80, 40, 20, 12, 11]
      }
    ]
  },
  chartOptions: {
    responsive: true
  }
}

axiosClient.get('reports/orders')
    .then(({data}) => {
      chartData.value = data
      console.log(chartData.value)
    })
</script>

<style lang="scss" scoped>

</style>
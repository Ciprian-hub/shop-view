<template>
  <div>
    Orders Report
    <BarChart :width="40" :data="chartData" :options="dataForBoar.chartOptions"/>
  </div>
</template>

<script setup>
import axiosClient from "../../axios.js";
import {ref, watch} from "vue";
import BarChart from "../../components/Charts/Bar.vue";
import {useRoute} from "vue-router";

const route = useRoute()
const chartData = ref({
  labels:[],
  datasets:[]
})

watch(route, (route) => {
  getData(route.params.date)
}, {immediate: true})

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

function getData() {
  axiosClient.get('reports/orders', {params:{d: route.params.date}})
      .then(({data}) => {
        chartData.value = data
      })
}

</script>

<style lang="scss" scoped>

</style>
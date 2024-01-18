<template>
  <div class="flex justify-between">
    <h1 class="text-3xl font-semibold">Dashboard</h1>
    <div class="flex items-center">
      <label for="" class="mr-2">Change Date </label>
      <CustomInput v-model="chosenDate" type="select" @change="onDatePickerChange" :select-options="dateOptions"/>
    </div>
  </div>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
    <div class="flex flex-col items-center bg-white py-3 rounded-md">
      <div>
        Nr of customers
      </div>
      <div>
        {{ customersCount }}
      </div>
    </div>
    <div class="flex flex-col items-center bg-white py-3 rounded-md">
      <div>
        productsCount
      </div>
      <div>
        {{ productsCount }}
      </div>
    </div>
    <div class="flex flex-col items-center bg-white py-3 rounded-md">
      <div>
        paidOrders
      </div>
      <div>
        {{ paidOrders }}
      </div>
    </div>
    <div class="flex flex-col items-center bg-white py-3 rounded-md">
      <div>
        totalAmount
      </div>
      <div>
        {{ totalAmount }}
      </div>
    </div>
  </div>
  <div class="grid grid-rows-2 grid-cols-2 grid-flow-col gap-4 md:grid-cols-2">
    <div class="row-span-3 bg-white py-3 rounded-md  flex flex-col px-3">
      <label class="font-semibold mb-2 text-center">Latest Orders</label>
      <div v-for="o of latestOrders" class="px-3 hover:bg-gray-100 mb-2">
        <div>
          <p>
            <router-link :to="{name: 'app.order.view', params: {id: o.id}}" class="font-semibold text-indigo-500">Order
              #{{ o.id }}
            </router-link>
            contains {{ o.items }} items, {{ $filters.currencyUSD(o.total_price) }}
          </p>
        </div>
        <div class="flex justify-between">
          <span>{{ o.first_name }}</span>
          <div>Created {{ o.created_at }}</div>
        </div>
      </div>
    </div>
    <div class="col-span-2 bg-white py-3 rounded-md items-center flex flex-col">
      <label class="mb-4 font-semibold">
        Latest Customers
      </label>
      //TODO
<!--      <div>-->
<!--        <router-link :to="{name: 'app.customer.view', params:{id: customer.id}}" v-for="customer of latestCustomers"-->
<!--                     :key="customer.id" class="mb-3 flex">-->
<!--          <div class="w-12 h-12 bg-gray-200 flex items-center justify-center rounded-full mr-2">-->
<!--            <UserIcon class="w-5"/>-->
<!--          </div>-->
<!--          <div>-->
<!--            <div>{{ customer.first_name }} {{ customer.last_name }}</div>-->
<!--            <div>{{ customer.email }}</div>-->
<!--            <div>{{ customer.phone ? customer.phone : 'No phone number' }}</div>-->
<!--          </div>-->

<!--        </router-link>-->
<!--      </div>-->
    </div>
    <div class="row-span-2 col-span-2 bg-white py-3 rounded-md items-center flex flex-col">
      <div>
        Orders by country
      </div>
      <div class="w-4/12 mx-auto">
        <DoughnutChart
            :width="40"
            :data="ordersByCountry"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import {UserIcon} from "@heroicons/vue/outline";
import axiosClient from "../axios";
import {onMounted, ref} from "vue";
import DoughnutChart from "../components/Charts/Doughnut.vue";
import {data} from "autoprefixer";
import CustomInput from "../components/core/CustomInput.vue";

const customersCount = ref(0)
const productsCount = ref(0)
const paidOrders = ref(0)
const totalAmount = ref(0)
const ordersByCountry = ref({
  labels: [],
  datasets: [{
    backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
    data: []
  }]
})
const latestCustomers = ref([])
const latestOrders = ref('')
const dateOptions = ref([
  {key: "2d", text: "Last day"},
  {key: "1wk", text: "Last Week"},
  {key: "2wk", text: "Last 2 Weeks"},
  {key: "1m", text: "Last Month"},
  {key: "3m", text: "Last 3 Months"},
  {key: "6m", text: "Last 6 Months"},
  {key: "all", text: "All Time"}
])

function updateDashboard() {
  const date = chosenDate.value
  console.log(chosenDate.value)
  axiosClient.get('dashboard/customers', {params: {date}})
      .then(({data}) => {
        customersCount.value = data
      })
  axiosClient.get('dashboard/products', {params: {date}})
      .then(({data}) => {
        productsCount.value = data
      })
  axiosClient.get('dashboard/orders', {params: {date}})
      .then(({data}) => {
        paidOrders.value = data
      })
  axiosClient.get('dashboard/total', {params: {date}})
      .then(({data}) => {
        totalAmount.value = new Intl.NumberFormat('en-US', {style: 'currency', currency: 'USD'}).format(data)
      })
  axiosClient.get('dashboard/orders-country', {params: {date}})
      .then(({data: countries}) => {
        const chartData = {
          labels: [],
          datasets: [{
            backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
            data: []
          }]
        }
        countries.forEach(country => {
          chartData.labels.push(country.name)
          chartData.datasets[0].data.push(country.count)
        })
        ordersByCountry.value = chartData
      })
  axiosClient.get('dashboard/latest-customers', {params: {date}})
      .then(({data: customers}) => {
        latestCustomers.value = customers
      })

  axiosClient.get('dashboard/latest-orders', {params: {date}})
      .then(({data: orders}) => {
        latestOrders.value = orders.data
      })
}

const chosenDate = ref("all")

function onDatePickerChange() {
  updateDashboard()
}

onMounted(() =>updateDashboard())
</script>

<style>

</style>
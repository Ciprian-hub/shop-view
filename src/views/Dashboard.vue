<template>
  <h1 class="text-3xl font-semibold">Dashboard</h1>

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
        {{ totalAmount }} $
      </div>
    </div>
  </div>
  <div class="grid grid-rows-2 grid-cols-2 grid-flow-col gap-4 md:grid-cols-2">
    <div class="row-span-3 bg-white">
<!--      <Doughnut/>-->
    </div>
    <div class="col-span-2 bg-white">
      Somethin
    </div>
    <div class="row-span-2 col-span-2 bg-white">
      Something
    </div>
  </div>
</template>

<script setup>
import Doughnut from "../components/Charts/Doughnut.vue";
import axiosClient from "../axios";
import {ref} from "vue";

const customersCount = ref(0)
const productsCount = ref(0)
const paidOrders = ref(0)
const totalAmount = ref(0)

axiosClient.get('dashboard/customers')
    .then(({data}) => {
      customersCount.value = data
    })
axiosClient.get('dashboard/products')
    .then(({data}) => {
      productsCount.value = data
    })
axiosClient.get('dashboard/orders')
    .then(({data}) => {
      paidOrders.value = data
    })
axiosClient.get('dashboard/total')
    .then(({data}) => {
      totalAmount.value = new Intl.NumberFormat('en-EU', {style: 'currency', currency: 'EUR'}).format(data)
    })

</script>

<style>

</style>
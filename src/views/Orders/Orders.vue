<template>
  <div class="">
    <h1 class="text-3xl font-semibold">Orders</h1>
    <OrdersTable @click="viewOrder"/>
  </div>
</template>

<script setup>

import OrdersTable from "./OrdersTable.vue";
</script>

<style>

</style>
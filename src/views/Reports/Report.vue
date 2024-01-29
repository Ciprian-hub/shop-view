<template>
  <div>
    <div class="grid gap-3 grid-cols-2">
      <router-link :to="{name: 'reports.orders'}"
                   class="bg-white py-2 px-3 text-gray-600 rounded-md text-center"
                   active-class='text-blue-600 bg-blue-500'>OrdersReport
      </router-link>
      <router-link :to="{name: 'reports.customers'}"
                   class="bg-white py-2 px-3 text-gray-600 rounded-md text-center"
                   active-class='text-blue-600 bg-blue-500'>Customers Report
      </router-link>
    </div>

    <div class="bg-white p-3 rounded-md mt-3 shadow-md">
      <router-view></router-view>
    </div>

  </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>

</style>
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
      <CustomInput v-model="chosenDate" type="select" @change="onDatePickerChange" :select-options="dateOptions"/>

    </div>
    <div class="bg-white p-3 rounded-md mt-3 shadow-md">
      <router-view></router-view>
    </div>

  </div>
</template>

<script setup>
import CustomInput from "../../components/core/CustomInput.vue";
import {computed, onMounted, ref} from "vue";
import {useRoute, useRouter} from "vue-router";
import store from "../../store/index.js";

const chosenDate = ref('all')
const router = useRouter()
const route = useRoute()
const dateOptions = computed(() => store.state.dateOptions)

function onDatePickerChange() {
  router.push({name: route.name, params:{date: chosenDate.value}})
}

</script>

<style lang="scss" scoped>

</style>
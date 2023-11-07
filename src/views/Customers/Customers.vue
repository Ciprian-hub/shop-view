<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold">Customers</h1>
<!--    <button type="button"-->
<!--            @click="showAddNewModal()"-->
<!--            class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"-->
<!--    >-->
<!--      Add new Customer-->
<!--    </button>-->
  </div>
  <CustomersTable @clickEdit="editCustomer"/>
  <CustomersModal v-model="showModal" :customer="customerModel" @close="onModalClose"/>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import CustomersTable from "./CustomersTable.vue";
import CustomersModal from "./CustomersModal.vue";

const EMPTY_OBJECT = {
  // id: '',
  // title: '',
  // image: '',
  // description: '',
  // price: '',
}
const customers = computed(() => store.state.customers)
const showModal = ref(false)
const customerModel = ref({...EMPTY_OBJECT})

function showAddNewModal(){
  showModal.value = true
}

function editCustomer(customer) {
  store.dispatch('geCustomer', customer.id)
  .then(({data}) => {
    customerModel.value = data
    // this is for edit customer ...bad name
    showAddNewModal()
  })
}

function onModalClose() {
  customerModel.value = {...EMPTY_OBJECT}
}

</script>

<style>

</style>
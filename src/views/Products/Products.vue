<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold">Products</h1>
    <button type="button"
            @click="showAddNewModal()"
            class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Add new Product
    </button>
  </div>
  <ProductsTable @clickEdit="editProduct"/>
  <ProductsModal v-model="showModal" :product="productModel" @close="onModalClose"/>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import ProductsTable from "./ProductsTable.vue";
import ProductsModal from "./ProductsModal.vue";

const EMPTY_OBJECT = {
  id: '',
  title: '',
  image: '',
  description: '',
  price: '',
}
const products = computed(() => store.state.products)
const showModal = ref(false)
const productModel = ref({...EMPTY_OBJECT})

function showAddNewModal(){
  showModal.value = true
}

function editProduct(product) {
  store.dispatch('getProduct', product.id)
  .then(({data}) => {
    productModel.value = data
    // this is for edit product ...bad name
    showAddNewModal()
  })
}

function onModalClose() {
  productModel.value = {...EMPTY_OBJECT}
}

</script>

<style>

</style>
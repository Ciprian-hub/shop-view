<template>
  <div class="bg-white p-4 rounded-lg shadow animate-fade-in-down">
    <div class="flex justify-between border-b-2 pb-3">
      <div class="flex items-center">
        <span class="whitespace-nowrap mr-3">Per Page</span>
        <select @change="getOrders(null)" v-model="perPage"
                class="appearance-none relative block w-24 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm">
          <option value="5">5</option>
          <option value="10">10</option>
          <option value="20">20</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        <span class="ml-3">Found {{ orders.total }} orders</span>
      </div>
      <div>
        <input v-model="search" @change="getOrders(null)"
               class="appearance-none relative block w-48 px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
               placeholder="Type to Search orders">
      </div>
    </div>

    <table class="table-auto w-full">
      <thead>
      <tr>
        <TableHeaderCell field="id" :sort-field="sortField" :sort-direction="sortDirection" @click="sortOrders('id')">
          ID
        </TableHeaderCell>
        <TableHeaderCell field="status" :sort-field="sortField" :sort-direction="sortDirection">
          Status
        </TableHeaderCell>
        <TableHeaderCell field="created_at" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortOrders('created_at')">
          Date
        </TableHeaderCell>
        <TableHeaderCell field="total_price" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortOrders('total_price')">
          Total Price
        </TableHeaderCell>
        <TableHeaderCell field="customer" :sort-field="sortField" :sort-direction="sortDirection"
                         @click="sortOrders('customer')">
          Customer
        </TableHeaderCell>
        <TableHeaderCell field="actions">
          Actions
        </TableHeaderCell>
      </tr>
      </thead>
      <!--      <tbody v-if="orders.loading || !orders.data.length">-->
      <!--      <tr>-->
      <!--        <td colspan="6">-->
      <!--          <Spinner v-if="orders.loading"/>-->
      <!--          <p v-else class="text-center py-8 text-gray-700">-->
      <!--            There are no orders-->
      <!--          </p>-->
      <!--        </td>-->
      <!--      </tr>-->
      <!--      </tbody>-->
      <tbody>
      <tr v-for="(order, index) of orders.data">
        <td class="border-b p-2 ">{{ order.id }}</td>
        <td class="border-b p-2 ">
          <span>{{ order.status }}</span>
        </td>
        <td class="border-b p-2 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
          {{ order.created_at }}
        </td>
        <td class="border-b p-2">
          {{ order.total_price }}
        </td>
        <!--        <td class="border-b p-2">-->
        <!--          {{ $filters.currencyUSD(order.price) }}-->
        <!--        </td>-->
        <td class="border-b p-2 ">
          {{ order.customer.email }}
        </td>
        <td class="border-b p-2 ">
          <router-link :to="{name: 'app.order.view', params: {id: order.id}}">View</router-link>
        </td>
      </tr>
      </tbody>
    </table>

    <div v-if="!orders.loading" class="flex justify-between items-center mt-5">
      <div v-if="orders.data.length">
        Showing from {{ orders.from }} to {{ orders.to }}
      </div>
      <nav

          class="relative z-0 inline-flex justify-center rounded-md shadow-sm -space-x-px"
          aria-label="Pagination"
      >
        <!-- Current: "z-10 bg-indigo-50 border-indigo-500 text-indigo-600", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" -->
        <a
            v-for="(link, i) of orders.links"
            :key="i"
            :disabled="!link.url"
            href="#"
            @click="getForPage($event, link)"
            aria-current="page"
            class="relative inline-flex items-center px-4 py-2 border text-sm font-medium whitespace-nowrap"
            :class="[
              link.active
                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
              i === 0 ? 'rounded-l-md' : '',
              i === orders.links.length - 1 ? 'rounded-r-md' : '',
              !link.url ? ' bg-gray-100 text-gray-700': ''
            ]"
            v-html="link.label"
        >
        </a>
      </nav>
    </div>
  </div>
</template>

<script setup>
import {DotsVerticalIcon, PencilIcon, TrashIcon} from '@heroicons/vue/outline'
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/vue";
import {PRODUCTS_PER_PAGE} from "../../constants";
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import TableHeaderCell from "../../components/core/Table/TableHeaderCell.vue";

const perPage = ref(PRODUCTS_PER_PAGE)
const search = ref()
const orders = computed(() => store.state.orders)
const order = ref({})
const emit = defineEmits(['clickEdit'])
const sortField = ref('updated_at')
const sortDirection = ref('desc')

onMounted(() => {
  getOrders()
})

function getForPage(ev, link) {
  ev.preventDefault()
  if (!link.url || link.active) {
    return
  }
  getOrders(link.url)
}

function getOrders(url = null) {
  store.dispatch('getOrders', {
    url,
    sort_field: sortField.value,
    sort_direction: sortDirection.value,
    search: search.value,
    perPage: perPage.value
  })
}

function sortOrders(field) {
  if (field === sortField.value) {
    if (sortDirection.value === 'desc') {
      sortDirection.value = 'asc'
    } else {
      sortDirection.value = 'desc'
    }
  } else {
    sortField.value = field;
    sortDirection.value = 'asc'
  }
  getOrders()
}

</script>

<style>

</style>
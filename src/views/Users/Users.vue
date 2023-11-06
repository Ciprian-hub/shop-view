<template>
  <div class="flex items-center justify-between mb-3">
    <h1 class="text-3xl font-semibold">Users</h1>
    <button type="button"
            @click="showAddNewModal()"
            class="py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Add new User
    </button>
  </div>
  <UsersTable @clickEdit="editUser"/>
  <UsersModal v-model="showModal" :user="userModel" @close="onModalClose"/>
</template>

<script setup>
import {computed, onMounted, ref} from "vue";
import store from "../../store";
import UsersTable from "./UsersTable.vue";
import UsersModal from "./UsersModal.vue";

const EMPTY_OBJECT = {
  id: '',
  title: '',
  image: '',
  description: '',
  price: '',
}
const users = computed(() => store.state.users)
const showModal = ref(false)
const userModel = ref({...EMPTY_OBJECT})

function showAddNewModal(){
  showModal.value = true
}

function editUser(user) {
    userModel.value = user
    // this is for edit user ...bad name
    showAddNewModal()
}

function onModalClose() {
  userModel.value = {...EMPTY_OBJECT}
}

</script>

<style>

</style>
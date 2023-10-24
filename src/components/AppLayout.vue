<template>
  <div class="h-[100vh] bg-gray-200 flex">
    <!--    Sidebar-->
    <Sidebar :class="{'-ml-[160px]' : !sidebarOpened}"/>
    <!--/    Sidebar-->

    <div class="flex-1 h-full">
      <Navbar @toggle-sidebar="toggleSidebar"></Navbar>
      <!--      Content-->
      <main class="p-6">
        <router-view></router-view>
      </main>
      <!--      Content-->
    </div>
  </div>
<!--  <div v-else class="min-h-full bg-gray-200 flex items-center justify-center">-->
<!--&lt;!&ndash;    <Spinner />&ndash;&gt;-->
<!--  </div>-->
<!--  <Toast />-->
</template>

<script setup>
import Sidebar from "./Sidebar.vue";
import Navbar from "./Navbar.vue";
import {ref, toRef} from "vue";

const sidebarOpened = ref(true)
function toggleSidebar() {
  sidebarOpened.value = !sidebarOpened.value
}

</script>

<style>

</style>
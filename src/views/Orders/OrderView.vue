<template>
  view order
  <pre>{{order}}</pre>
</template>

<script setup>

import store from "../../store/index.js";
import {useRoute} from "vue-router";
import {onMounted, ref} from "vue";

const route = useRoute()
const order = ref({});

onMounted(() =>{
  store.dispatch('getOrder', route.params.id)
      .then(({data}) => {
        order.value = data
      })
})

</script>


<style>

</style>
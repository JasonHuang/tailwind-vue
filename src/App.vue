<script setup>
import { reactive } from 'vue'

const state = reactive({ count: 0 })
</script>

<template>
  <button @click="state.count++">
    {{ state.count }}
  </button>
</template>
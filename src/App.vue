<template>
  <div class="app-container">
    <NavbarItem />

    <RouterView />

    <AppFooter />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarItem from '@/components/NavbarItem.vue'
import AppFooter from '@/components/AppFooter.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 100vh;
}

AppFooter {
  margin-top: auto;
}
</style>

<template>
  <div class="app-container">
    <NavbarItem />

    <RouterView />

    <Footer />
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router'
import NavbarItem from '@/components/NavbarItem.vue'
import Footer from '@/components/Footer.vue'
</script>

<style scoped>
.app-container {
  display: flex;
  flex-direction: column;
  min-height: 100vh; 
}

Footer {
  margin-top: auto;
}
</style>

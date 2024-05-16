<template>
  <h1>Logging Out</h1>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import { useRouter } from 'vue-router'

const user = useUserStore()
const router = useRouter()

user.logout()
router.push({ name: 'home' })
</script>

<style></style>

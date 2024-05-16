<template>
  <div class="container border rounded">
    <JobPendingCard v-for="index in 4" :key="index" :index="index" />
  </div>
</template>

<script>
import JobPendingCard from '@/components/JobPendingCard.vue'

export default {
  components: {
    JobPendingCard,
  },
  data() {
    return {

    }
  },
  methods: {

  }
}
</script>

<style scoped></style>

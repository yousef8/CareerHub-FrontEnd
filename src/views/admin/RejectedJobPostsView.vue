<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="jobPost in rejectedJobPosts" :key="jobPost.id">
        <RejectedJobPostCard :jobPostId="jobPost.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useJobPostStore } from '@/stores/jobPostStore'
import RejectedJobPostCard from '@/components/RejectedJobPostCard.vue'

export default {
  components: {
    RejectedJobPostCard
  },
  data() {
    return {
      jobPostStore: useJobPostStore()
    }
  },
  computed: {
    rejectedJobPosts() {
      return this.jobPostStore.rejectedJobPosts
    },
    loading() {
      return this.jobPostStore.loading
    }
  },
  created() {
    this.jobPostStore.fetchRejectedJobPosts()
  }
}
</script>

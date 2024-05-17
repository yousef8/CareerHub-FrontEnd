<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <div v-for="jobPost in pendingJobPosts" :key="jobPost.id">
        <PendingJobPostCard :jobPostId="jobPost.id" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useJobPostStore } from '@/stores/jobPostStore'
import PendingJobPostCard from '@/components/PendingJobPostCard.vue'

export default {
  components: {
    PendingJobPostCard
  },
  data() {
    return {
      jobPostStore: useJobPostStore()
    }
  },
  computed: {
    pendingJobPosts() {
      return this.jobPostStore.pendingJobPosts
    },
    loading() {
      return this.jobPostStore.loading
    }
  },
  created() {
    this.jobPostStore.fetchPendingJobPosts()
  }
}
</script>

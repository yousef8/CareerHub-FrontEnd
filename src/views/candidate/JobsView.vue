<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4 fw-bold bg-body-secondary py-2">All Jobs</h2>
    <div v-if="loading" class="text-center fs-4 fw-bold text-success">Loading...</div>
    <div v-else>
      <div v-if="jobs.length === 0" class="text-center">No jobs available</div>
      <div v-else>
        <JobCard v-for="(job, index) in jobs" :key="index" :job="job" />
      </div>
    </div>
  </div>
</template>

<script>
import JobCard from '@/components/JobCard.vue';

export default {
  components: {
    JobCard
  },
  data() {
    return {
      jobs: [],
      loading: false
    };
  },
  mounted() {
    this.fetchJobs();
  },
  methods: {
    async fetchJobs() {
      this.loading = true;
      try {
        const response = await fetch('http://localhost:8000/api/jobs');
        const data = await response.json();
        this.jobs = data;
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        this.loading = false;
      }
    }
  }
};
</script>

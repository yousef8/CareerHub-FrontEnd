<template>
  <div class="container mt-4">
    <h2 class="text-center mb-4 fw-bold bg-body-secondary py-2">All Jobs</h2>
    <div v-if="loading" class="text-center fs-4 fw-bold text-success">Loading...</div>
    <div v-else>
      <div v-if="jobs.length === 0" class="text-center">No jobs available</div>
      <div v-else>
        <JobCard v-for="(job, index) in visibleJobs" :key="index" :job="job" />
      </div>
      <PaginationComponent
        :current-page="currentPage"
        :total-pages="totalPages"
        :prev-page="prevPage"
        :next-page="nextPage"
        :goto-page="gotoPage"
      />
    </div>
  </div>
</template>

<script>
import JobCard from '@/components/JobCard.vue';
import PaginationComponent from '@/components/PaginationComponent.vue'; 

export default {
  components: {
    JobCard,
    PaginationComponent
  },
  data() {
    return {
      jobs: [],
      loading: false,
      currentPage: 1,
      pageSize: 2 // Change this value to adjust the number of jobs per page
    };
  },
  computed: {
    visibleJobs() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      const endIndex = startIndex + this.pageSize;
      return this.jobs.slice(startIndex, endIndex);
    },
    totalPages() {
      return Math.ceil(this.jobs.length / this.pageSize);
    }
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
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    gotoPage(pageNumber) {
      this.currentPage = pageNumber;
    }
  }
};
</script>

<style>
/* Add custom styles here if needed */
</style>
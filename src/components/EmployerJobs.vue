<template>
  <div class="jobs-container">
    <h2 class="fw-bold text-primary mb-4">Jobs Posted</h2>
    <div v-if="jobs.length === 0" class="no-applications">No jobs found.</div>
    <div v-else>
      <ul class="job-list">
        <li v-for="job in jobs" :key="job.id" class="job-card">
          <div class="card-body">
            <h5 class="card-title">{{ job.title }}</h5>
            <p class="card-text">
              <span class="location">
                <i class="fas fa-map-marker-alt"></i> {{ job.city }}, {{ job.country }}
              </span>
              <span class="experience">
                <i class="fas fa-briefcase"></i> {{ job.min_exp_years }} -
                {{ job.max_exp_years }} years
              </span>
            </p>
            <div class="action-buttons">
              <button class="btn btn-primary" @click="viewJobDetails(job.id)">
                <i class="fas fa-eye"></i> View Details
              </button>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import api from '@/utilities/axios'

export default {
  data() {
    return {
      jobs: [],
      loading: false,
    };
  },
  mounted() {
    this.fetchJobs()
  },
  methods: {
    async fetchJobs() {
      this.loading = true
      try {
        const response = await api.get(`/employer/job-posts`)
        this.jobs = response.data
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        this.loading = false
      }
    },
    viewJobDetails(jobId) {
      this.$router.push({ name: 'job-details', params: { id: jobId } });
    }
  }
}
</script>

<style scoped>
.jobs-container {
  padding: 32px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.job-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.job-card {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 15px;
  margin: 15px 0;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
}

.job-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  margin-bottom: 15px;
}

.card-text {
  color: #666;
  margin-bottom: 10px;
}

.location,
.experience {
  display: inline-block;
  margin: 0 10px;
}

.location i,
.experience i {
  color: #ccc;
  margin-right: 5px;
}

.action-buttons {
  display: flex;
  justify-content: flex-end;
}
</style>

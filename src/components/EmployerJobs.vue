<template>
  <div class="jobs-container">
    <h2 class="heading">Jobs Posted</h2>
    <div v-if="jobs.length === 0" class="no-applications">No jobs found.</div>
    <div v-else>
      <ul class="job-list">
        <li v-for="(job, index) in jobs" :key="index" class="job-card">
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
              <button class="btn btn-primary" @click="viewJobDetails(job)">
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
export default {
  data() {
    return {
      jobs: [
        {
          title: 'Software Engineer',
          city: 'San Francisco',
          country: 'USA',
          min_exp_years: 2,
          max_exp_years: 5
        },
        {
          title: 'Data Analyst',
          city: 'New York',
          country: 'USA',
          min_exp_years: 1,
          max_exp_years: 3
        }
      ]
    }
  },
  methods: {
    viewJobDetails(job) {
      alert(`Viewing details for job: ${job.title}`)
    }
  }
}
</script>

<style scoped>
.jobs-container {
  padding: 20px;
}

.heading {
  font-size: 1.5rem;
  margin-bottom: 20px;
  text-align: center;
}

.job-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.job-card {
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  padding: 15px;
  margin-bottom: 15px;
  cursor: pointer; /* Simulate hover effect */
  transition: all 0.2s ease-in-out;
}

.job-card:hover {
  transform: translateY(-2px); /* Add slight hover animation */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-weight: bold;
  margin-bottom: 5px;
}

.card-text {
  color: #666;
  margin-bottom: 10px;
}

.location,
.experience {
  display: inline-block;
  margin-right: 10px;
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

.btn {
  margin-left: 5px;
}
</style>

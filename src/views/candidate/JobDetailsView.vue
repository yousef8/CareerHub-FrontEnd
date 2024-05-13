<template>
  <div class="job-details-container">
    <h1 class="heading">{{ job.title }}</h1>
    <div class="job-info">
      <p class="location">
        <i class="fas fa-map-marker-alt"></i> {{ job.city }}, {{ job.country }}
      </p>
      <p class="experience">
        <i class="fas fa-briefcase"></i> {{ job.min_exp_years }} - {{ job.max_exp_years }} years
        experience
      </p>
      <p class="job-type"><i class="fas fa-clock"></i> {{ job.type }} ({{ job.remote_type }})</p>
    </div>
    <div class="description" v-html="job.description"></div>
    <div class="requirements">
      <h2>Job Requirements</h2>
      <ul>
        <li v-for="requirement in job.requirements.split('\n')" :key="requirement">
          {{ requirement.trim() }}
        </li>
      </ul>
    </div>
    <div class="actions">
      <a href="#" class="btn btn-primary">Apply Now</a>
      <a href="#" class="btn btn-secondary">Copy Job link</a>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/utilities/axios'
export default {
  data() {
    return {
      job: {
        title: 'Software Engineer',
        city: 'San Francisco',
        country: 'USA',
        min_exp_years: 2,
        max_exp_years: 5,
        type: 'Full-time',
        remote_type: 'Remote',
        description: `<p>Our company is looking for a software engineer to join our team. You will be working on
            developing new features for our web application.</p>`,
        requirements: `Bachelor's degree in Computer Science or related field\nExperience with JavaScript and
            Node.js\nExperience with React.js or Angular`
      }
    }
  },
  mounted() {
    this.fetchJob()
  },
  methods: {
    async fetchJob() {
      this.loading = true
      try {
        const response = await api.get(`/jobs/${this.$route.params.id}`)
        const data = response.data
        this.job = data
      } catch (error) {
        console.error('Error fetching job:', error)
      } finally {
        this.loading = false
      }
    }

    // async fetchJob() {
    //   this.loading = true
    //   try {
    //     const response = await fetch(`${import.meta.env.VITE_API_URL}/jobs/2`)
    //     const data = await response.json()
    //     this.job = data
    //   } catch (error) {
    //     console.error('Error fetching job:', error)
    //   } finally {
    //     this.loading = false
    //   }
    // }
  }
}
</script>

<style scoped>
.job-details-container {
  padding: 50px;
  max-width: 900px;
  margin: 70px auto;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.heading {
  font-size: 1.8rem;
  margin-bottom: 20px;
}

.job-info {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 20px;
}

.job-info p {
  margin-right: 20px;
  color: #666;
}

.job-type i {
  color: #428bca;
}

.description {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.requirements {
  margin-bottom: 20px;
}

.requirements h2 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.requirements ul {
  list-style: disc;
  padding-left: 20px;
}

.actions {
  display: flex;
  justify-content: flex-end;
}

.actions a {
  margin-left: 10px;
}

.btn {
  padding: 10px 20px;
  border-radius: 4px;
}

.btn-primary {
  background-color: #428bca;
  color: #fff;
}

.btn-secondary {
  background-color: #ddd;
  border: 1px solid #ccc;
}
</style>

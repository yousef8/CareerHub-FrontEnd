<template>
    <div v-if="loading" class="text-center fs-4 fw-bold text-primary">Loading...</div>
    <div v-else-if="error" class="text-center fs-4 fw-bold text-danger">Error loading job</div>
    <div v-else>
      <!-- Loop over jobs -->
      <div v-for="(job, index) in jobs" :key="index" class="job-details-container">
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
            <!-- Split requirements by new line and loop over them -->
            <li v-for="requirement in job.requirements.split('\n')" :key="requirement">
              {{ requirement.trim() }}
            </li>
          </ul>
        </div>
        <div class="actions mt-5">
            <button class="btn btn-success"><i class="fas fa-check"></i> Approve</button>
            <button class="btn btn-danger"><i class="fas fa-times"></i> Reject</button>
        </div>
      </div>
      <!-- End loop -->
    </div>
  </template>
  
  <script lang="ts">
  export default {
    data() {
      return {
        jobs: [
          {
            title: 'hamda',
            city: 'dr/boob',
            country: 'monaa',
            min_exp_years: 0,
            max_exp_years: 0,
            type: '',
            remote_type: 'fatmaaa',
            description: `fatmaa`,
            requirements: `monaaa`
          },
          {
            title: 'hamda',
            city: 'dr/boob',
            country: 'monaa',
            min_exp_years: 0,
            max_exp_years: 0,
            type: '',
            remote_type: 'fatmaaa',
            description: `fatmaa`,
            requirements: `monaaa`
          },
          {
            title: 'hamda',
            city: 'dr/boob',
            country: 'monaa',
            min_exp_years: 0,
            max_exp_years: 0,
            type: '',
            remote_type: 'fatmaaa',
            description: `fatmaa`,
            requirements: `monaaa`
          }
        ],
        loading: false,
        error: false
      }
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
  </style>
  
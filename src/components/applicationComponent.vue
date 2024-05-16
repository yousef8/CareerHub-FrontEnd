<template>
  <div class="mb-5 border border-3 p-4 border-secondary rounded">
    <h2 class="text-center">Applications</h2>
    <div v-if="applications.length === 0" class="text-center">No applications found.</div>
    <div v-else>
      <div v-for="(application, index) in applications" :key="index" class="card mb-3" :style="{ backgroundColor: getStatusColor(application.status) }">
        <div class="card-body">
          <h5 class="card-title">Application ID: {{ application.id }}</h5>
          <p class="card-text" >Status: {{ application.status }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      applications: []
    };
  },
  created() {
    const accessToken = localStorage.getItem('token');

    if (accessToken) {
      axios.get('http://localhost:8000/api/applications/', {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      })
      .then(response => {
        this.applications = response.data;
      })
      .catch(error => {
        console.error('Error fetching applications:', error);
      });
    }
  },

  methods: {
  getStatusColor(status) {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'yellow';
      case 'accepted':
        return 'green';
      case 'rejected':
        return 'red';
      default:
        return 'white'; 
    }
  }
}

};
</script>

<style>
/* You can add custom styles here if needed */
</style>

<template>
  <div class="mb-5 border border-3 p-4 border-secondary rounded">
    <h2 class="text-center mb-4">Your Applications</h2>
    <div v-if="applications.length === 0" class="text-center">No applications found.</div>
    <div v-else>
      <div v-for="(application, index) in applications" :key="index" class="card mb-3" :style="{ color: getStatusColor(application.status) }">
        <div class="card-body">
          <h5 class="card-title">Application ID: {{ application.id }}</h5>
          <p class="card-text">Status: {{ application.status }}</p>
          <button @click="cancelApplication(application.id)" class="btn btn-danger">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      applications: []
    };
  },
  created() {
    this.fetchApplications();
  },
  methods: {
    fetchApplications() {
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
          toast.error(errorMessage)
        });
      }
    },
    getStatusColor(status) {
      switch (status.toLowerCase()) {
        case 'pending':
          return 'orange';
        case 'accepted':
          return 'green';
        case 'rejected':
          return 'red';
        default:
          return 'white'; 
      }
    },
    cancelApplication(applicationId) {
      const accessToken = localStorage.getItem('token');

      if (accessToken) {
        axios.delete(`http://localhost:8000/api/applications/${applicationId}`, {
          headers: {
            Authorization: `Bearer ${accessToken}`
          }
        })
        .then(() => {
          this.applications = this.applications.filter(app => app.id !== applicationId);
          toast.success('Application Deleted Successfully')
        })
        .catch(error => {
          console.error('Error cancelling application:', error);
          toast.error('Error cancelling application: ' + error);
        });
      }
    }
  }
}
</script>

<style>

</style>

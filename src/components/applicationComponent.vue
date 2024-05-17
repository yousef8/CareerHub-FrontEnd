<template>
  <div class="mb-5 border border-3 p-4 border-secondary rounded">
    <h2 class="text-center mb-4 fw-bold">Your Applications</h2>
    <div v-if="applications.length === 0" class="text-center">No applications found.</div>
    <div v-else>
      <div v-for="(application, index) in applications" :key="index" class="card mb-3">
        <div class="card-body">
          <h5 class="card-title">
            <span class="text-primary">Application ID: </span> {{ application.id }}
          </h5>
          <div class="row justify-content-center align-items-center">
            <div class="col-auto">
              <p class="card-text fs-5 fw-bold">
                <span class="text-primary">Job Title: </span> {{ application.job_post.title }}
              </p>
            </div>
            <div class="col-auto">
              <router-link :to="`/jobs/${application.job_post.id}`" class="btn btn-primary"
                ><i class="fas fa-eye"></i
              ></router-link>
            </div>
          </div>

          <p class="card-text fs-5 fw-bold" :style="{ color: getStatusColor(application.status) }">
            <span class="text-primary">Status: </span> {{ application.status }}
          </p>

          <button @click="cancelApplication(application.id)" class="btn btn-danger">
            <i class="fas fa-trash"></i> Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      applications: []
    }
  },
  created() {
    this.fetchApplications()
  },
  methods: {
    fetchApplications() {
      const accessToken = localStorage.getItem('token')

      if (accessToken) {
        axios
          .get(`${import.meta.env.VITE_API_URL}/candidate/applications`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then((response) => {
            this.applications = response.data
          })
          .catch((error) => {
            console.error('Error fetching applications:', error)
            toast.error('Error fetching applications: ' + error)
          })
      }
    },
    getStatusColor(status) {
      switch (status.toLowerCase()) {
        case 'pending':
          return 'orange'
        case 'accepted':
          return 'green'
        case 'rejected':
          return 'red'
        default:
          return 'white'
      }
    },
    cancelApplication(applicationId) {
      const accessToken = localStorage.getItem('token')

      if (accessToken) {
        axios
          .delete(`${import.meta.env.VITE_API_URL}/applications/${applicationId}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          })
          .then(() => {
            this.applications = this.applications.filter((app) => app.id !== applicationId)
            toast.success('Application Deleted Successfully')
          })
          .catch((error) => {
            console.error('Error cancelling application:', error)
            toast.error('Error cancelling application: ' + error)
          })
      }
    }
  }
}
</script>

<style></style>

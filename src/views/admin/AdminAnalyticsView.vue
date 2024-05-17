<template>
  <div class="container mt-4">
    <div v-if="loading" class="d-flex justify-content-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div v-else class="row">
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-card-list display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Total Job Posts</h5>
                <p class="card-text display-6">{{ analytics.total_job_posts_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-hourglass-split display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Pending Job Posts</h5>
                <p class="card-text display-6">{{ analytics.pending_job_posts_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-x-circle display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Rejected Job Posts</h5>
                <p class="card-text display-6">{{ analytics.rejected_job_posts_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-check-circle display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Approved Job Posts</h5>
                <p class="card-text display-6">{{ analytics.approved_job_posts_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-people display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Total Users</h5>
                <p class="card-text display-6">{{ analytics.total_users_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-building display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Employers</h5>
                <p class="card-text display-6">{{ analytics.employers_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-person-badge display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Candidates</h5>
                <p class="card-text display-6">{{ analytics.candidates_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-person-bounding-box display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Admins</h5>
                <p class="card-text display-6">{{ analytics.admins_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-6 col-lg-4 mb-4">
        <div class="card h-100 shadow-sm">
          <div class="card-body">
            <div class="d-flex align-items-center">
              <i class="bi bi-file-earmark-text display-4 me-3 text-primary"></i>
              <div>
                <h5 class="card-title">Total Applications</h5>
                <p class="card-text display-6">{{ analytics.total_applications_count }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/utilities/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      analytics: {
        total_job_posts_count: 0,
        pending_job_posts_count: 0,
        rejected_job_posts_count: 0,
        approved_job_posts_count: 0,
        total_users_count: 0,
        employers_count: 0,
        candidates_count: 0,
        admins_count: 0,
        total_applications_count: 0
      },
      loading: true
    }
  },
  methods: {
    async fetchAnalytics() {
      try {
        const response = await api.get('/analytics')
        this.analytics = response.data
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else if (error.message) {
          toast.error(error.message)
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    }
  },
  created() {
    this.fetchAnalytics()
  }
}
</script>

<style scoped>
.container {
  max-width: 1200px;
}
.card {
  transition: transform 0.3s;
}
.card:hover {
  transform: scale(1.05);
}
</style>

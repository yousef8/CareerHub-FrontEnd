<template>
  <div class="application-container">
    <h2 class="fw-bold text-primary mb-4">Candidate Applications</h2>
    <div v-if="applications.length === 0" class="no-applications">No applications found.</div>
    <div v-else>
      <div v-for="application in applications" :key="application.id">
        <div v-if="application.status === 'pending'" class="application-card card-body">
          <h5 class="card-title">Application {{ application.id }}</h5>
          <p class="card-text my-3"><span class="text-secondary fw-semibold">Job Title:</span> {{
            application.job_post.title }}</p>
          <p class="card-text"><span class="text-secondary fw-semibold">Applicant Name:</span> {{
            application.applicant.name }}</p>
          <p class="card-text"><span class="text-secondary fw-semibold">Email:</span> {{ application.applicant.email }}
          </p>
          <p class="card-text"><span class="text-secondary fw-semibold">Phone Number:</span> {{
            application.applicant.phone_number }}</p>
          <div class="action-buttons">
            <button v-if="application.resume_path" class="btn btn-primary"
              @click="viewResume(application.resume_path)"><i class="fas fa-eye"></i> View CV</button>
            <button class="btn btn-success" @click="handleApprove(application.id)"><i class="fas fa-check"></i>
              Approve</button>
            <button class="btn btn-danger" @click="handleReject(application.id)"><i class="fas fa-times"></i>
              Reject</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utilities/axios'
import { toast } from 'vue3-toastify'

export default {
  data() {
    return {
      applications: []
    }
  },
  mounted() {
    this.fetchApplications()
  },
  methods: {
    async fetchApplications() {
      try {
        const response = await api.get(`/employer/applications`)
        this.applications = response.data
      } catch (error) {
        toast.error('Failed to show jobs. Please try again later.')
      }
    },
    async handleApprove(applicationId) {
      try {
        await api.put(`/applications/${applicationId}/approve`);
        this.updateApplicationStatus(applicationId, 'accepted');
        toast.success(`Application number ${applicationId} is approved`);
      } catch (error) {
        toast.error('Failed to approve application. Please try again later.');
      }
    },
    async handleReject(applicationId) {
      try {
        await api.put(`/applications/${applicationId}/reject`);
        this.updateApplicationStatus(applicationId, 'rejected');
        toast.success(`Application number ${applicationId} is rejected`);
      } catch (error) {
        toast.error('Failed to reject application. Please try again later.');
      }
    },
    updateApplicationStatus(applicationId, newStatus) {
      const application = this.applications.find(app => app.id === applicationId)
      if (application) {
        application.status = newStatus
      }
    },
    viewResume(resumeUrl) {
      window.location.href = resumeUrl
    }
  }
}
</script>

<style>
.application-container {
  padding: 2rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  margin-bottom: 2rem;
}

.no-applications {
  text-align: center;
  color: #ccc;
  font-style: italic;
}

.application-card {
  background-color: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  margin-bottom: 1rem;
  padding: 1rem 0.7rem;
}

.card-title {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.card-text {
  margin-bottom: 0.5rem;
}

.action-buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.btn {
  margin: 0.5rem;
}

@media (max-width: 576px) {
  .application-container {
    padding: 2rem 0.5rem;
  }
}
</style>

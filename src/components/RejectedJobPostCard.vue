<template>
  <div v-if="jobPost" class="card mb-3">
    <div class="card-body d-flex align-items-start">
      <img
        :src="jobPost.employer.profile_image || undefined"
        class="rounded-circle me-3"
        alt="Profile Image"
        width="50"
        height="50"
      />
      <div>
        <h5 class="card-title">{{ jobPost.title }}</h5>
        <h6 class="card-subtitle mb-2 text-muted">
          {{ jobPost.employer.name }}
          <i class="bi bi-geo-alt-fill"></i> {{ jobPost.city }}, {{ jobPost.country }}
        </h6>
        <p class="badge bg-info text-dark">{{ jobPost.experience_level }}</p>
        <p class="badge bg-primary">{{ jobPost.type }}</p>
        <p class="badge bg-secondary">{{ jobPost.remote_type }}</p>
        <p class="card-text"><strong>Description:</strong> {{ jobPost.description }}</p>
        <p class="card-text"><strong>Requirements:</strong> {{ jobPost.requirements }}</p>
        <p class="card-text">
          <small
            >Salary:
            <span class="text-dark"
              >{{ formatSalary(jobPost.min_salary) }} - {{ formatSalary(jobPost.max_salary) }}</span
            ></small
          >
        </p>
        <p class="card-text">
          <small
            >Experience:
            <span class="text-dark"
              >{{ jobPost.min_exp_years }} - {{ jobPost.max_exp_years }} years</span
            ></small
          >
        </p>
        <p class="card-text">
          <small
            >Expires at:
            <span class="text-dark">{{ formatDateTime(jobPost.expires_at) }}</span></small
          >
        </p>
      </div>
    </div>
    <div class="card-footer d-flex justify-content-end">
      <button @click="approveJobPost" class="btn btn-success me-2">
        <i class="bi bi-check"></i> Approve
      </button>
      <button @click="setJobPostAsPending" class="btn btn-warning me-2">
        <i class="bi bi-check"></i> Mark As Pending
      </button>
    </div>
  </div>
  <div v-else class="card mb-3">
    <div class="card-body">
      <p class="card-text">Loading...</p>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useJobPostStore } from '@/stores/jobPostStore'
import type { JobPost } from '@/interfaces/JobPost'

export default defineComponent({
  props: {
    jobPostId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      jobPostStore: useJobPostStore()
    }
  },
  computed: {
    jobPost(): JobPost | undefined {
      return this.jobPostStore.getRejectedJobPostById(this.jobPostId)
    }
  },
  methods: {
    approveJobPost() {
      this.jobPostStore.approveJobPost(this.jobPostId)
    },
    setJobPostAsPending() {
      this.jobPostStore.setJobPostAsPending(this.jobPostId)
    },
    formatDateTime(dateTime: string): string {
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      }
      return new Date(dateTime).toLocaleDateString(undefined, options)
    },
    formatSalary(salary: number): string {
      return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(salary)
    }
  }
})
</script>

<style scoped>
.card-body img {
  max-width: 50px;
  max-height: 50px;
}

.card-footer button i {
  font-size: 1.25rem;
}

.badge {
  margin-right: 5px;
}

.card-text small .text-dark {
  font-weight: bold;
}

.card-subtitle i {
  margin-left: 10px;
}
</style>

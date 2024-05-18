<template>
  <div>
    <!-- Job Details -->
    <div v-if="loading" class="text-center fs-4 fw-bold text-primary">Loading...</div>
    <div v-else-if="error" class="text-center fs-4 fw-bold text-danger">Error loading job</div>
    <div v-else class="job-details-container">
      <div class="d-flex justify-content-baseline">
        <img
          v-if="user && user.cover_image"
          :src="user.cover_image"
          class="card-img-top rounded-2"
          style="width: 100px; margin: 10px 10px"
          alt="Cover Image"
        />
        <h1 class="heading mt-4">{{ job.title }}</h1>
      </div>
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
      <div class="actions mt-5">
        <!-- Apply Button with Spinner -->
        <button
          class="btn btn-primary"
          type="button"
          :disabled="!authStore.isCandidate || loading"
          @click.prevent="showApplyModal"
        >
          <span v-if="loading" class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
          <span v-if="loading" role="status">Applying...</span>
          <span v-else>Apply Now</span>
        </button>
        <a href="#" class="btn btn-secondary" @click="copyURL">Share job now</a>
      </div>
    </div>

    <!-- Apply Modal -->
    <div
      v-if="authStore.isLogged && authStore.user?.role !== 'employer'"
      class="modal fade"
      tabindex="-1"
      role="dialog"
      :class="{ show: showModal, 'd-block': showModal }"
    >
      <div class="modal-dialog shadow-lg" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title me-5">
              Apply for <span class="text-primary">{{ job.title }}</span> job
            </h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              @click="hideApplyModal"
            ></button>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="cv">Upload CV (Optional)</label>
              <input type="file" class="form-control-file" id="cv" @change="handleFileChange" />
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="hideApplyModal">Cancel</button>
            <!-- Apply Button with Spinner -->
            <button type="button" class="btn btn-primary" :disabled="loading" @click="applyForJob">
              <span v-if="loading" class="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
              <span v-if="loading" role="status">Applying...</span>
              <span v-else>Apply</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import api from '@/utilities/axios'
import { toast } from 'vue3-toastify'
import { useUserStore } from '@/stores/user'

export default {
  data() {
    return {
      job: {
        title: '',
        city: '',
        country: '',
        min_exp_years: 0,
        max_exp_years: 0,
        type: '',
        remote_type: '',
        description: '',
        requirements: ''
      },
      user: {},
      loading: false,
      error: false,
      showModal: false,
      resume_path: ''
    }
  },
  mounted() {
    this.fetchJob()
    this.fetchUser()
  },
  setup() {
    const authStore = useUserStore()
    return {
      authStore
    }
  },
  methods: {
    async fetchJob() {
      this.loading = true
      try {
        const response = await api.get(`/job-posts/${this.$route.params.id}`)
        this.job = response.data
        this.loading = false
      } catch (error) {
        console.error('Error fetching job:', error)
        this.error = true
        this.loading = false
      }
    },
    async fetchUser() {
      try {
        const response = await api.get(`/user`)
        this.user = response.data
      } catch (error) {
        console.error('Error fetching user data:', error)
      }
    },
    showApplyModal() {
      this.showModal = true
    },
    hideApplyModal() {
      this.showModal = false
      this.resume_path = null
    },
    handleFileChange(event) {
      this.resume_path = event.target.files[0]
    },
    async applyForJob() {
      try {
        this.loading = true
        const formData = new FormData()
        if (this.resume_path) {
          formData.append('resume_path', this.resume_path)
        }
        const response = await api.post(
          `/job-posts/${this.$route.params.id}/applications`,
          formData
        )
        console.log('Application posted successfully:', response.data)
        toast.success('Application posted successfully')
        this.hideApplyModal()
      } catch (error) {
        console.error('Error posting application:', error)
        toast.error('You have already applied for this job post: ' + error)
      } finally {
        this.loading = false
      }
    },
    copyURL() {
      var tempInput = document.createElement('input')
      tempInput.value = window.location.href
      document.body.appendChild(tempInput)

      tempInput.select()

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(tempInput.value).then(
          function () {
            toast.success('URL copied to clipboard')
            console.log('URL copied to clipboard')
          },
          function (err) {
            toast.error('Failed to copy URL to clipboard')
            console.error('Failed to copy URL to clipboard', err)
          }
        )
      } else {
        document.execCommand('copy')
        console.log('Copying text command was successful')
      }

      document.body.removeChild(tempInput)
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

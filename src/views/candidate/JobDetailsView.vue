<template>
  <div>
    <!-- Job Details -->
    <div v-if="loading" class="text-center fs-4 fw-bold text-primary">Loading...</div>
    <div v-else-if="error" class="text-center fs-4 fw-bold text-danger">Error loading job</div>
    <div v-else class="job-details-container">
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
      <div class="actions mt-5">
        <!-- Apply Button -->
        <a href="#" class="btn btn-primary" @click.prevent="showApplyModal">Apply Now</a>
        <a href="#" class="btn btn-secondary">Copy Job link</a>
      </div>
    </div>

    <!-- Apply Modal -->
    <div class="modal" :class="{ 'is-active': showModal }">
      <div class="modal-background" @click="hideApplyModal"></div>
      <div class="modal-content">
        <div class="box">
          <h2 class="title">Apply for {{ job.title }}</h2>
          <div class="field">
            <label class="label">Upload CV (Optional)</label>
            <div class="control">
              <input type="file" class="input" @change="handleFileChange">
            </div>
          </div>
          <div class="field">
            <button class="button is-primary" @click="applyForJob">Apply</button>
            <button class="button" @click="hideApplyModal">Cancel</button>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" aria-label="close" @click="hideApplyModal"></button>
    </div>
  </div>
</template>

<script>
import api from '@/utilities/axios';

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
      loading: false,
      error: false,
      showModal: false,
      cvFile: null
    };
  },
  mounted() {
    this.fetchJob();
  },
  methods: {
    async fetchJob() {
      this.loading = true;
      try {
        const response = await api.get(`/jobs/${this.$route.params.id}`);
        this.job = response.data;
        this.loading = false;
      } catch (error) {
        console.error('Error fetching job:', error);
        this.error = true;
        this.loading = false;
      }
    },
    showApplyModal() {
      this.showModal = true;
    },
    hideApplyModal() {
      this.showModal = false;
    },
    handleFileChange(event) {
      this.cvFile = event.target.files[0];
    },
    async applyForJob() {
  const formData = new FormData();
  if (this.cvFile) {
    formData.append('cv', this.cvFile);
  }
  try {
    const response = await api.post(`/job-posts/${this.$route.params.id}/applications`, formData);
    console.log('Application posted successfully:', response.data);
    
    this.hideApplyModal();
  } catch (error) {
    console.error('Error posting application:', error);
  }
},

  },
};
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

.modal {
  display: none;
}

.modal.is-active {
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-background {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
}

.modal-close {
  position: absolute;
  right: 20px;
  top: 20px;
  cursor: pointer;
  background-color: transparent;
  border: none;
}
</style>

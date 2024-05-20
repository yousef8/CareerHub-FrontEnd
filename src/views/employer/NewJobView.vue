<template>
  <div class="job-posting-container d-flex align-items-center">
    <div class="job-posting-form container p-3 text-dark bg-white">
      <h1 class="my-4 text-center fw-semibold">Post a New Job</h1>
      <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
        <div class="mb-3 w-75">
          <label for="title" class="form-label">Job Title</label>
          <input
            v-model="job.title"
            type="text"
            id="title"
            class="form-control"
            required
            placeholder="Job title"
          />
          <div v-if="!job.title && submitted" class="invalid-feedback">Job Title is required.</div>
        </div>
        <div class="mb-3 w-75">
          <label for="description" class="form-label">Job Description</label>
          <textarea
            v-model="job.description"
            id="description"
            rows="5"
            class="form-control"
            required
            placeholder="Job description ( ex: We are looking for a ... )"
          ></textarea>
          <div v-if="!job.description && submitted" class="invalid-feedback">
            Job description is required.
          </div>
        </div>
        <div class="mb-3 w-75">
          <label for="requirements" class="form-label">Job Requirements</label>
          <textarea
            v-model="job.requirements"
            id="requirements"
            rows="5"
            class="form-control"
            required
            placeholder="Job requirements ( ex: Must have a ... )"
          ></textarea>
          <div v-if="!job.requirements && submitted" class="invalid-feedback">
            Job requirmenets are required.
          </div>
        </div>
        <div class="mb-3 w-75">
          <label for="skills" class="form-label">Skills</label>
          <input
            v-model="job.skills"
            type="text"
            id="skills"
            class="form-control"
            placeholder="Enter required skills separated by , ( example: teamwork, fast-learning, etc...)"
          />
        </div>
        <div class="mb-3 w-75">
          <label for="industries" class="form-label">industry</label>
          <input
            v-model="job.industries"
            type="text"
            id="industries"
            class="form-control"
            placeholder="Enter Industry or more separated by , ( example: software,programming,... etc)"
          />
        </div>

        <div class="mb-3 w-75">
          <label for="experienceLevel" class="form-label">Experience Level</label>
          <select v-model="job.experience_level" id="experienceLevel" class="form-control" required>
            <option value="">Select Experience Level</option>
            <option value="entry_level">Entry Level</option>
            <option value="associate">Associate</option>
            <option value="director">Director</option>
            <option value="executive">Executive</option>
          </select>
          <div v-if="!job.experience_level && submitted" class="invalid-feedback">
            Experience level is required.
          </div>
        </div>

        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="minExpYears" class="form-label">Minimum Experience (Years)</label>
            <input
              v-model="job.min_exp_years"
              type="number"
              id="minExpYears"
              class="form-control"
              required
            />
          </div>
          <div style="width: 450px">
            <label for="maxExpYears" class="form-label">Maximum Experience (Years)</label>
            <input
              v-model="job.max_exp_years"
              type="number"
              id="maxExpYears"
              class="form-control"
              required
            />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="city" class="form-label">City</label>
            <input
              v-model="job.city"
              type="text"
              id="city"
              class="form-control"
              required
              placeholder='Enter city example "Cairo"'
            />
            <div v-if="!job.city && submitted" class="invalid-feedback">City is required.</div>
          </div>
          <div style="width: 450px">
            <label for="country" class="form-label">Country</label>
            <input
              v-model="job.country"
              type="text"
              id="country"
              class="form-control"
              required
              placeholder='Enter country example "Egypt"'
            />
            <div v-if="!job.country && submitted" class="invalid-feedback">
              Country is required.
            </div>
          </div>
        </div>

        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="minSalary" class="form-label">Minimum Salary</label>
            <input v-model="job.min_salary" type="number" id="minSalary" class="form-control" />
          </div>
          <div style="width: 450px">
            <label for="maxSalary" class="form-label">Maximum Salary</label>
            <input v-model="job.max_salary" type="number" id="maxSalary" class="form-control" />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="type" class="form-label">Job Type</label>
            <select v-model="job.type" id="type" class="form-control" required>
              <option value="">Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
            <div v-if="!job.type && submitted" class="invalid-feedback">Job type is required.</div>
          </div>

          <div style="width: 450px">
            <label for="remoteType" class="form-label">Remote Type</label>
            <select v-model="job.remote_type" id="remoteType" class="form-control" required>
              <option value="">Select Remote Type</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">Onsite</option>
            </select>
            <div v-if="!job.remote_type && submitted" class="invalid-feedback">
              Remote type is required.
            </div>
          </div>
          <div class="my-5" style="width: 450px">
            <button class="btn btn-primary px-5" @click="handleSubmit">Post Job</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import api from '@/utilities/axios'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

export default {
  data() {
    return {
      job: {
        title: '',
        description: '',
        requirements: '',
        city: '',
        country: '',
        min_salary: 0,
        max_salary: 100000,
        min_exp_years: 0,
        max_exp_years: 0,
        type: '',
        remote_type: '',
        skills: '',
        industries: '',
        experience_level: ''
      },
      submitted: false,
      requiredFields: [
        'title',
        'description',
        'requirements',
        'city',
        'country',
        'type',
        'remote_type',
        'experience_level'
      ],
      max_salary_error: false
    }
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      try {
        this.submitted = true

        const hasEmptyFields = this.requiredFields.some((field) => !this.job[field])

        if (hasEmptyFields) {
          toast.error('Please fill in all required fields.')
          return
        }

        if (this.job.max_salary < this.job.min_salary) {
          throw new Error('Max salary must be greater than min salary.')
        }

        if (this.job.max_exp_years < this.job.min_exp_years) {
          throw new Error('Max experience years must be greater than min experience years.')
        }

        if (this.job.min_exp_years < 0 || this.job.max_exp_years < 0) {
          throw new Error('Experience years must be greater than 0')
        }

        if (this.job.min_salary < 0 || this.job.max_salary < 0) {
          throw new Error('Salary must be greater than 0')
        }

        this.postJob(this.job)
      } catch (error) {
        toast.error(error.message || 'Failed to post')
      }
    },
    async postJob(job) {
      try {
        const response = await api.post('/job-posts', job)
        console.log('Job posted:', response.data)
        toast.success('Job posted successfully!')
        this.job = {
          title: '',
          description: '',
          requirements: '',
          city: '',
          country: '',
          min_salary: 0,
          max_salary: 0,
          min_exp_years: 0,
          max_exp_years: 0,
          type: '',
          remote_type: '',
          skills: '',
          industries: '',
          experience_level: ''
        }
        this.submitted = false
      } catch (error) {
        toast.error(error.message || 'Failed to post')
      }
    }
  }
}
</script>

<style scoped>
.job-posting-container {
  padding: 5rem;
  background-color: #ebebeb !important;
  background: radial-gradient(circle at 0px 0px, rgb(18, 70, 149), rgb(0, 112, 235)) 0px 0px / 100%
    460px no-repeat;
}

.job-posting-form {
  padding: 2rem;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.form-label {
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.mb-3 {
  margin-bottom: 1rem;
}

.form-control {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #ccc;
  border-radius: 3px;
}

.form-control:focus {
  outline: none;
  border-color: #8bd2f4;
}

.invalid-feedback {
  display: none;
  color: #dc3545;
  font-size: 0.8rem;
  margin-top: 0.25rem;
}

.form-control:invalid + .invalid-feedback {
  display: block;
}
</style>

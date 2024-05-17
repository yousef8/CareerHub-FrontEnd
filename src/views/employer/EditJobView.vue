<template>
  <div class="job-posting-container d-flex align-items-center">
    <div class="job-posting-form container p-3 text-dark bg-white">
      <h1 class="my-4 text-center fw-semibold">Edit Job post</h1>
      <form @submit.prevent="handleSubmit" class="d-flex flex-column align-items-center">
        <div class="mb-3 w-75">
          <label for="title" class="form-label">Job Title</label>
          <button class="edit-b" @click.prevent="toggleEdit('title')">Edit</button>
          <input
            v-model="job.title"
            type="text"
            id="title"
            class="form-control"
            :disabled="!this.activeFields.title"
          />
          <div v-if="!job.title && submitted" class="invalid-feedback">Job Title is required.</div>
        </div>

        <div class="mb-3 w-75">
          <label for="description" class="form-label">Job Description</label>
          <button class="edit-b" @click.prevent="toggleEdit('description')">Edit</button>
          <textarea
            v-model="job.description"
            id="description"
            rows="5"
            class="form-control"
            required
            :disabled="!this.activeFields.description"
          ></textarea>
          <div v-if="!job.description && submitted" class="invalid-feedback">
            Job description is required.
          </div>
        </div>
        <div class="mb-3 w-75">
          <label for="requirements" class="form-label">Job Requirements</label>
          <button class="edit-b" @click.prevent="toggleEdit('requirements')">Edit</button>
          <textarea
            v-model="job.requirements"
            id="requirements"
            rows="5"
            class="form-control"
            required
            :disabled="!this.activeFields.requirements"
          ></textarea>
          <div v-if="!job.requirements && submitted" class="invalid-feedback">
            Job requirmenets are required.
          </div>
        </div>
        <div class="mb-3 w-75">
          <label for="skills" class="form-label">Skills</label>
          <button class="edit-b" @click.prevent="toggleEdit('skills')">Edit</button>
          <input
            v-model="this.skillsString"
            type="text"
            id="skills"
            class="form-control"
            :disabled="!this.activeFields.skills"
          />
          <div v-if="!job.skills && submitted" class="invalid-feedback">Skills are required.</div>
        </div>
        <div class="mb-3 w-75">
          <label for="industry" class="form-label">Industry</label>
          <button class="edit-b" @click.prevent="toggleEdit('industry')">Edit</button>
          <input
            v-model="this.industriesString"
            type="text"
            id="industry"
            class="form-control"
            :disabled="!this.activeFields.industry"
            placeholder="e.g. Tech, Finance, Healthcare, etc."
          />
          <div v-if="!job.industry && submitted" class="invalid-feedback">
            Industry is required.
          </div>
        </div>

        <div class="mb-3 w-75">
          <label for="experienceLevel" class="form-label">Experience Level</label>
          <button class="edit-b" @click.prevent="toggleEdit('experience_level')">Edit</button>
          <select
            v-model="job.experience_level"
            id="experienceLevel"
            class="form-control"
            required
            :disabled="!this.activeFields.experience_level"
          >
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
            <button class="edit-b" @click.prevent="toggleEdit('min_exp_years')">Edit</button>
            <input
              v-model="job.min_exp_years"
              type="number"
              id="minExpYears"
              class="form-control"
              required
              :disabled="!this.activeFields.min_exp_years"
            />
          </div>
          <div style="width: 450px">
            <label for="maxExpYears" class="form-label">Maximum Experience (Years)</label>
            <button class="edit-b" @click.prevent="toggleEdit('max_exp_years')">Edit</button>
            <input
              v-model="job.max_exp_years"
              type="number"
              id="maxExpYears"
              class="form-control"
              required
              :disabled="!this.activeFields.max_exp_years"
            />
          </div>
        </div>

        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="city" class="form-label">City</label>
            <button class="edit-b" @click.prevent="toggleEdit('city')">Edit</button>
            <input
              v-model="job.city"
              type="text"
              id="city"
              class="form-control"
              required
              :disabled="!this.activeFields.city"
            />
            <div v-if="!job.city && submitted" class="invalid-feedback">City is required.</div>
          </div>
          <div style="width: 450px">
            <label for="country" class="form-label">Country</label>
            <button class="edit-b" @click.prevent="toggleEdit('country')">Edit</button>
            <input
              v-model="job.country"
              type="text"
              id="country"
              class="form-control"
              required
              :disabled="!this.activeFields.country"
            />
            <div v-if="!job.country && submitted" class="invalid-feedback">
              Country is required.
            </div>
          </div>
        </div>

        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="minSalary" class="form-label">Minimum Salary (Optional)</label>
            <button class="edit-b" @click.prevent="toggleEdit('min_salary')">Edit</button>
            <input
              v-model="job.min_salary"
              type="number"
              id="minSalary"
              class="form-control"
              :disabled="!this.activeFields.min_salary"
            />
          </div>
          <div style="width: 450px">
            <label for="maxSalary" class="form-label">Maximum Salary (Optional)</label>
            <button class="edit-b" @click.prevent="toggleEdit('max_salary')">Edit</button>
            <input
              v-model="job.max_salary"
              type="number"
              id="maxSalary"
              class="form-control"
              :disabled="!this.activeFields.max_salary"
            />
          </div>
        </div>
        <div class="mb-3 w-75 d-flex flex-wrap justify-content-between">
          <div style="width: 450px">
            <label for="type" class="form-label">Job Type</label>
            <button class="edit-b" @click.prevent="toggleEdit('type')">Edit</button>
            <select
              v-model="job.type"
              id="type"
              class="form-control"
              required
              :disabled="!this.activeFields.type"
            >
              <option value="">Select Job Type</option>
              <option value="full-time">Full Time</option>
              <option value="part-time">Part Time</option>
              <option value="contract">Contract</option>
            </select>
            <div v-if="!job.type && submitted" class="invalid-feedback">Job type is required.</div>
          </div>
          <div style="width: 450px">
            <label for="remoteType" class="form-label">Remote Type</label>
            <button class="edit-b" href="" @click.prevent="toggleEdit('remote_type')">Edit</button>
            <select
              v-model="job.remote_type"
              id="remoteType"
              class="form-control"
              required
              :disabled="!this.activeFields.remote_type"
            >
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-Site</option>
            </select>
            <div v-if="!job.remote_type && submitted" class="invalid-feedback">
              Remote type is required.
            </div>
          </div>
          <div class="my-5">
            <button class="btn btn-primary" @click="handleSubmit">Update</button>
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
      activeFields: {
        title: false,
        description: false,
        requirements: false,
        city: false,
        country: false,
        min_salary: false,
        max_salary: false,
        min_exp_years: false,
        max_exp_years: false,
        type: false,
        remote_type: false,
        skills: false,
        industries: false,
        experience_level: false
      },
      skillsString: '',
      industriesString: ''
    }
  },
  mounted() {
    this.getJob()
  },
  methods: {
    handleSubmit(event) {
      event.preventDefault()
      this.submitted = true

      // Will Send the job data to the server here
      this.postJob(this.job)

      const hasEmptyFields = this.requiredFields.some((field) => !this.job[field])
      const Emptyfields = this.requiredFields.find((field) => !this.job[field])
      if (hasEmptyFields) {
        toast.error('Please fill in all required fields.')
        toast.error(Emptyfields + ' is required')
        console.error('Please fill in all required fields.')
        return
      }

      console.log('Job submitted:', this.job)
      this.submitted = false
    },
    toggleEdit(field) {
      this.activeFields[field] = true
    },
    async postJob(job) {
      try {
        const id = this.$route.params.id
        job.skills = this.skillsString
        job.industries = this.industriesString

        const ignoredFields = [
          'id',
          'expires_at',
          'status',
          'user_id',
          'created_at',
          'updated_at',
          'applicants_count'
        ]

        for (const key of Object.keys(job)) {
          if (ignoredFields.includes(key)) {
            delete job[key]
          }
        }

        console.log('Job to be updated:', job)

        const response = await api.put(`/job-posts/${id}`, job)

        if (response.status === 200) {
          toast.success('Job updated successfully')
        } else {
          toast.error(response.data.message || 'Failed to post')
        }

        this.job = {
          title: '',
          description: '',
          requirements: '',
          city: '',
          country: '',
          min_salary: 0,
          max_salary: 10000,
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
    },
    async getJob() {
      try {
        const id = this.$route.params.id
        const response = await api.get(`/job-posts/${id}`)
        this.job = response.data
        this.extractSkillNames(this.job.skills)
        this.extractIndustryNames(this.job.industries)
        console.log('Job fetched:', this.job)
      } catch (error) {
        toast.error(error.message || 'Failed to fetch job')
      }
    },
    extractSkillNames(skillsObject) {
      this.skillsString = skillsObject.map((skill) => skill.name).join(', ')
    },
    extractIndustryNames(industriesObject) {
      this.industriesString = industriesObject.map((industry) => industry.name).join(', ')
    }
  }
}
</script>

<style scoped>
.job-posting-container {
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
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

.submit-b {
  margin: 30px;
  margin-left: 0;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #1c4dff;
  color: #fff;
  background-image: linear-gradient(to bottom, #607ffa, #082aea);
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

.edit-b {
  color: blue;
  text-decoration: none;
  cursor: pointer;
  background-color: transparent;
  border: none;
}

.edit-b:hover {
  text-decoration: underline;
}
</style>

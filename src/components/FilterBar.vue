<template>
  <div style="box-shadow: 0 4px 5px rgba(0, 0, 0, 0.2)">
    <div class="d-flex justify-content-center mx-auto gap-2 py-2" style="height: fit-content">
      <select
        v-model="filter.city"
        name="city"
        id="city"
        :class="{ 'active-drop-down': filter.city !== '', dropdown: filter.city === '' }"
      >
        <option value="">City</option>
        <option v-for="city in this.params.cities" :value="city" :key="city">
          {{ city }}
        </option>
      </select>

      <select
        v-model="filter.country"
        name="country"
        id="country"
        :class="{ 'active-drop-down': filter.country !== '', dropdown: filter.country === '' }"
      >
        <option value="">Country</option>
        <option v-for="country in this.params.countries" :value="country" :key="country">
          {{ country }}
        </option>
      </select>

      <select
        v-model="filter.experience_level"
        name="experience_level"
        id="experience_level"
        :class="{
          'active-drop-down': filter.experience_level !== '',
          dropdown: filter.experience_level === ''
        }"
      >
        <option value="">Experience level</option>
        <option value="entry_level">Entry Level</option>
        <option value="associate">Associate</option>
        <option value="mid-senior">Mid-Senior</option>
        <option value="director">Director</option>
        <option value="executive">Executive</option>
      </select>

      <select
        v-model="filter.min_salary"
        name="min_salary"
        id="min_salary"
        :class="{
          'active-drop-down': filter.min_salary !== '',
          dropdown: filter.min_salary === ''
        }"
      >
        <option value="">Min Salary</option>
        <option value="5000">$5,000</option>
        <option value="10000">$10,000</option>
        <option value="20000">$20,000</option>
        <option value="50000">$50,000</option>
      </select>

      <select
        v-model="filter.max_salary"
        name="max_salary"
        id="max_salary"
        :class="{
          'active-drop-down': filter.max_salary !== '',
          dropdown: filter.max_salary === ''
        }"
      >
        <option value="">Max Salary</option>
        <option value="50000">$50,000</option>
        <option value="60000">$60,000</option>
        <option value="70000">$70,000</option>
      </select>

      <select
        v-model="filter.skills"
        name="skills"
        id="skills"
        :class="{
          'active-drop-down': filter.skills !== '',
          dropdown: filter.skills === ''
        }"
      >
        <option value="">Skills</option>
        <option v-for="skill in this.params.skills" :value="skill" :key="skill">
          {{ skill }}
        </option>
      </select>

      <select
        v-model="filter.type"
        name="type"
        id="type"
        :class="{
          'active-drop-down': filter.type !== '',
          dropdown: filter.type === ''
        }"
      >
        <option value="">type</option>
        <option value="full-time">Full-time</option>
        <option value="part-time">Part-time</option>
        <option value="contract">Contract</option>
        <option value="freelance">reelance</option>
      </select>

      <select
        v-model="filter.remote_type"
        name="remote_type"
        id="remote_type"
        :class="{
          'active-drop-down': filter.remote_type !== '',
          dropdown: filter.remote_type === ''
        }"
      >
        <option value="">Remote type</option>
        <option value="remote">Remote</option>
        <option value="hybrid">Hybrid</option>
        <option value="onsite">On-site</option>
      </select>

      <select
        v-model="filter.industries"
        name="industries"
        id="industries"
        :class="{
          'active-drop-down': filter.industries !== '',
          dropdown: filter.industries === ''
        }"
      >
        <option value="">industry</option>
        <option v-for="industry in this.params.industries" :value="industry" :key="industry">
          {{ industry }}
        </option>
      </select>
      <button @click="applyFilter" class="btn btn-primary">Apply filters</button>
      <button @click="reset" class="btn reset-btn">Reset</button>
    </div>
  </div>
</template>

<script>
import api from '@/utilities/axios'

export default {
  name: 'FilterBar',
  data() {
    return {
      filter: {
        city: '',
        country: '',
        experience_level: '',
        min_salary: '',
        max_salary: '',
        posted_after: '',
        skills: '',
        industries: '',
        type: '',
        remote_type: ''
      },
      params: {}
    }
  },
  mounted() {
    this.getParamData()
  },
  methods: {
    reset() {
      this.filter.city = ''
      this.filter.country = ''
      this.filter.experience_level = ''
      this.filter.min_salary = ''
      this.filter.max_salary = ''
      this.filter.posted_after = ''
      this.filter.skills = ''
      this.filter.industries = ''
      this.filter.type = ''
      this.filter.remote_type = ''
      this.$emit('filter', this.filter)
    },
    applyFilter() {
      console.log('Filter applied', this.filter)
      this.$emit('filter', this.filter)
    },
    async getParamData() {
      const response = await api.get(`/params`)
      const data = await response.data
      this.params = data
      console.log('Params:', this.params)
    }
  }
}
</script>

<style scoped>
.dropdown {
  text-align: center;
  height: 40px;
  padding: 5px;
  border-radius: 30px;
  font-size: 0.8rem;
  transition: ease;
  max-width: 150px;
}

.dropdown:hover {
  cursor: pointer;
  background-color: #d8d8d8;
  border: 2px solid rgba(34, 34, 34, 0.4);
}

.active-drop-down {
  text-align: center;
  padding: 5px;
  border-radius: 30px;
  background-color: rgb(1, 119, 80);
  color: white;
  font-size: 0.8rem;
  font-weight: 500;
  outline: none;
}

.active-drop-down:hover {
  cursor: pointer;
  background-color: rgb(1, 91, 61);
  color: #ffffff;
}

.btn {
  padding: 5px;
  height: 40px;
  border-radius: 30px;
  font-size: 1rem;
}

.reset-btn:hover {
  background-color: #c3c3c3;
  color: #000;
  border: 1px solid #f8f9fa;
  font-weight: 500;
  outline: none;
}

@media (max-width: 768px) {
  .dropdown,
  .active-drop-down,
  .btn {
    font-size: 0.6rem;
  }
}

@media (max-width: 480px) {
  .dropdown,
  .active-drop-down,
  .btn {
    font-size: 0.4rem;
  }
}
</style>
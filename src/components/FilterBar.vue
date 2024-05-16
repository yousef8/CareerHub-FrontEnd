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
        <option value="new york">New York</option>
        <option value="san francisco">San Francisco</option>
        <option value="los angeles">Los Angeles</option>
      </select>

      <select
        v-model="filter.country"
        name="country"
        id="country"
        :class="{ 'active-drop-down': filter.country !== '', dropdown: filter.country === '' }"
      >
        <option value="">Country</option>
        <option value="usa">USA</option>
        <option value="canada">Canada</option>
        <option value="mexico">Mexico</option>
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
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
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
        <option value="50000">$50,000</option>
        <option value="60000">$60,000</option>
        <option value="70000">$70,000</option>
      </select>

      <!-- <select
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
      </select> -->

      <select
        v-model="filter.posted_after"
        name="posted_after"
        id="posted_after"
        :class="{
          'active-drop-down': filter.posted_after !== '',
          dropdown: filter.posted_after === ''
        }"
      >
        <option value="">Date Posted</option>
        <option value="1">1 day ago</option>
        <option value="3">3 days ago</option>
        <option value="7">7 days ago</option>
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
        <option value="javascript">JavaScript</option>
        <option value="python">Python</option>
        <option value="java">Java</option>
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
        <option value="on-site">On-site</option>
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
        <option value="software engineering">Software Engineering</option>
        <option value="data science">Data Science</option>
        <option value="web development">Web Development</option>
      </select>
      <button @click="applyFilter" class="btn btn-primary">Apply filters</button>
      <button @click="reset" class="btn reset-btn">Reset</button>
    </div>
  </div>
</template>

<script>
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
      }
    }
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
    },
    applyFilter() {
      console.log('Filter applied', this.filter)
      this.$emit('filter', this.filter)
    }
  }
}
</script>

<style scoped>
.dropdown {
  height: 40px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 5px 10px;
  border-radius: 30px;
  font-size: 16px;
  background-color: #ffffff;
}

.dropdown:hover {
  cursor: pointer;
  background-color: #f8f9fa;
}

.active-drop-down {
  height: 40px;
  border: 1px solid rgba(34, 34, 34, 0.5);
  padding: 5px 10px;
  border-radius: 30px;
  background-color: rgb(1, 119, 80);
  color: white;
  font-weight: 500;
  outline: none;
}
.active-drop-down:hover {
  cursor: pointer;
  background-color: rgb(1, 91, 61);
  color: #ffffff;
}

.btn {
  height: 40px;
  border-radius: 30px;
  font-size: 16px;
}

.reset-btn:hover {
  background-color: #c3c3c3;
  color: #000;
  border: 1px solid #f8f9fa;
  font-weight: 500;
  outline: none;
}
</style>

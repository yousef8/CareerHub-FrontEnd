<template>
  <div class="admin-dashboard">
    <h1 class="dashboard-title">Admin Analytics Dashboard</h1>
    <div class="stats-container">

      <div class="card jobs">
        <h2>Total Jobs</h2>
        <p class="stat-number">100</p>
      </div>

      <div class="card users">
        <h2>Total Users</h2>
        <p class="stat-number">500</p>
      </div>

      <div class="card employers">
        <h2>Total Employers</h2>
        <p class="stat-number">50</p>
      </div>

      <div class="card applications">
        <h2>Total Applications</h2>
        <p class="stat-number">1000</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {}
  },
  methods: {}
}
</script>

<style scoped>
.admin-dashboard {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.dashboard-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 20px;
  color: #333; 
  text-transform: uppercase; 
  text-align: center; 
}

.stats-container {
  display: flex;
  flex-wrap: wrap;
}

.card {
  flex: 1 0 calc(45% - 20px);
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  margin: 10px;
}

.card:hover {
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
  transform: translateY(-2px);
}

.card h2 {
  margin-bottom: 10px;
  color: #333;
}

.stat-number {
  font-size: 24px;
  font-weight: bold;
  color: #555;
}

.jobs {
  background-color: #4caf50;
}

.users {
  background-color: #2196f3;
}

.employers {
  background-color: #ff9800;
}

.applications {
  background-color: #f44336;
}

.card h2, .stat-number {
  color: #fff;
}
</style>

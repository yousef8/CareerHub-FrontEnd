<template>
  <div class="container-lg mb-4 mt-2 admin-view">
    <div>
      <ul class="nav nav-tabs mb-4">
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentView === 'AdminAnalyticsView' }"
            @click="currentView = 'AdminAnalyticsView'"
            href="#"
          >
            Analytics
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentView === 'PendingJobPostsView' }"
            @click="currentView = 'PendingJobPostsView'"
            href="#"
          >
            Pending Job Posts
          </a>
        </li>
        <li class="nav-item">
          <a
            class="nav-link"
            :class="{ active: currentView === 'RejectedJobPostsView' }"
            @click.prevent="currentView = 'RejectedJobPostsView'"
            href="#"
          >
            Rejected Job Posts
          </a>
        </li>
      </ul>
      <div class="tab-content-wrapper">
        <keep-alive>
          <component :is="currentView" />
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import AdminAnalyticsView from '@/views/admin/AdminAnalyticsView.vue'
import PendingJobPostsView from '@/views/admin/PendingJobPostsView.vue'
import RejectedJobPostsView from '@/views/admin/RejectedJobPostsView.vue'

export default {
  components: {
    AdminAnalyticsView,
    PendingJobPostsView,
    RejectedJobPostsView
  },
  data() {
    return {
      currentView: 'AdminAnalyticsView'
    }
  }
}
</script>

<style scoped>
.admin-view {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.nav-tabs {
  flex-shrink: 0;
}

.tab-content-wrapper {
  flex-grow: 1;
  overflow: auto;
}

.nav-tabs .nav-link:not(.active):hover {
  background-color: #f8f9fa !important;
  color: #0d6efd !important;
}
</style>

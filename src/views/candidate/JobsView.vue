<template>
  <div>
    <FilterBar @filter="recieveFilters" />
    <div class="container mt-4">
      <h2 class="text-center mb-4 fw-bold bg-body-secondary py-2">All Jobs</h2>
      <div v-if="loading" class="text-center fs-4 fw-bold text-primary">Loading...</div>
      <div v-else>
        <div v-if="jobs.length === 0" class="text-center">No jobs available</div>
        <div v-else>
          <JobCard v-for="(job, index) in visibleJobs" :key="index" :job="job" />
        </div>
        <PaginationComponent
          :current-page="currentPage"
          :total-pages="totalPages"
          :prev-page="prevPage"
          :next-page="nextPage"
          :goto-page="gotoPage"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import JobCard from '@/components/JobCard.vue'
import PaginationComponent from '@/components/PaginationComponent.vue'
import FilterBar from '@/components/FilterBar.vue'
import api from '@/utilities/axios'
import { useSearchStore } from '@/stores/search'
import { mapState } from 'pinia'
import { watch } from 'vue'

export default {
  components: {
    JobCard,
    PaginationComponent,
    FilterBar
  },
  data() {
    return {
      jobs: [],
      loading: false,
      currentPage: 1,
      pageSize: 4,
      filter: {},
      FilterQuery: ''
    }
  },
  computed: {
    visibleJobs() {
      const startIndex = (this.currentPage - 1) * this.pageSize
      const endIndex = startIndex + this.pageSize
      return this.jobs.slice(startIndex, endIndex)
    },
    totalPages() {
      return Math.ceil(this.jobs.length / this.pageSize)
    },
    ...mapState(useSearchStore, ['query'])
  },
  async created() {
    await this.fetchJobs()
    this.setupQueryWatcher()
  },
  methods: {
    async fetchJobs() {
      this.loading = true
      try {
        const response = await api.get(
          `/job-posts/search?keywords=${this.query}&${this.FilterQuery}`
        )
        const data = await response.data
        this.jobs = data
      } catch (error) {
        console.error('Error fetching jobs:', error)
      } finally {
        this.loading = false
      }
    },
    recieveFilters(filterFromChild: any) {
      this.FilterQuery = new URLSearchParams(filterFromChild).toString()
      this.fetchJobs()
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
      }
    },
    gotoPage(pageNumber: number) {
      this.currentPage = pageNumber
    },
    setupQueryWatcher() {
      const searchStore = useSearchStore()
      let timeoutId: number | undefined

      watch(
        () => searchStore.query,
        (newQuery) => {
          if (timeoutId !== undefined) {
            clearTimeout(timeoutId)
          }
          timeoutId = window.setTimeout(() => {
            searchStore.setSearchQuery(newQuery)
            this.fetchJobs()
          }, 1000)
        }
      )
    }
  }
}
</script>

<style>
.container {
  min-height: 1000px;
}
</style>

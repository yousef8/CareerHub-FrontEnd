import { defineStore } from 'pinia'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import api from '@/utilities/axios'
import type { JobPost } from '@/interfaces/JobPost'

interface State {
  pendingJobPosts: JobPost[]
  rejectedJobPosts: JobPost[]
  loading: boolean
}

export const useJobPostStore = defineStore('jobPostStore', {
  state: (): State => ({
    pendingJobPosts: [],
    rejectedJobPosts: [],
    loading: false
  }),
  getters: {
    getPendingJobPostById: (state) => (id: number) => {
      return state.pendingJobPosts.find((jobPost) => jobPost.id === id)
    },
    getRejectedJobPostById: (state) => (id: number) => {
      return state.rejectedJobPosts.find((jobPost) => jobPost.id === id)
    }
  },
  actions: {
    async fetchPendingJobPosts() {
      this.loading = true
      try {
        const response = await api.get('/job-posts/pending')
        const data: JobPost[] = response.data
        this.pendingJobPosts = data
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else if (error.message) {
          toast.error(error.message)
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async fetchRejectedJobPosts() {
      this.loading = true
      try {
        const response = await api.get('/job-posts/rejected')
        const data: JobPost[] = response.data
        this.rejectedJobPosts = data
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else if (error.message) {
          toast.error(error.message)
        }
        console.log(error)
      } finally {
        this.loading = false
      }
    },

    async approveJobPost(jobPostId: number) {
      try {
        await api.put(`/job-posts/${jobPostId}/approve`)
        toast.success('Approved')
        this.refresh()
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else if (error.message) {
          toast.error(error.message)
        }
        console.log(error)
      }
    },

    async setJobPostAsPending(jobPostId: number) {
      try {
        await api.put(`/job-posts/${jobPostId}/pend`)
        toast.warning('Marked As Pending')
        this.refresh()
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.data.message)
        } else if (error.message) {
          toast.error(error.message)
        }
        console.log(error)
      }
    },

    async rejectJobPost(jobPostId: number) {
      try {
        await api.put(`/job-posts/${jobPostId}/reject`)
        toast.info('Rejected')
        this.refresh()
      } catch (error: any) {
        if (error.response) {
          toast.error(error.response.message)
        } else {
          toast.error(error.message)
        }
      }
    },

    refresh() {
      this.fetchPendingJobPosts()
      this.fetchRejectedJobPosts()
    }
  }
})

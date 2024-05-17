import { defineStore } from 'pinia'

export const useSearchStore = defineStore('search', {
  state: () => ({
    query: '',
    searchQuery: ''
  }),
  actions: {
    setSearchQuery(value: string) {
      this.query = value
      this.searchQuery = value
    },
    clearSearchQuery() {
      this.query = ''
      this.searchQuery = ''
    }
  }
})
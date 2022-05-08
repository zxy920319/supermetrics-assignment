import { defineStore } from "pinia"
import { getAllPosts } from "@/client"

export const useAnalysisStore = defineStore("analysis", {
  state: () => {
    return { posts: null }
  },
  actions: {
    async fetchAllPosts(params) {
      if (!this.posts) this.posts = await getAllPosts(params)
    },
  },
})

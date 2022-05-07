import { defineStore } from "pinia"
import { getToken } from "@/client"

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { token: null }
  },
  actions: {
    async refreshToken() {
      this.token = await getToken()
    },
  },
})

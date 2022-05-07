import { defineStore } from "pinia"
import { getToken } from "@/client"

export const useAuthStore = defineStore("auth", {
  state: () => {
    return { token: null, timeStamp: null }
  },
  actions: {
    async refreshToken() {
      this.timeStamp = new Date().valueOf()
      this.token = await getToken()
    },
  },
})

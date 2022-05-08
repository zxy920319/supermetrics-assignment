import axios from "axios"
import { useAuthStore } from "@/stores/auth"

const client = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL })

const get = async (url, config) => {
  await checkToken()
  try {
    const response = await client.get(url, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const post = async (url, data, config, isGetToken = false) => {
  if (!isGetToken) await checkToken()
  try {
    const response = await client.post(url, data, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const getPaginated = async (url, config) => {
  await checkToken()
  let page = 1
  let result = []

  try {
    do {
      const params = { ...config, page }
      const response = await client.get(url, { params })
      page = response.data.data.page === page ? page + 1 : false

      if (page) result = result.concat(response.data.data.posts)
    } while (page)
  } catch (error) {
    throw new Error(error)
  }
  return result
}

const checkToken = async () => {
  const store = useAuthStore()
  const current = new Date().valueOf()
  if (current - store.timeStamp > 1000 * 60 * 60) {
    await store.refreshToken()
  }
}

export { get, post, getPaginated }

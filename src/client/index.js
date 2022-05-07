import axios from "axios"

const client = axios.create({ baseURL: import.meta.env.VITE_APP_API_URL })

const get = async (url, config) => {
  try {
    const response = await client.get(url, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const post = async (url, data, config) => {
  try {
    const response = await client.post(url, data, config)
    return response.data
  } catch (error) {
    throw new Error(error)
  }
}

const getToken = async () => {
  try {
    const { data } = await post("/register", {
      client_id: import.meta.env.VITE_CLIENT_ID,
      email: import.meta.env.VITE_EMAIL,
      name: import.meta.env.VITE_NAME,
    })
    const { sl_token } = data
    return sl_token
  } catch (error) {
    throw new Error(error)
  }
}

const getPosts = async (params) => {
  try {
    const { data } = await get("/posts", { params })
    const { posts } = data
    return posts
  } catch (error) {
    throw new Error(error)
  }
}

export { get, post, getToken, getPosts }

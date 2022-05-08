import { get, post, getPaginated } from "@/client"

const getToken = async () => {
  try {
    const { data } = await post(
      "/register",
      {
        client_id: import.meta.env.VITE_CLIENT_ID,
        email: import.meta.env.VITE_EMAIL,
        name: import.meta.env.VITE_NAME,
      },
      {},
      true
    )
    const { sl_token } = data
    return sl_token
  } catch (error) {
    console.log(error)
  }
}

const getPosts = async (params) => {
  try {
    const { data } = await get("/posts", { params })
    const { posts } = data
    return posts
  } catch (error) {
    console.log(error)
  }
}

const getAllPosts = async (params) => {
  try {
    const posts = await getPaginated("/posts", params)
    return posts
  } catch (error) {
    console.log(error)
  }
}

export { getToken, getPosts, getAllPosts }

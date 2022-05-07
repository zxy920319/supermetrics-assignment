<template>
  <DashboardContent>
    <div>
      <div v-show="loading" class="absolute bg-gray-400 bg-opacity-50">
        <ASpin :loading="loading"> </ASpin>
      </div>
      <div class="flex flex-wrap justify-start gap-6">
        <ACard v-for="user in usersInfo" :key="user" :title="user.name" hoverable class="user-card">
          <div>Total Number of Posts: {{ user.total }}</div>
          <div>Average number of characters of his/her posts: {{ user.averageLength }}</div>
          <div>
            The number of posts made every month:
            <ATag v-for="month in user.byMonth.keys()" :key="month">{{ `${month}: ${user.byMonth.get(month)} Posts` }}</ATag>
          </div>
          <div>Lonest Post: {{ user.longestPost.message }}</div>
        </ACard>
      </div>
    </div>
  </DashboardContent>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"
import { getAllPosts } from "@/client"
import DashboardContent from "@/components/DashboardContent.vue"
import { computed, onMounted, ref } from "@vue/runtime-core"
import dayjs from "dayjs"
import { Skeleton as ASpin, Card as ACard, Tag as ATag } from "ant-design-vue"
import "ant-design-vue/es/spin/style/css"
import "ant-design-vue/es/card/style/css"
import "ant-design-vue/es/tag/style/css"

const store = useAuthStore()
const posts = ref([])
const loading = ref(true)
const months = dayjs.months()

const users = computed(() => {
  const usersMap = new Map()
  posts.value.forEach((post) => {
    if (usersMap.has(post.from_id)) {
      const originPosts = usersMap.get(post.from_id)
      usersMap.set(post.from_id, originPosts.concat(post))
    } else {
      usersMap.set(post.from_id, [post])
    }
  })
  return usersMap
})

const calcAverageLength = (userPosts) => {
  return Math.round(
    userPosts.reduce((totalChar, currentPost) => {
      return totalChar + currentPost.message.length
    }, 0) / userPosts.length
  )
}

const calcMonthPosts = (userPosts) => {
  const byMonth = new Map()
  userPosts.forEach((post) => {
    const month = months[dayjs(post.created_time).month()]
    if (byMonth.has(month)) {
      const postCount = byMonth.get(month)
      byMonth.set(month, postCount + 1)
    } else {
      byMonth.set(month, 1)
    }
  })
  return byMonth
}

const calcLongestPost = (userPosts) => {
  return userPosts.reduce(
    (longestPost, currentPost) => {
      return longestPost.message.length < currentPost.message.length ? currentPost : longestPost
    },
    { message: "" }
  )
}

const usersInfo = computed(() => {
  const result = []
  if (!(users.value instanceof Map)) return []

  for (const [key, value] of users.value.entries()) {
    result.push({
      key,
      name: value[0].from_name,
      total: value.length,
      averageLength: calcAverageLength(value),
      byMonth: calcMonthPosts(value),
      longestPost: calcLongestPost(value),
    })
  }

  return result
})

onMounted(async () => {
  const params = {
    sl_token: store.token,
  }
  posts.value = await getAllPosts(params)
  loading.value = false
})
</script>

<style lang="scss" scoped>
.user-card {
  @apply w-64;
}
</style>

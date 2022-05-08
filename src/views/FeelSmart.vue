<template>
  <DashboardContent>
    <div>
      <div v-show="loading" class="absolute bg-gray-400 bg-opacity-50 w-full h-full top-0 left-0 z-10 flex items-center justify-center">
        <ASpin :loading="loading" tip="Loading..."> </ASpin>
      </div>
      <div class="flex flex-wrap justify-start gap-6">
        <ACard v-for="user in usersInfo" :key="user" hoverable class="user-card">
          <AComment class="bg-gray-50">
            <template #actions>
              <span key="comment-longest">Longest Post</span>
            </template>
            <template #author
              ><a>{{ user.longestPost.from_name }}</a></template
            >
            <template #content>
              <p>{{ user.longestPost.message }}</p>
            </template>
            <template #datetime>
              <ATooltip :title="formatDateTime(user.longestPost.created_time)">
                <span>{{ fromNow(user.longestPost.created_time) }}</span>
              </ATooltip>
            </template>
          </AComment>
          <template #cover>
            <div class="p-4">
              <ACardMeta :title="user.name">
                <template #avatar>
                  <AAvatar>{{ user.name.charAt(0) }}</AAvatar>
                </template>
                <template #description>
                  <div class="flex justify-around mt-2">
                    <AStatistic title="Total Post" :value="user.total"></AStatistic>
                    <AStatistic title="Average Characters" :value="user.averageLength"></AStatistic>
                  </div>
                </template>
              </ACardMeta>
              <div class="flex justify-center mt-8">
                <BarChart :items="user.byMonth" />
              </div>
            </div>
          </template>
        </ACard>
      </div>
    </div>
  </DashboardContent>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"
import { useAnalysisStore } from "@/stores/analysis"
import DashboardContent from "@/components/DashboardContent.vue"
import BarChart from "@/components/BarChart.vue"
import { computed, inject, onMounted, ref } from "@vue/runtime-core"
import dayjs from "dayjs"

import {
  Spin as ASpin,
  Card as ACard,
  Comment as AComment,
  Avatar as AAvatar,
  Statistic as AStatistic,
  Tooltip as ATooltip,
} from "ant-design-vue"
import "ant-design-vue/es/spin/style/css"
import "ant-design-vue/es/card/style/css"
import "ant-design-vue/es/comment/style/css"
import "ant-design-vue/es/avatar/style/css"
import "ant-design-vue/es/statistic/style/css"
import "ant-design-vue/es/tooltip/style/css"
const { Meta } = ACard
const ACardMeta = Meta

const authStore = useAuthStore()
const analysisStore = useAnalysisStore()
const loading = ref(true)
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
const formatDateTime = inject("formatDateTime")

const users = computed(() => {
  const usersMap = new Map()
  if (!analysisStore.posts) return usersMap
  analysisStore.posts.forEach((post) => {
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
  return Array.from(byMonth, function (item) {
    return { month: item[0], posts: item[1] }
  }).reverse()
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

const fromNow = (time) => {
  return dayjs(time).fromNow()
}

onMounted(async () => {
  const params = {
    sl_token: authStore.token,
  }
  await analysisStore.fetchAllPosts(params)
  loading.value = false
})
</script>

<style lang="scss" scoped>
.user-card {
  @apply w-full md:w-96;
}
</style>

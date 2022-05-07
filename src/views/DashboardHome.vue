<template>
  <div class="min-h-screen bg-gray-200 pb-20">
    <div class="bg-[#03A9F4] px-3 md:px-8 h-56" />

    <div class="px-20 -mt-24">
      <div class="container mx-auto max-w-full">
        <div class="min-h-screen bg-white rounded-xl shadow-md p-4">
          <ATable :data-source="posts" :columns="columns" :pagination="pagination" :loading="loading" @change="handleChange">
            <template #bodyCell="{ column, record }">
              <template v-if="column.key === 'created_time'">
                {{ formatDateTime(record.created_time) }}
              </template>
            </template>
          </ATable>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"
import { getPosts } from "@/client"
import { reactive, ref } from "@vue/reactivity"
import { inject, onMounted } from "@vue/runtime-core"
import { Table as ATable } from "ant-design-vue"
import "ant-design-vue/es/table/style/css"

const formatDateTime = inject("formatDateTime")
const store = useAuthStore()
const posts = ref([])
const loading = ref(true)
const pagination = reactive({
  current: 1,
  showSizeChanger: false,
  showLessItems: true,
  pageSize: 10,
})
const columns = [
  { title: "Name", dataIndex: "from_name", key: "name", width: 150 },
  { title: "Comment", dataIndex: "message", key: "message" },
  { title: "Commented on", dataIndex: "created_time", key: "created_time", width: 200, fixed: "right" },
]

const fetchPosts = async (page) => {
  const data = {
    sl_token: store.token,
    page,
  }
  const response = await getPosts(data)
  return response
}

const handleChange = async ({ current }) => {
  if (current !== pagination.current) {
    pagination.current = current
    posts.value = await fetchPosts(current)
  }
}

onMounted(async () => {
  posts.value = await fetchPosts(pagination.current)
  loading.value = false
})
</script>

<style lang="scss" scoped></style>

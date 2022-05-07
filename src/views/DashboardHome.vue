<template>
  <div class="min-h-screen bg-gray-200 pb-20">
    <div class="bg-[#03A9F4] px-3 md:px-8 h-56" />

    <div class="px-20 -mt-24">
      <div class="container mx-auto max-w-full">
        <div class="min-h-screen bg-white rounded-xl shadow-md"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from "@/stores/auth"
import { getPosts } from "@/client"
import { ref } from "@vue/reactivity"
import { onMounted } from "@vue/runtime-core"
const store = useAuthStore()
const page = ref(1)

const fetchPosts = async (page) => {
  const data = {
    sl_token: store.token,
    page,
  }
  const response = await getPosts(data)
  return response
}

onMounted(() => {
  fetchPosts(page.value)
})
</script>

<style lang="scss" scoped></style>

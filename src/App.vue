<script setup>
import SideBar from "@/components/SideBar.vue"
</script>

<template>
  <div>
    <SideBar />
    <div class="md:ml-64">
      <router-view></router-view>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>

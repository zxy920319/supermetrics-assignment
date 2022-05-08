<template>
  <div ref="chart"></div>
</template>

<script setup>
import { Chart } from "@antv/g2"
import { ref, onMounted, nextTick } from "vue"

const props = defineProps({ items: { type: Array, required: true } })
const chart = ref(null)

onMounted(() => {
  nextTick(() => {
    const barChart = new Chart({
      container: chart.value,
      width: 300,
      height: 150,
    })
    barChart.data(props.items)

    barChart.interval().position("month*posts")

    barChart.render()
  })
})
</script>

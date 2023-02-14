<script lang="ts" setup>
import { colors, directoryMapping } from '@/utils/constants'
const route = useRoute()
const currentPath = route.path.slice(1)
const child = directoryMapping[currentPath].child
</script>
<template>
  <section
    class="w-full p-4 w-full grid grid-cols-2 auto-rows-100px md:grid-cols-4 gap-6 md:gap-8"
  >
    <a
      v-for="(item, idx) in child"
      :key="idx"
      :href="item.path"
      class="bg-opacity-80 hover:text-white hover:bg-opacity-100 rounded-2xl flex justify-center items-center"
      :class="[`bg-${colors[idx % colors.length]}`]"
    >
      <div class="w-full h-full flex flex-col justify-around px-5 py-1">
        <div class="text-2xl font-700 truncate">
          {{ item.name }}
        </div>
        <div class="text-12px color-light">{{ item.time }}</div>
      </div>
    </a>
  </section>
</template>

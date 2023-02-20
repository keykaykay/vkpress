<script lang="ts" setup>
import { type IMappingChild, colors } from '@/utils/constants'
interface IGuard {
  child: IMappingChild[]
}
defineProps<IGuard>()
</script>
<template>
  <section
    class="w-full p-4 w-full grid grid-cols-2 auto-rows-100px md:grid-cols-4 gap-6 md:gap-8"
  >
    <router-link
      v-for="(item, idx) in child"
      :key="idx"
      :to="item.path"
      class="bg-opacity-60 text-gray-600 dark:text-gray-200 rounded-2xl flex justify-center items-center"
      :class="[`bg-${colors[idx % colors.length]}`]"
    >
      <div class="w-full h-full flex flex-col justify-around p-1 md:px-5">
        <div class="h-3 flex items-center justify-between">
          <div class="flex justify-between w-12">
            <div class="bg-red-400 w-3 h-3 rounded-full"></div>
            <div class="bg-yellow-400 w-3 h-3 rounded-full"></div>
            <div class="bg-green-400 w-3 h-3 rounded-full"></div>
          </div>
        </div>
        <div class="text-lg leading-5 font-800 moreLineTruncate">
          {{ item.name }}
        </div>
        <div class="text-sm">
          {{ item.time }}
        </div>
      </div>
    </router-link>
  </section>
</template>
<style scoped>
.moreLineTruncate {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}
</style>

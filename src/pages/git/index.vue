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
        <div class="h-8 flex items-center justify-between">
          <div class="flex justify-between w-12">
            <div class="bg-red-400 w-3 h-3 rounded-full"></div>
            <div class="bg-yellow-400 w-3 h-3 rounded-full"></div>
            <div class="bg-green-400 w-3 h-3 rounded-full"></div>
          </div>
          <div
            class="flex-1 pl-5 text-right text-gray-100 dark:text-yellow-50 font-800 truncate"
          >
            {{ item.name }}
          </div>
        </div>
        <div class="text-gray-100 dark:text-yellow-50 text-sm truncate">
          这里是内容
        </div>
        <div class="text-gray-100 dark:text-yellow-50 text-sm color-light">
          {{ item.time }}
        </div>
      </div>
    </a>
  </section>
</template>

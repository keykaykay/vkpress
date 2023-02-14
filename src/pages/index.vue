<script lang="ts" setup>
import { colors, directoryMapping } from '@/utils/constants'
</script>
<template>
  <section
    class="w-full p-4 w-full grid grid-cols-2 auto-rows-100px md:grid-cols-4 gap-6 md:gap-8"
  >
    <router-link
      v-for="(key, idx) in Object.keys(directoryMapping)"
      :key="idx"
      :to="directoryMapping[key]['path']"
      class="bg-opacity-80 hover:text-white hover:bg-opacity-100 rounded-2xl flex justify-center items-center"
      :class="[`bg-${colors[idx % colors.length]}`]"
    >
      <div class="text-xl font-700 truncate">
        {{ directoryMapping[key]['name'] }}
      </div>
    </router-link>
  </section>
</template>

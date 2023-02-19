<script lang="ts" setup>
import { useCodeCopy } from '@/hooks/useCodeCopy'
import { useLinkAnchor } from '@/hooks/useLinkAnchor'
import { directoryMapping } from '@/utils/constants'
import type { IMappingChild } from '@/utils/constants'

const darkRef = useDark()
const navCtrls = ref([
  {
    icon: 'ic:round-search',
    title: '',
    event: (idx: number) => {
      alert('这里是搜索啊')
    }
  },
  {
    icon: '',
    title: 'Github',
    event: (idx: number) => {
      window.open('https://www.github.com/zkmefun', '_blank')
    }
  },
  {
    icon: 'ic:outline-dark-mode',
    selected_icon: 'ic:outline-light-mode',
    title: '',
    event: (idx: number) => {
      darkRef.value = !darkRef.value
      navCtrls.value[idx].icon = darkRef.value
        ? 'ic:outline-light-mode'
        : 'ic:outline-dark-mode'
    }
  }
])

let allArticles: IMappingChild[] = []
Object.keys(directoryMapping).forEach((key) => {
  allArticles = [...allArticles, ...directoryMapping[key].child]
})

useCodeCopy()
useLinkAnchor()
</script>
<template>
  <div
    class="h-full bg-opacity-0 mx-auto flex flex-col items-center relative z-1"
  >
    <div
      class="bg-gray-100 dark:bg-gray-800 w-full h-16 flex justify-between items-center flex-shrink-0"
    >
      <a href="/" class="p-4 flex items-center cursor-pointer">
        <img src="/vite.svg" width="30" alt="logo" />
        <h2
          class="text-2xl ml-2 bg-gradient-to-r from-#4facfe to-#00f2fe text-transparent bg-clip-text"
        >
          Box
        </h2>
      </a>
      <ul class="p-4 flex justify-between">
        <li
          class="mx-3 flex justify-center items-center"
          v-for="(ctrl, idx) in navCtrls"
          :key="ctrl.title"
        >
          <div class="cursor-pointer" @click="ctrl.event(idx)">
            <div v-if="ctrl.title">{{ ctrl.title }}</div>
            <div v-else :class="[`i-${ctrl.icon}`, 'text-xl']"></div>
          </div>
        </li>
      </ul>
    </div>
    <div class="flex-1 w-full content">
      <router-view class="mx-auto h-full max-w-1200px p-4" />
    </div>
    <div class="h-2 w-full"></div>
  </div>
  <div class="area">
    <ul class="circles">
      <li
        v-for="idx in 10"
        :key="idx"
        class="bg-gray-200 dark:bg-gray-800"
      ></li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
.area {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.circles {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;

  & li {
    position: absolute;
    display: block;
    list-style: none;
    width: 20px;
    height: 20px;
    animation: animate 25s linear infinite;
    bottom: -150px;
  }
  $itemWidths: '80px', '20px', '20px', '60px', '20px', '100px', '150px', '25px',
    '15px', '150px';
  $itemDelays: '0s', '2s', '4s', '0s', '0s', '3s', '7s', '15s', '2s', '0s';
  $itemDurations: '0s', '12s', '0s', '18s', '0s', '0s', '0s', '45s', '35s',
    '11s';
  @for $i from 1 through 10 {
    $width: nth($itemWidths, $i);
    $delay: nth($itemDelays, $i);
    $duration: nth($itemDurations, $i);
    & li:nth-child(#{$i}) {
      left: percentage(random());
      width: #{$width};
      height: #{$width};
      animation-delay: #{$delay};
      animation-duration: #{$duration};
    }
  }

  @keyframes animate {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
      border-radius: 0;
    }

    100% {
      transform: translateY(-1000px) rotate(720deg);
      opacity: 0;
      border-radius: 50%;
    }
  }
}
</style>

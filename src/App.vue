<script lang="ts" setup>
import { useCodeCopy } from '@/hooks/useCodeCopy'
import { directoryMapping } from '@/utils/constants'
import type { IMappingChild } from '@/utils/constants'

const route = useRoute()
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
Object.keys(directoryMapping).map((key) => {
  allArticles = [...allArticles, ...directoryMapping[key].child]
})
onMounted(() => {
  useCodeCopy()
})
watch([route], async () => {
  await nextTick()
  useCodeCopy()
})
</script>
<template>
  <div
    class="h-full bg-opacity-0 mx-auto flex flex-col items-center relative z-1"
  >
    <div class="w-full h-16 flex justify-between items-center flex-shrink-0">
      <a href="/" class="p-4 flex items-center cursor-pointer">
        <div class="text-4xl mb-1 i-fxemoji:turtle"></div>
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
    <div class="flex-1 w-full max-w-1200px shadow-2xl p-4">
      <router-view />
    </div>
    <div class="h-2 w-full"></div>
  </div>
  <div class="area">
    <ul class="circles">
      <li v-for="idx in 10" class="bg-gray-200 dark:bg-gray-800"></li>
    </ul>
  </div>
</template>
<style scoped lang="scss">
:global(.el-dialog__header) {
  height: 0;
  padding: 0;
  margin: 0;
}
:global(.el-dialog__body) {
  height: 75%;
}
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
}

.circles li {
  position: absolute;
  display: block;
  list-style: none;
  width: 20px;
  height: 20px;
  animation: animate 25s linear infinite;
  bottom: -150px;
}

.circles li:nth-child(1) {
  left: 25%;
  width: 80px;
  height: 80px;
  animation-delay: 0s;
}

.circles li:nth-child(2) {
  left: 10%;
  width: 20px;
  height: 20px;
  animation-delay: 2s;
  animation-duration: 12s;
}

.circles li:nth-child(3) {
  left: 70%;
  width: 20px;
  height: 20px;
  animation-delay: 4s;
}

.circles li:nth-child(4) {
  left: 40%;
  width: 60px;
  height: 60px;
  animation-delay: 0s;
  animation-duration: 18s;
}

.circles li:nth-child(5) {
  left: 65%;
  width: 20px;
  height: 20px;
  animation-delay: 0s;
}

.circles li:nth-child(6) {
  left: 75%;
  width: 110px;
  height: 110px;
  animation-delay: 3s;
}

.circles li:nth-child(7) {
  left: 35%;
  width: 150px;
  height: 150px;
  animation-delay: 7s;
}

.circles li:nth-child(8) {
  left: 50%;
  width: 25px;
  height: 25px;
  animation-delay: 15s;
  animation-duration: 45s;
}

.circles li:nth-child(9) {
  left: 20%;
  width: 15px;
  height: 15px;
  animation-delay: 2s;
  animation-duration: 35s;
}

.circles li:nth-child(10) {
  left: 85%;
  width: 150px;
  height: 150px;
  animation-delay: 0s;
  animation-duration: 11s;
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
</style>

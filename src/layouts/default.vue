<script lang="ts" setup>
import { useCodeCopy } from '@/hooks/useCodeCopy'
import { useLinkAnchor } from '@/hooks/useLinkAnchor'
import { directoryMapping } from '@/utils/constants'
import type { IMappingChild } from '@/utils/constants'
import TypeIt from 'typeit'
import type { TypeItOptions } from 'typeit'

const router = useRouter()
const typeitRef = ref<HTMLDivElement | null>()
const titleRef = ref<HTMLDivElement | null>()
const searchModal = ref(false)
const searchValue = ref('')

onMounted(() => {
  new (TypeIt as any)(typeitRef.value, {
    strings: ['欢迎来到ZKBox!'],
    speed: 100,
    startDelay: 1000,
    cursor: true,
    loop: true,
    loopDelay: 1000
  } as TypeItOptions)
    .pause(500)
    .go()

  setTimeout(() => {
    if (titleRef.value) {
      titleRef.value.className = `${titleRef.value.className} opacity-0`
    }
  }, 2500)
})
const darkRef = useDark()
const navCtrls = ref([
  {
    icon: 'ic:round-search',
    title: '',
    event: (idx: number) => {
      searchModal.value = true
    }
  },
  {
    icon: 'cib:github',
    title: '',
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
const keys = useMagicKeys()
const searchKeys1 = keys['Command+K']
const searchKeys2 = keys['Ctrl+K']
const result = ref<IMappingChild[]>([])
const hoverIdx = ref(-1)
const gotoPage = (currentPath: string) => {
  searchModal.value = false
  router.push(currentPath)
}

onKeyStroke(['Enter'], (e) => {
  e.preventDefault()
  if (hoverIdx.value >= 0 && result.value.length) {
    router.push(result.value[hoverIdx.value].path)
    searchModal.value = false
  }
})
onKeyStroke('ArrowDown', () => {
  if (hoverIdx.value < result.value.length - 1) {
    hoverIdx.value = hoverIdx.value + 1
  }
})
onKeyStroke('ArrowUp', () => {
  if (hoverIdx.value > 0) {
    hoverIdx.value = hoverIdx.value - 1
  }
})
watch(
  searchValue,
  () => {
    result.value = []
    Object.keys(directoryMapping).forEach((key) => {
      result.value = [
        ...result.value,
        ...directoryMapping[key].child.filter((item) =>
          item.name.includes(searchValue.value)
        )
      ]
    })
  },
  {
    immediate: true
  }
)

watch(searchModal, () => {
  hoverIdx.value = -1
})

watch([searchKeys1, searchKeys2], () => {
  searchModal.value = true
})

useCodeCopy()
useLinkAnchor()
</script>
<template>
  <div
    class="h-full bg-opacity-0 mx-auto flex flex-col items-center relative z-1"
  >
    <div
      class="bg-gray-50 dark:bg-gray-800 w-full h-16 flex justify-between items-center flex-shrink-0"
    >
      <div class="flex items-center">
        <a href="/" class="p-4 flex items-center cursor-pointer">
          <img src="/vite.svg" width="30" alt="logo" />
        </a>
        <div
          ref="typeitRef"
          class="mt-2 w-30 bg-gradient-to-r from-#ffa502 to-#ff4757 text-transparent bg-clip-text text-sm"
        />
      </div>
      <h2
        ref="titleRef"
        class="text-2xl ml-2 bg-gradient-to-r from-#4facfe to-#00f2fe text-transparent bg-clip-text hidden md:block hover:opacity-100 transition-all"
      >
        ZKBox
      </h2>
      <ul class="p-4 flex justify-between">
        <li
          class="mx-3 flex justify-center items-center"
          v-for="(ctrl, idx) in navCtrls"
          :key="idx"
        >
          <div class="cursor-pointer" @click="() => ctrl.event(idx)">
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
  <n-modal v-model:show="searchModal" transform-origin="center">
    <n-card
      class="w-9/10"
      title="模态框"
      :bordered="false"
      size="huge"
      role="dialog"
      aria-modal="true"
    >
      <template #header>
        <n-input
          class="border-2 border-#ff992b"
          v-model:value="searchValue"
          clearable
        >
          <template #prefix>
            <div class="i-carbon:search text-2xl"></div>
          </template>
        </n-input>
      </template>
      <template #default>
        <ul class="h-70 overflow-y-auto">
          <li
            class="mt-3 w-full h-14 border-.5 border-blue-200 bg-gray-100 dark:bg-gray-600 rounded-5 flex items-center justify-between px-5"
            :class="{ 'bg-orange-400': hoverIdx === idx }"
            v-for="(item, idx) in result"
            :key="item.path"
            @click="() => gotoPage(item.path)"
            @mouseenter="() => (hoverIdx = idx)"
            @mouseleave="() => (hoverIdx = -1)"
          >
            <div>{{ item.name }}</div>
            <div
              :class="`${hoverIdx === idx ? 'i-el:return-key' : ''}  text-xl`"
            ></div>
          </li>
        </ul>
      </template>
    </n-card>
  </n-modal>
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

::v-deep(.n-card-header) {
  padding: 15px 40px;
}
</style>

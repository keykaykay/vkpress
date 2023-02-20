<script lang="ts" setup>
import { directoryMapping } from '@/utils/constants'
const route = useRoute()
const currentPath = route.path.slice(1)
const child = directoryMapping[currentPath].child
</script>
<template>
  <Guard :child="child" />
</template>

<script setup lang="ts">
import { type GlobalThemeOverrides, darkTheme, dateZhCN, zhCN } from 'naive-ui'

const dark = useDark()
const theme = computed(() => (dark.value ? darkTheme : null))
const themeOverrides: GlobalThemeOverrides = {
  common: {
    primaryColorHover: '#ff992b',
    primaryColor: '#ff992b',
    primaryColorPressed: '#ff992b',
    primaryColorSuppl: '#ff992b'
  }
}
</script>

<template>
  <n-config-provider
    :abstract="true"
    :locale="zhCN"
    :date-locale="dateZhCN"
    :theme="theme"
    :theme-overrides="themeOverrides"
  >
    <AppProvider>
      <router-view />
    </AppProvider>
  </n-config-provider>
</template>

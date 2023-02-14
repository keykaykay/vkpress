import { resolve } from 'path'
import { type UserConfigExport, defineConfig } from 'vite'
import type { ViteSSGOptions } from 'vite-ssg'
import Vue from '@vitejs/plugin-vue'
import Pages from 'vite-plugin-pages'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import Unocss from 'unocss/vite'
import Markdown from 'vite-plugin-vue-markdown'
import MDAttributes from 'markdown-it-link-attributes'
import MDCheckbox from 'markdown-it-task-checkbox'

export default defineConfig({
  plugins: [
    Vue({
      include: [/\.vue$/, /\.md$/],
      reactivityTransform: true
    }),
    Pages({
      extensions: ['vue', 'md']
    }),
    AutoImport({
      imports: ['vue', 'vue-router', 'vue/macros', '@vueuse/core'],
      dts: 'src/types/auto-imports.d.ts',
      vueTemplate: true
    }),
    Components({
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
      dts: 'src/types/components.d.ts'
    }),
    Markdown({
      headEnabled: true,
      markdownItSetup(md) {
        md.use(MDCheckbox)
        md.use(MDAttributes, {
          matcher: (link: string) => /^https?:\/\//.test(link),
          attrs: {
            target: '_blank',
            rel: 'noopener'
          }
        })
      },
      markdownItOptions: {
        html: true,
        linkify: true,
        typographer: true
      }
    }),
    Unocss()
  ],
  resolve: {
    alias: {
      '@/': `${resolve(__dirname, 'src')}/`,
      '#/': `${resolve(__dirname, 'src/types')}/`
    }
  },
  server: {
    host: true,
    open: true
  },
  build: {
    rollupOptions: {
      onwarn(warning, next) {
        if (warning.code !== 'UNUSED_EXTERNAL_IMPORT') next(warning)
      }
    }
  },
  ssgOptions: {
    format: 'cjs',
    formatting: 'minify'
  }
} as UserConfigExport | ViteSSGOptions)

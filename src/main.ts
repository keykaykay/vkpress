import '@/styles/main.css'
import 'uno.css'

import { ViteSSG } from 'vite-ssg'
import devalue from '@nuxt/devalue'
import App from './App.vue'
import routes from '~pages'
import NProgress from 'nprogress'

const scrollBehavior = (to: any, from: any, savedPosition: any) => {
  if (savedPosition) return savedPosition
  else return { top: 0 }
}

export const createApp = ViteSSG(
  App,
  { routes, scrollBehavior, base: import.meta.env.BASE_URL },
  ({ app, router, initialState, isClient }) => {
    if (isClient) {
      router.beforeEach(() => {
        NProgress.start()
      })
      router.afterEach(() => {
        NProgress.done()
      })
    }
  }
)

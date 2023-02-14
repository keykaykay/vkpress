import '@/styles/main.css'
import 'uno.css'

import { ViteSSG } from 'vite-ssg'
import App from './App.vue'
import routes from '~pages'
import NProgress from 'nprogress'

export const createApp = ViteSSG(
  App,
  { routes, base: import.meta.env.BASE_URL },
  ({ router, isClient }) => {
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

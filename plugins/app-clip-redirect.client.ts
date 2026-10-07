import {
  APP_ABSENT_REDIRECT_STORAGE_KEY,
  APP_CLIP_INVOCATION_URL,
  APP_CLIP_PARENT_OPEN_URL,
  APP_CLIP_SID_STORAGE_KEY,
  PRESENT_APP_OPEN_STORAGE_KEY,
} from '~/constants'

export default defineNuxtPlugin(() => {
  const sync = (path: string) => {
    try {
      if (path.includes('app-clip')) {
        sessionStorage.setItem(APP_ABSENT_REDIRECT_STORAGE_KEY, APP_CLIP_INVOCATION_URL)
        sessionStorage.setItem(PRESENT_APP_OPEN_STORAGE_KEY, APP_CLIP_PARENT_OPEN_URL)
        return
      }
      if (path.includes('merchant-managed')) {
        sessionStorage.setItem(APP_ABSENT_REDIRECT_STORAGE_KEY, APP_CLIP_INVOCATION_URL)
        sessionStorage.removeItem(PRESENT_APP_OPEN_STORAGE_KEY)
        const sid = new URLSearchParams(window.location.search).get('sid')
        if (sid) sessionStorage.setItem(APP_CLIP_SID_STORAGE_KEY, sid)
        return
      }
      sessionStorage.removeItem(APP_ABSENT_REDIRECT_STORAGE_KEY)
      sessionStorage.removeItem(PRESENT_APP_OPEN_STORAGE_KEY)
    } catch {
      /* ignore */
    }
  }

  sync(window.location.pathname)
  const router = useRouter()
  router.afterEach((to) => {
    sync(to.path)
  })
})

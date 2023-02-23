export function useCodeCopy() {
  const clipboard = useClipboard({ legacy: true })
  const router = useRouter()

  const lineBeforeTip = () => {
    const preEls = document.querySelectorAll('[v-pre]')
    preEls.forEach((el) => {
      el.removeChild(el.lastChild as Node)
    })
  }

  const addCodeHeader = () => {
    const preEls = document.querySelectorAll('pre[class]')
    const codeEls = document.querySelectorAll('pre code:not([v-pre])')
    preEls.forEach((el, idx) => {
      const codeEl = codeEls[Math.floor(idx / 2)]
      const className = codeEl.className
      let headerTitle = ''
      if (className) {
        const names = className.split('-')
        headerTitle = names[names.length - 1]
      }
      const headerEl = document.createElement('div')
      headerEl.className = 'h-8 p-2 flex items-center justify-between'

      const leftEl = document.createElement('div')
      leftEl.className = 'flex justify-between w-12'
      const colors = ['bg-red-400', 'bg-yellow-400', 'bg-green-400']
      colors.forEach((color) => {
        const colorEl = document.createElement('div')
        colorEl.className = `${color} w-3 h-3 rounded-full`
        leftEl.appendChild(colorEl)
      })

      const titleEl = document.createElement('div')
      titleEl.innerText = headerTitle
      titleEl.className = 'text-xs'

      const copyEl = document.createElement('div')
      copyEl.innerText = 'copy'
      copyEl.className = 'text-xs cursor-pointer'
      el.addEventListener('mouseenter', function () {
        headerEl.appendChild(copyEl)
        if (Array.from(headerEl.childNodes).includes(titleEl)) {
          headerEl.removeChild(titleEl)
        }
      })
      el.addEventListener('click', () => {
        headerEl.appendChild(copyEl)
        if (Array.from(headerEl.childNodes).includes(titleEl)) {
          headerEl.removeChild(titleEl)
        }
      })
      el.addEventListener('mouseleave', function () {
        headerEl.removeChild(copyEl)
        headerEl.appendChild(titleEl)
      })
      copyEl.addEventListener('click', async () => {
        const content = el.textContent
        await clipboard.copy(content || '')
        copyEl.innerText = 'copied!'
        setTimeout(() => {
          copyEl.innerText = 'copy'
        }, 2500)
      })

      headerEl.appendChild(leftEl)
      headerEl.appendChild(titleEl)
      el.insertBefore(headerEl, el.firstChild)
    })
  }

  onMounted(() => {
    lineBeforeTip()
    addCodeHeader()
  })
  router.afterEach(async (to, from, failure) => {
    if (to.path !== from.path) {
      await nextTick()
      lineBeforeTip()
      addCodeHeader()
    }
  })
}

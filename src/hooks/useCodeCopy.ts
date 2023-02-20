export function useCodeCopy() {
  const clipboard = useClipboard()
  const router = useRouter()
  const copy = () => {
    const preEls = document.querySelectorAll('[v-pre]')
    preEls.forEach((el) => {
      const copyEl = document.createElement('div')
      const copyClassName =
        'i-material-symbols:content-copy-outline text-xl absolute right-5px top-9 cursor-pointer'
      el.addEventListener('mouseenter', function () {
        copyEl.className = copyClassName
        el.appendChild(copyEl)
      })
      el.addEventListener('mouseleave', function () {
        el.removeChild(copyEl)
      })
      copyEl.addEventListener('click', async () => {
        const content = el.textContent
        await clipboard.copy(content || '')
        copyEl.className = `${copyClassName} i-teenyicons:tick-solid`
        setTimeout(() => {
          copyEl.className = copyClassName
        }, 1000)
      })
    })
  }

  const lineBeforeTip = () => {
    const preEls = document.querySelectorAll('[v-pre]')
    preEls.forEach((el) => {
      el.removeChild(el.lastChild as Node)
    })
  }

  const addCodeHeader = () => {
    const preEls = document.querySelectorAll('[v-pre]')
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
      headerEl.className = 'h-8 flex items-center justify-between'
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
      headerEl.appendChild(leftEl)
      headerEl.appendChild(titleEl)
      el.insertBefore(headerEl, el.firstChild)
    })
  }

  onMounted(() => {
    copy()
    lineBeforeTip()
    addCodeHeader()
  })
  router.afterEach(async (to, from, failure) => {
    if (to.path !== from.path) {
      await nextTick()
      copy()
      lineBeforeTip()
      addCodeHeader()
    }
  })
}

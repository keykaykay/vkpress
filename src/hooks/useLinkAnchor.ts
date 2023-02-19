export function useLinkAnchor() {
  const route = useRoute()
  const run = () => {
    const hEls = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
    const mdEl = document.querySelector('.content') as HTMLDivElement
    hEls.forEach((el) => {
      el.className = `${el.className} cursor-pointer`
      const linkEl = el.querySelector('.link-anchor') as HTMLLinkElement
      if (linkEl) {
        linkEl.textContent = '⚡️'
        el.addEventListener('click', () => {
          mdEl.scrollTo({
            left: 0,
            top: linkEl.offsetTop - 64
          })
        })
        linkEl.addEventListener('click', (e) => {
          e.preventDefault()
          mdEl.scrollTo({
            left: 0,
            top: linkEl.offsetTop - 64
          })
        })
      }
    })
  }
  onMounted(() => {
    run()
  })
  watch([route], async () => {
    await nextTick()
    run()
  })
}

export function useLinkAnchor() {
  const route = useRoute()
  const run = () => {
    const hEls = document.querySelectorAll('h1,h2,h3,h4,h5,h6')
    hEls.forEach((el) => {
      const linkEl = el.querySelector('.link-anchor') as HTMLLinkElement
      el.addEventListener('mouseover', () => {
        linkEl && (linkEl.textContent = '⚡️')
      })
      el.addEventListener('mouseleave', () => {
        linkEl && (linkEl.textContent = '')
      })
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

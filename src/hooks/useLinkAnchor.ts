export function useLinkAnchor() {
  const route = useRoute()
  const run = () => {
    const hEls = document.querySelectorAll('h2,h3,h4,h5,h6')
    const mdEl = document.querySelector('.content') as HTMLDivElement
    hEls.forEach((el) => {
      const linkEl = el.querySelector('.link-anchor') as HTMLLinkElement
      if (linkEl) {
        linkEl.textContent = '🔗'
        linkEl.className = `${linkEl.className} text-base`
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

export function useCodeCopy() {
  const clipboard = useClipboard()
  const preEls = document.querySelectorAll('pre')
  preEls.forEach((el) => {
    const divEl = document.createElement('div')
    divEl.className =
      'i-material-symbols:content-copy-outline text-xl absolute right-5px top-5px hidden cursor-pointer'
    el.appendChild(divEl)
    el.addEventListener('mouseenter', function (e: MouseEvent) {
      divEl.className =
        'i-material-symbols:content-copy-outline text-xl absolute right-5px top-5px block cursor-pointer'
    })
    el.addEventListener('mouseleave', function (e: MouseEvent) {
      divEl.className =
        'i-material-symbols:content-copy-outline text-xl absolute right-5px top-5px hidden cursor-pointer'
    })
    divEl.addEventListener('click', async (e: Event) => {
      const content = el.querySelector('code')?.textContent
      await clipboard.copy(content || '')
      alert('复制成功')
    })
  })
}

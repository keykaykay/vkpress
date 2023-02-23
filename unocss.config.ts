import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetTypography,
  presetUno,
  transformerDirectives,
  transformerVariantGroup
} from 'unocss'

export default defineConfig({
  shortcuts: [
    [
      'btn',
      'px-4 py-1 rounded inline-block bg-teal-700 text-white cursor-pointer hover:bg-teal-800 disabled:cursor-default disabled:bg-gray-600 disabled:opacity-50'
    ],
    [
      'icon-btn',
      'inline-block cursor-pointer select-none opacity-75 transition duration-200 ease-in-out hover:opacity-100 hover:text-teal-600'
    ]
  ],
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      warn: true
    }),
    presetTypography()
  ],
  transformers: [transformerDirectives(), transformerVariantGroup()],
  safelist: [
    'bg-#eccc68',
    'bg-#ff7f50',
    'bg-#ff6b81',
    'bg-#a4b0be',
    'bg-#57606f',
    'bg-#ffa502',
    'bg-#ff6348',
    'bg-#ff4757',
    'bg-#747d8c',
    'bg-#3b3b98',
    'bg-#7bed9f',
    'bg-#70a1ff',
    'bg-#5352ed',
    'bg-#dfe4ea',
    'bg-#2ed573',
    'bg-#1e90ff',
    'bg-#3742fa',
    'bg-#8854d0',
    'bg-#ced6e0',
    'bg-#58B19F',
    'i-tabler:brand-github',
    'i-ic:round-search',
    'i-ic:outline-dark-mode',
    'i-ic:outline-light-mode',
    'i-material-symbols:content-copy-outline',
    'i-teenyicons:tick-solid',
    'absolute',
    'right-5px',
    'top-9',
    'text-xl',
    'hidden',
    'block',
    'cursor-pointer',
    'h-8',
    'bg-red-400',
    'bg-yellow-400',
    'bg-green-400',
    'w-3',
    'h-3',
    'rounded-full',
    'w-12',
    'p-2',
    'text-xs',
    'text-base'
  ]
})

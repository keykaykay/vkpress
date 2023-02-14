import { colors, directoryMapping } from './constants'

export const randomColor = () =>
  colors[Math.floor(Math.random() * colors.length)]

export const allDirectories = () => Object.values(directoryMapping)

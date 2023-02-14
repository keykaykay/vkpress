import fileMapping from '@/utils/fileMapping.json'

export const colors = [
  '#eccc68',
  '#ff7f50',
  '#ff6b81',
  '#a4b0be',
  '#57606f',
  '#ffa502',
  '#ff6348',
  '#ff4757',
  '#747d8c',
  '#3b3b98',
  '#7bed9f',
  '#70a1ff',
  '#5352ed',
  '#dfe4ea',
  '#2ed573',
  '#1e90ff',
  '#3742fa',
  '#8854d0',
  '#ced6e0',
  '#58B19F'
]

export interface IMappingChild {
  path: string
  name: string
  time: string
}

interface IMapping {
  [key: string]: {
    name: string
    path: string
    child: IMappingChild[]
  }
}

export const directoryMapping: IMapping = fileMapping

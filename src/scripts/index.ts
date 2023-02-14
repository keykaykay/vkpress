import fs from 'fs-extra'
import { resolve } from 'path'
import prompts from 'prompts'
import chalk from 'chalk'
import dayjs from 'dayjs'

async function createFile() {
  const mappingPath = resolve('src', 'utils', 'fileMapping.json')
  const content = await fs.readJSON(mappingPath)
  const allDirs = [...Object.keys(content), '手动输入']
  const result = await prompts([
    {
      type: 'select',
      name: 'dir',
      message: '请选择目录',
      choices: allDirs.map((dir) => ({ title: dir, value: dir }))
    },
    {
      type: (prev) => (prev == '手动输入' ? 'text' : null),
      name: 'dirPath',
      message: '请输入目录路径'
    },
    {
      type: (prev) =>
        prev && allDirs.findIndex((item) => item === prev) === -1
          ? 'text'
          : null,
      name: 'dirName',
      message: '请输入目录名称'
    },
    {
      type: 'text',
      name: 'articlePath',
      message: '请输入文章路径',
      validate: (val) =>
        String(val).trim().replace(/\/+$/g, '') ? true : false
    },
    {
      type: 'text',
      name: 'articleName',
      message: '请输入文章标题',
      validate: (val) =>
        String(val).trim().replace(/\/+$/g, '') ? true : false
    }
  ])
  if (!result.articlePath || !result.articleName) {
    return
  }
  let isNew = false
  if (result.dirPath) {
    isNew = true
    content[result.dirPath] = {
      name: result.dirName,
      path: `/${result.dirPath}`,
      child: [
        {
          path: `/${result.dirPath}/${result.articlePath}`,
          name: result.articleName,
          time: dayjs().format('YYYY-MM-DD HH:mm:ss')
        }
      ]
    }
  } else {
    content[result.dir]['child'] = [
      ...content[result.dir]['child'],
      {
        path: `/${result.dir}/${result.articlePath}`,
        name: result.articleName,
        time: dayjs().format('YYYY-MM-DD HH:mm:ss')
      }
    ]
  }
  await fs.writeJSON(mappingPath, content)
  const contentPath = resolve(
    'src',
    'pages',
    result.dirPath || result.dir,
    `${result.articlePath}.md`
  )
  await fs.ensureFile(contentPath)
  await fs.writeFile(
    contentPath,
    `---
title: ${result.articleName}
date: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
---
  `
  )
  if (isNew) {
    await fs.copy(
      resolve('src', 'scripts', 'template', 'i.vue'),
      resolve('src', 'pages', result.dirPath || result.dir, 'index.vue')
    )
  }
}

createFile()

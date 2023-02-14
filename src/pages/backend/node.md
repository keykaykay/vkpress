---
title: nodejs简介
date: 2023-01-06 08:11:01
---

> nodejs 是 javascript 的运行时

### 简单的 express 服务器

```shell
npm init -y
npm i express
touch main.js
node main.js
```

```ts
import express form 'express'

const app = express()

app.post('/', (req, res) => {
  res.send({
    code: 1,
    data: req.body
  })
})

app.listen(5555)
```

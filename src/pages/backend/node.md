---
title: nodejs简介
date: 2023-01-06 08:11:01
---

> nodejs 是 javascript 的运行时

### 简单的 express 服务器

```bash
npm init -y
npm i express
touch main.js
node main.js
```

```js
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

```
这里就是测试一下费尽口舌荆防颗粒电视剧考拉飞机扣收垃圾考拉副书记考虑福建烤老鼠登记考拉 讲课费金石可镂复健科老大说
```

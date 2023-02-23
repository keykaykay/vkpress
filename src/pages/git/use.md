---
title: git使用
date: 2023-02-19 21:01:25
---

# git 使用

### 从服务器拉取代码

> ```sh
> cd ~/Desktop/test
> git clone https://xxx/test.git
> ```
>
> 代码拉取完成后会在`~/Desktop/test`目录下生成一个 test 文件夹

### 配置开发者用户名和邮箱

> ```sh
> git config user.name xxx
> git config user.email xxx@gmail.com
> ```
>
> 以后每次提交代码的时候都会有一条记录，记录中会包含用户名和邮箱

### 分支操作

> ```sh
> # 通过git branch 创建一个分支
> git branch test01/1.0.0
> # 通过 -m参数可以为分支重命名，重命名后的分支名字为test01/1.0.1
> git branch -m test01/1.0.0 test01/1.0.1
> # 不携带任何参数可以查看当前项目的分支列表
> git branch
> # 通过 -d参数可以删除分支
> git branch -d test01/1.0.1
> # 创建一个新的分支
> git branch test02/1.0.0
> # 通过git checkout来切换分支，后续的操作都在test02/1.0.0分支上操作
> git checkout test02/1.0.0
> # 提交test01/1.0.0分支到远程仓库
> git push origin test01/1.0.0
> # 删除test01/1.0.0远程分支
> git push origin -d test01/1.0.0
> ```

### 查看当前项目文件状态

> ```sh
> # 查看状态
> git status
> ```

### 常用操作

> ```sh
> # 把当前目录变动的文件添加到暂存区，.代表当前目录，也可以跟具体文件名
> git add .
> ```

> ```sh
> # -m 后面跟提交信息
> git commit -m "fix:提交信息"
> ```
>
> 提交规范：
>
> - feat - 新功能 feature
> - fix - 修复 bug
> - docs - 文档注释
> - style - 代码格式变动（不影响代码运行）
> - refactor - 重构、优化（不新增功能、不修复 bug）
> - perf - 性能优化
> - test - 增加测试
> - chore - 构建过程或辅助工具变动
> - revert - 回退
> - build - 打包

> ```sh
> # 把本地改动的代码推送到服务器；origin指当前git服务器地址；test01/1.0.0指把这个分支推送到服务器
> git push origin test01/1.0.0
> # 推送到main分支
> git push origin main
> ```

> ```sh
> # 从origin远程服务器test01/1.0.0分支拉取最新代码
> git pull origin test01/1.0.0
> # 拉取main分支对应服务器的最新代码
> git pull origin main
> ```
>
> `git pull` 冲突解决：
>
> ```sh
> # 模拟操作
>
> # 1.本地新建test01分支
> git branch test01
> # 2.查看分支
> git branch
> # 3.切换到test01分支
> git checkout test01
> # 4.在test01分支创建test.txt文件并写入内容
> echo 'git test01分支 测试' > test.txt
> # 5.把本地修改文件加入暂缓区并提交到本地仓库
> git add . && git commit -m "test:add"
> # 6.推送到远程test01分支
> git push origin test01
> # 7.切换到main分支
> git checkout main
> # 8.在main分支创建test.txt文件并写入内容
> echo 'git main 测试' > test.txt
> # 9.拉取远程test01分支内容到main分支，（本地main分支并没有commit）
> # error: 工作区中下列未跟踪的文件将会因为合并操作而被覆盖：test.txt
> git pull origin test01
> # 10.把main分支修改的内容做个备份
> git stash
> # 11.查看备份的记录（q退出）
> git stash list
> # 12.现在就可以把test01分支的内容合并到main
> git pull origin test01
> # 13.把本地备份的内容从栈顶弹出
>
> # <<<<<<< Updated upstream
> # git test01分支 测试
> # =======
> # git main 测试
> # >>>>>>> Stashed changes
>
> # 手动合并冲突代码即可
> git stash pop
> # 14.添加提交推送到远程main分支
> git add . && git commit -m "test:add" && git push origin main
> # 15.回到（9）操作，拉取远程test01分支内容到main分支（本地main分支已经commit）
> # 提示：您有偏离的分支，需要指定如何调和它们。您可以在执行下一次
> # 提示：pull 操作之前执行下面一条命令来抑制本消息：
> # 提示：
> # 提示：  git config pull.rebase false  # 合并（缺省策略）
> # 提示：  git config pull.rebase true   # 变基
> # 提示：  git config pull.ff only       # 仅快进
> # 提示：
> # 提示：您可以将 "git config" 替换为 "git config --global" 以便为所有仓库设置
> # 提示：缺省的配置项。您也可以在每次执行 pull 命令时添加 --rebase、--no-rebase，
> # 提示：或者 --ff-only 参数覆盖缺省设置。
> git pull origin test01
> # 16.把test01分支代码合并到当前main分支
>
> # <<<<<<< Updated upstream
> # git test01分支 测试
> # =======
> # git main 测试
> # >>>>>>> Stashed changes
>
> # 手动合并冲突代码即可
> git merge test01
> # 17.添加提交推送到远程main分支
> git add . && git commit -m "test:add" && git push origin main
> ```
>
> ```sh
> # 查看提交日志
> git log
> ```

---
layout: post
title: 我的git笔记
category : git
tagline: "原创"
tags : [git]
keywords: [git]
description: 这篇文章记录个人常用的一些命令，和记不住的一些命令。
---
{% include JB/setup %}

转眼间加入git的阵营已经快两年了，结识git，缘起github，2年前在寻找代码托管网站，当时还是用svn，起初使用google code，可是google的服务虽好，在天朝你懂得，后来发现了github，多亏了蒋鑫老师的《[GotGitHub](http://www.worldhello.net/gotgithub/)》将我带入github的大门，如果你是个github新手，那我强烈建议你阅读这篇文章，里面讲了很多东西。

起初的时候我是用github for windows这个客户端，在切换到多分支的时候被，自动转换换行符坑的不浅，后来越来阅读了《[Pro Git](http://git-scm.com/book/zh/v1)》第一版，对git的了解深入了一步，并开始转到命令行上来，如今我在[github](https://github.com/yanhaijing)上开源了70几个库，借助git，可自由在这些项目之间穿梭，同时还维护了github家园的[微博](http://weibo.com/githubchina/)和Q群(193091696)，如果你想获取关于git和github的最新消息可以关注微博，如果你有什么疑问或者问题，欢迎加群一起讨论。

这篇文章记录个人常用的一些命令，和记不住的一些命令。

![]({{ BLOG_IMG }}146.png)

## 安装

在 Windows 上安装 Git 同样轻松，有个叫做 msysGit 的项目提供了安装包：

	http://msysgit.github.io/

完成安装之后，就可以使用命令行的 git 工具（已经自带了 ssh 客户端）了，另外还有一个图形界面的 Git 项目管理工具。

## 配置

首先是配置帐号信息
	
	git config -e [--global] # 编辑Git配置文件

	git config --global user.name yanhaijing
	git config --global user.email yanhaijing@yeah.net

	git config --list #查看配置的信息

	git help config #获取帮助信息

配置自动换行（自动转换坑太大）

	git config --global core.autocrlf input #提交到git是自动将换行符转换为lf

配置密钥
	
	ssh-keygen -t rsa -C yanhaijing@yeah.net #生成密钥

	ssh -T git@github.com #测试是否成功

配置别名，git的命令没有自动完成功能，有点坑哈，别名派上了用场

	git config --global alias.st status #git st
	git config --global alias.co checkout #git co
	git config --global alias.br branch #git br
	git config --global alias.ci commit #git ci

笔者一般只配置配置这几个，你也可以配置其他命令。

## 新建仓库

	git init #初始化
	git status #获取状态
	git add [file1] [file2] ... #.或*代表全部添加
	git commit -m "message" #此处注意乱码
	git remote add origin git@github.com:yanhaijing/test.git #添加源
	git push -u origin master #push同事设置默认跟踪分支

## 从现有仓库克隆

	git clone git://github.com/yanhaijing/data.js.git	
	git clone git://github.com/schacon/grit.git mypro#克隆到自定义文件夹

## 本地

	git add * # 跟踪新文件
	git add -u [path] # 添加[指定路径下]已跟踪文件

	rm *&git rm * # 移除文件
	git rm -f * # 移除文件
	git rm --cached * # 停止追踪指定文件，但该文件会保留在工作区
	git mv file_from file_to # 重命名跟踪文件

	git log # 查看提交记录

	git commit # 提交更新	
	git commit [file1] [file2] ... # 提交指定文件	
	git commit -m 'message'
	git commit -a # 跳过使用暂存区域，把所有已经跟踪过的文件暂存起来一并提交
	git commit --amend#修改最后一次提交
	git commit -v # 提交时显示所有diff信息

	git reset HEAD *#取消已经暂存的文件
	git reset --mixed HEAD *#同上
	git reset --soft HEAD *#重置到指定状态，不会修改索引区和工作树
	git reset --hard HEAD *#重置到指定状态，会修改索引区和工作树
	git reset -- files#重置index区文件
	
	git revert HEAD #撤销前一次操作
	git revert HEAD~ #撤销前前一次操作
	git revert commit ## 撤销指定操作

	git checkout -- file#取消对文件的修改（从暂存区——覆盖worktree file）
	git checkout branch|tag|commit -- file_name#从仓库取出file覆盖当前分支
	git checkout -- .#从暂存区取出文件覆盖工作区
	
	git diff file #查看指定文件的差异
	git diff --stat #查看简单的diff结果
	git diff #比较Worktree和Index之间的差异
	git diff --cached #比较Index和HEAD之间的差异
	git diff HEAD #比较Worktree和HEAD之间的差异
	git diff branch #比较Worktree和branch之间的差异
	git diff branch1 branch2 #比较两次分支之间的差异
	git diff commit commit #比较两次提交之间的差异
	

	git log #查看最近的提交日志
	git log --pretty=oneline #单行显示提交日志
	git log --graph # 图形化显示
	git log --abbrev-commit # 显示log id的缩写
	git log -num #显示第几条log（倒数）
	git log --stat # 显示commit历史，以及每次commit发生变更的文件
	git log --follow [file] # 显示某个文件的版本历史，包括文件改名
	git log -p [file] # 显示指定文件相关的每一次diff

	git stash #将工作区现场（已跟踪文件）储藏起来，等以后恢复后继续工作。
	git stash list #查看保存的工作现场
	git stash apply #恢复工作现场
	git stash drop #删除stash内容
	git stash pop #恢复的同时直接删除stash内容
	git stash apply stash@{0} #恢复指定的工作现场，当你保存了不只一份工作现场时。

## 分支

	git branch#列出本地分支
	git branch -r#列出远端分支
	git branch -a#列出所有分支
	git branch -v#查看各个分支最后一个提交对象的信息
	git branch --merge#查看已经合并到当前分支的分支
	git branch --no-merge#查看为合并到当前分支的分支
	git branch test#新建test分支
	git branch branch [branch|commit|tag] # 从指定位置出新建分支
	git branch --track branch remote-branch # 新建一个分支，与指定的远程分支建立追踪关系
	git branch -m old new #重命名分支
	git branch -d test#删除test分支
	git branch -D test#强制删除test分支
	git branch --set-upstream dev origin/dev #将本地dev分支与远程dev分支之间建立链接

	git checkout test#切换到test分支
	git checkout -b test#新建+切换到test分支
	git checkout -b test dev#基于dev新建test分支，并切换

	git merge test#将test分支合并到当前分支
	git merge --squash test ## 合并压缩，将test上的commit压缩为一条

	git cherry-pick commit #拣选合并，将commit合并到当前分支
	git cherry-pick -n commit #拣选多个提交，合并完后可以继续拣选下一个提交
	
	git rebase master#将master分之上超前的提交，变基到当前分支
	git rebase --onto master 169a6 #限制回滚范围，rebase当前分支从169a6以后的提交
	git rebase --interactive #交互模式	
	git rebase --continue# 处理完冲突继续合并	
	git rebase --skip# 跳过	
	git rebase --abort# 取消合并

## 远端
	
	git fetch origin remotebranch[:localbranch]# 从远端拉去分支[到本地指定分支]

	git merge origin/branch#合并远端上指定分支

	git pull origin remotebranch:localbranch# 拉去远端分支到本地分支

	git push origin branch#将当前分支，推送到远端上指定分支
	git push origin localbranch:remotebranch#推送本地指定分支，到远端上指定分支
	git push origin :remotebranch # 删除远端指定分支
	git push origin remotebranch --delete # 删除远程分支
	git branch -dr branch # 删除本地和远程分支
	git checkout -b [--track] test origin/dev#基于远端dev分支，新建本地test分支[同时设置跟踪]


## 源

git是一个分布式代码管理工具，所以可以支持多个仓库，在git里，服务器上的仓库在本地称之为remote。

个人开发时，多源用的可能不多，但多源其实非常有用。

	git remote add origin1 git@github.com:yanhaijing/data.js.git
	
	git remote#显示全部源
	git remote -v#显示全部源+详细信息

	git remote rename origin1 origin2#重命名

	git remote rm origin#删除

	git remote show origin#查看指定源的全部信息


## 标签

当开发到一定阶段时，给程序打标签是非常棒的功能。

	git tag#列出现有标签	

	git tag v0.1 [branch|commit] # [从指定位置]新建标签
	git tag -a v0.1 -m 'my version 1.4'#新建带注释标签

	git checkout tagname#切换到标签
	
	git push origin v1.5#推送分支到源上
	git push origin --tags#一次性推送所有分支

	git tag -d v0.1#删除标签
	git push origin :refs/tags/v0.1#删除远程标签
	
## 总结	

啊哈！终于总结完了，以后不会的时候，再也不用到处去找了。

其实还有两个最有用的命令还未提到。

	git help *#获取命令的帮助信息
	git status#获取当前的状态，非常有用，因为git会提示接下来的能做的操作

最后再补一个救命的命令吧，如果你不小心删错了东西，就用下面的命令，可以看到你之前操作的id，大部分情况下是可以恢复的，记住git几乎不会删除东西。

	git reflog # 显示最近操作的commit id

## 参考资料

- [Git参考手册](http://gitref.org/zh/index.html)
- [git-简明指南](http://rogerdudler.github.io/git-guide/index.zh.html)
- [图解Git](http://marklodato.github.io/visual-git-guide/index-zh-cn.html)
- [Pro Git](http://git-scm.com/book/zh/)
- [Git Magic](http://www-cs-students.stanford.edu/~blynn/gitmagic/intl/zh_cn/)
- [learnGitBranching](http://pcottle.github.io/learnGitBranching/)
- [让 EmEditor 成为 Git 的编辑器](http://www.cnblogs.com/1-2-3/archive/2010/07/10/git-use-emeditor.html)



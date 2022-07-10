# 颜海镜的博客

嗨，这是我的个人博客，如果你在网上见到过颜海镜，或是 yanhaijing，头像是一个无脸男，那个人就是我哦。

<img src="http://yanhaijing.com/img/facelessman.png" width="120">

## 关于我

[这里有我的简介](http://yanhaijing.com/yan_about/)

## jekyll 命令

```bash
$ jekyll server
$ jekyll server -D # 预览草稿
```

## 环境搭建

### MAC 环境搭建

第一步，通过升级 ruby 版本

```bash
$ \curl -sSL https://get.rvm.io | bash -s stable
$ echo "ruby_url=https://cache.ruby-china.com/pub/ruby" > ~/.rvm/user/db # 修改rvm镜像
$ rvm list known # 列出ruby所有版本
$ rvm install 2.4.9 # 安装指定版本
$ ruby -version
```

第二步，安装 jekyll

```bash
# 更换国内镜像
$ gem sources --remove https://rubygems.org/
$ gem sources -a https://gems.ruby-china.com/

# 安装jekyll
$ gem install bundler jekyll
```

## 技术支持

- [jekyllcn](http://jekyllcn.com/)
- [jekyllbootstrap](http://jekyllbootstrap.com)
- [Markdown 语法说明](http://wowubuntu.com/markdown/)
- [Liquid](https://github.com/Shopify/liquid/wiki/Liquid-for-Designers)
- [在 Windows 系统配置 Jekyll](http://yanhaijing.com/jekyll/2011/12/30/run-jekyll-on-window)

## 联系方式

- [Weibo](http://weibo.com/yanhaijing1234 "yanhaijing's Weibo")
- [Email](http://yanhaijing@yeah.net "yanhaijing's Email")

## License

<a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/"><img alt="知识共享许可协议" style="border-width:0" src="img/cp.png" /></a><br /><span xmlns:dct="http://purl.org/dc/terms/" href="http://purl.org/dc/dcmitype/Text" property="dct:title" rel="dct:type">颜海镜的博客</span> 由 <a xmlns:cc="http://creativecommons.org/ns#" href="http://yanhaijing.com" property="cc:attributionName" rel="cc:attributionURL">颜海镜</a> 创作，采用 <a rel="license" href="http://creativecommons.org/licenses/by-nc-sa/4.0/">知识共享 署名-非商业性使用-相同方式共享 4.0 国际 许可协议</a>进行许可。<br />基于<a xmlns:dct="http://purl.org/dc/terms/" href="http://yanhaijing.com" rel="dct:source">http://yanhaijing.com</a>上的作品创作。

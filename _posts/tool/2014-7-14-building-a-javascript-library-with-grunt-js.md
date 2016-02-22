---
layout: post
title: 基于Grunt构建一个JavaScript库
category : tool
tagline: "译"
tags : [tool]
keywords: [grunt, tool]
description: 本文解释如何使用Grunt.js构建JavaScript库。Grunt.js依赖Node.js和npm，所以第一节解释其是什么，如何安装和使用。如果你对npm有了解，那你可以跳过这一节。第四和第五节讲述如何配置Grunt和一系列典型Grunt任务。
---
{% include JB/setup %}

现在公认的JavaScript典型项目需要运行单元测试，合并压缩。有些还会使用代码生成器，代码样式检查或其他构建工具。

Grunt.js是一个开源工具，可以帮助你完成上面的所有步骤。它非常容易扩展，并使用JavaScript书写，所以任何为JavaScript库或项目工作的人都可以按自己的需要扩展它。

![]({{BLOG_IMG}}245.png)

本文解释如何使用Grunt.js构建JavaScript库。Grunt.js依赖Node.js和npm，所以第一节解释其是什么，如何安装和使用。如果你对npm有了解，那你可以跳过这一节。第四和第五节讲述如何配置Grunt和一系列典型Grunt任务。

本文讨论的代码例子可以在[GitHub](https://github.com/SomMeri/grunt-tutorial)上访问。

## 工具概述（Tool Chain Overview）

开始之前，我们需要三个工具：

*   [Node.js](http://nodejs.org/),
*   [Npm](http://npmjs.org/),
*   [Grunt.js](http://gruntjs.com/).

Node.js是一个流行的服务器端JavaScript环境。它被用来编写和运行JavaScript服务和JavaScript命令行工具。如果你想进一步链接Node.js，你可以查看[Stack Overflow](http://stackoverflow.com/a/5511507)上相关的资料。

Npm是Node.js的包管理工具。它能从中心仓库下载依赖，解决大部分依赖冲突问题。Npm仓库仅仅存储Node.js服务器段和命令行项目。它不包含用于web和移动app相关的库。我们用它来下载Grunt.js。

Grunt.js是一个任务运行工具，我们用起构建我们的项目。它在Node.js之上运行并且通过Npm安装。

### 安装Node.js和Npm（Node.js and Npm Installation）

你可以直接从[下载页面](http://nodejs.org/download/)或用[其它包管理工具](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)安装node.js。安装成功后在命令行输入 node -v Node.js将输出它的版本号。

大部分安装器和包管理工具将同时安装Npm。在命令行输入 npm -v 测试是否安装成功。如果成功将输出它的版本号。不同的系统可能安装方式略有不同。

#### Linux

下载和使用[安装脚本](https://npmjs.org/install.sh)。

#### Windows

windows安装器包含npm并会添加path变量。仅在你下载Node.exe或从源代码编译Node是才需要独立安装Npm。从[这里](http://nodejs.org/dist/npm/)下载Npm的最新版zip压缩包。解压后赋值到Node.exe的安装目录。如果你愿意，你也可以放到任何位置，将其加入path变量即可。

#### OSX

安装包中内建Npm。

## Npm基础（Npm Basics）

了解Npm基础操作对于使用和安装Grunt.js都有帮助。这节仅包含接触知识。更多细节可以查看[npm文档](https://npmjs.org/doc/)。

本节将解释下面的东西：

*   什么是npm；
*   npm插件本地安装和全局安装的区别；
*   package.json文件和其规范；
*   npm安装命令。

### 概要（Overview）

Npm是一个包管理工具，可以从中心仓库下载和安装JavaScript依赖。安装包能被用在Node.js项目或命令行工具。

项目通常在package.json文件内部列出其依赖和安装插件。此外npm库也可以从命令行安装。

### 全局安装vs本地安装（Global vs Local Installation）

每个包可以安装在全局或本地环境。实际的区别是存储位置和访问方式。

全局安装包被直接存储在Node.js安装路径。他们之所以被称为全局，是因为他们可以在任何地方直接访问。

本地安装将下载包安装在当前工作路径。本地安装包只能从其所在目录访问。

本地安装包被存储进node_mudules子目录。无论你使用什么版本控制系统，你可以将其添加仅.ignorefile 文件。

### Package.json

package.json文件包含npm项目描述。它总是位于项目的根目录，并且包含项目名称，版本，协议和其他类似元数据。最重要的是，它包含两个项目依赖列表。

&nbsp;第一个列表包含运行所需要的依赖。任何希望使用此项目的人必须安装它们。第二个列表包含开发时需要依赖项。包括测试工具，构建工具和代码样式检测工具。

创建package.json最简单的方法是通过 npm install 命令。这条命令会以交互式提问一系列问题，并根据回答在当前工作目录生成基本的package.json文件。只有名字（name）和版本（version）属性是必须的。如果你不打算将你的库发布到Npm，你能忽略其余的部分。

下面的链接包含对package.json的详细描述：

*   [package.json interactive guide](http://package.json.nodejitsu.com/);
*   [package.json tutorial on nodejitsu](http://docs.nodejitsu.com/articles/getting-started/npm/what-is-the-file-package-json);
*   [official documentation](https://npmjs.org/doc/json.html).

### 安装命令（The Install Command）

Npm宝可以通过npm install 命令安装。默认安装到本地。全局安装需要指定 -g开关。

不带参数的 npm install 将在当前目录或上层目录查找 package.json 文件。如果发现，将会在当前目录安装所有列出的依赖项。

可以通过 npm install &lt;pkg_name@version&gt; 命令安装具体的npm包。这条命令将从中心仓库找到指定版本的包，并将其安装到当前目录。

版本号是可选的。如果省略将下载最新稳定版。

最后，通过 --sace-dev开关不仅可以安装包，还会将其添加到 package.json 的开发依赖中。

## 为项目添加Grunt.js（Adding Grunt.js to the Project）

我们将首先将Grunt.js添加进我们的JavaScript项目。为此我们需要安装两个Grunt.js模块：

*   grunt-cli&nbsp;- 命令行接口 (CLI);
*   grunt&nbsp;- 任务运行器.

_提醒：最新的Grunt.js（4.0）不再兼容以前的版本。一些老的教程和文档不再适合新版Grunt.js了。_

### 概论（Overview）

所有实际的工作是由任务运行器来做。命令行接口仅解析参数和将其传递个任务运行器。如果任务运行器没有安装将不会做任何事情。

命令行接口应该被安装在全局环境，然而任务运行器在本地环境。全局命令行接口保证Grunt命令可以在所有路径访问。任务运行器必须是本地的，因为不同的项目可能需要不同的Grunt版本。

### 安装（Installation）

安装全局Grunt命令行接口：

	npm install -g grunt-cli

切换到项目根目录，通过npm init让Npm帮你生成package.json文件。它会问你些问题然后根据你的回答生成合法的package.json文件。只有名字和版本是必须的；你可以忽略其他选项。

将Grunt.js最新版添加到本地环境，同时添加到package.json文件的开发依赖里。


	npm install grunt --save-dev


### Package.json

通过前面的命令创建的package.json文件应该类似相面这样：

	{
	  "name": "gruntdemo",
	  "version": "0.0.0",
	  "description": "Demo project using grunt.js.",
	  "main": "src/gruntdemo.js",
	  "scripts": {
	    "test": "echo \"Error: no test specified\" && exit 1"
	  },
	  "repository": "",
	  "author": "Meri",
	  "license": "BSD",
	  "devDependencies": {
	    "grunt": "~0.4.1"
	  }
	}

## 配置Grunt.js（Configure Grunt.js）

Grunt.js运行任务并且通过任务完成工作。然而，Grunt.js安装成功后还没有任务可以使用。任务必须从插件载入，而插件通常需要Npm安装。

我们使用五个插件：

*   **grunt-contrib-concat**&nbsp;- 拼接文件,
*   **grunt-contrib-uglify**&nbsp;- 拼接并压缩文件（js）,
*   **grunt-contrib-copy**&nbsp;- 复制文件,
*   **grunt-contrib-qunit**&nbsp;- 运行单元测试,
*   **grunt-contrib-jshint**&nbsp;- 检查bug和JavaScript代码风格.

本节将解释如何配置这些插件。我们从最简单的配置开始，然后一步步解释如何配置任务。余下的子章节将详细讲解如何配置每个插件。

### 基础-不做任何配置（Basic Do Nothing Configuration）

Grunt将配置信息写到Gruntfile.js或Gruntfile.coffee文件里。由于我们创建的JavaScript项目，我们将使用JavaScript版本。最简单的Gruntfile.js看起来像下面这样：

	//包装函数 有一个参数
	module.exports = function(grunt) {

	  // 默认任务。在本例子中没有任何操作。
	  grunt.registerTask('default', []);
	};

配置信息被保存在module.exports函数内部。它包含grunt对象作为其参数，并且通过调用该函数完成配置。

配置函数必须创建至少一个任务别名，并且配置他们。例如，上面的代码片段创建了一个“default”任务别名并且指定为空的任务列表。换句话说，默认的任务别名可以工作，但不会做任何事情。

用 grunt &lt;taskAlias&gt; 命令运行指定的 taskAlias任务。taskAlias的参数是可选的，如果省略，Grunt将使用“default”任务。

保存Gruntfile.js文件，在命令行运行Grunt：

	grunt

你应该看到如下输出：

	Done, without errors.

如果配置任务返回错误或警告Grunt将发出蜂鸣声（在命令行下输入错误的声音，译者未发现这点）。如果你不想听到蜂鸣声，你可以使用 -no-color 参数：

	grunt -no-color

### Grunt Npm 任务（Grunt Npm Tasks）

从插件添加任务是通过用步骤，对所有插件都是相同的。本节将概要讲述需要的过程，实际的例子将在下面的章节讲解。

#### 安装插件（Install the Plugin）

首先，我们需要将插件添加进package.json文件的开发依赖里面，并且使用Npm进行安装：


	npm install <plugin name> --save-dev


#### 配置任务（Configure Tasks）

任务配置必须被存储在一个对象内部，有各自的任务名，并且被传递给 grunt.initConfig方法：

	module.exports = function(grunt) {

	  grunt.initConfig({
	    firstTask : { /* ... 配置第一个任务 ... */ },
	    secondTask : { /* ... 配置第二个任务 ... */ },
	    // ... 其他任务 ...
	    lastTask : { /* ... 最后一个任务 ... */ }
	  });

	  // ... the rest ...
	};

全面的任务配置信息解释看这里[Grunt.js文档](http://gruntjs.com/configuring-tasks)。本节仅描述最通用，简单的例子。假设任务接受一个文件列表，并处理他们，然后生出输出文件。

一个简单的任务配置例子：

	firstTask: {
	  options: {
	    someOption: value //取决于插件
	  },
	  target: {
	    src: ['src/file1.js', 'src/file2.js'], //输入文件
	    dest: 'dist/output.js' // 输出文件
	  }
	}

例子中的任务配置有两个属性。一个是任务选项，名称必须是”options“。Grunt.js不会对options的属性执行任何操作，其行为有插件决定。

其他项可以有任何名字，并且要包含任务目标。最常见的任务是操作和生成文件，所以他们的target有两个属性，”src“ 和 ”dest“。src包含输入的文件列表，dest包含输出的文件名字。

如果你配置多个任务，Grunt将依次执行。下面的任务将运行两次，一次操作src及其子目录的所有js文件，另一次操作test及其子目录下的所有js文件：

	multipleTargetsTask: {
	  target1: { src: ['src/**/*.js'] },
	  target2: { src: ['test/**/*.js']] }
	}

#### 加载和注册任务（Load and Register Tasks）

最后，将插件载入必须使用 grunt.loadNpmTasks 函数，并且注册任务别名。

上面介绍的结构合起来如下：

	module.exports = function(grunt) {

	  grunt.initConfig({ /* ... tasks configuration ... */ });
	  grunt.loadNpmTasks('grunt-plugin-name');
	  grunt.registerTask('default', ['firstTask', 'secondTask', ...]);

	};

### 配置JSHint（Configure JSHint）

[JSHint](http://www.jshint.com/)检查JavaScript代码中潜在的问题和错误。他被设计成可配置的，并且有合理的默认值。

我们将使用 [grunt-contrib-jshint](https://github.com/gruntjs/grunt-contrib-jshint#readme) 插件，grunt-contrib开头的插件都是有Grunt官方维护的，如果你创建自己的插件千万不要以次开头。

#### 安装插件（Install the Plugin）

打开命令行，在项目根目录运行 npm install grunt-contrib-jshint --save-dev。将会添加插件到package.json文件的开发依赖，并且安装到本地Npm仓库。

#### JSHint参数（JSHint Options）

grunt-contrib-jshint插件的参数和JSHint一样。完整的参数列表可以访问[JSHint的文档页面](http://www.jshint.com/docs/)。

JSHint 的参数 “eqeqeq” 会将 == 和 != 操作符报告为警告。默认是关闭的，因为这些操作符是合法的。但我建议你开启它，因为严格相等比非严格相等更安全。

同时我建议你开启trailing选项，将会对代码中结尾部的空白元素生成警告。结尾的空白在多行字符串中会引起奇怪的问题。

每一个可选项都是布尔值，设置为true将会开启相应检测。下面的例子开启了eqeqeq和trailing选项：

	options: {
	  eqeqeq: true,
	  trailing: true
	}

#### 配置JSHint任务（Configure the JSHint Task）

grunt-contrib-jshint插件的任务名字是“jshint”。我们将使用上一节中的配置选项，使它检测位于src和test目录下的全部JavaScript文件。

JSHint的配置信息必须写在名为“jshint”的属性内部。可以有两个属性，一个数参数（options）另一个是目标（target）。

目标可以在任何属性内部，在这里我们仅使用“target”。其必须包含待验证的JavaScript文件列表。文件列表可以放在目标的src属性中，可以使用**和*通配符。

有两个自定义选项，将会验证位于src和test目录及其子目录下的所有js文件。

	grunt.initConfig({
	  jshint: {
	    options: {
	      eqeqeq: true,
	      trailing: true
	    },
	    target: {
	      src : ['src/**/*.js', 'test/**/*.js']
	    }
	  }
	});

#### 加载和注册（Load and Register）

最后需要载入和注册 grunt-contrib-jshint 任务：

	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.registerTask('default', ['jshint']);

#### 全部JSHint配置选项（Full JSHint Configuration）

目前为止完整的 Gruntfile.js 文件如下：

	module.exports = function(grunt) {

	  grunt.initConfig({
	    jshint: {
	      options: {
	        trailing: true,
	        eqeqeq: true
	      },
	      target: {
	        src : ['src/**/*.js', 'test/**/*.js']
	      }
	    }
	  });

	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.registerTask('default', ['jshint']);
	};

### 拼接文件（Concatenate Files）

js文件一般是分散的（如果你的项目不是几十行js的话），上线前我们必须将其打包进一个文件，并添加版本号和项目名字。在文件的开始位置应该包含库名称，版本，协议，构建时间和其他一些信息。

例如，像下面这样：

	/*! gruntdemo v1.0.2 - 2013-06-04
	 *  License: BSD */
	var gruntdemo = function() {
	  ...

我们将使用 [grunt-contrib-concat](https://github.com/gruntjs/grunt-contrib-concat#readme) 插件完成拼接任务，并生成正确的注释信息。

#### 安装插件（Install the Plugin）

和前面一样，将插件写进package.json文件的开发依赖里，然后从Npm仓库安装到本地。

打开命令行，运行如下命令:

	npm install grunt-contrib-concat --save-dev

#### 加载Package.json（Load Package.json）

首先从package.json文件加载配置信息，并存储在pkg属性。需要使用 grunt.file.readJSON 函数：

	pkg: grunt.file.readJSON('package.json'),

现在pkg的值是一个对象，包含全部package.json的信息。项目名被存储在pkg.name属性，版本被存储在pkg.version。版权被存储在pkg.license属性等等。

#### 生成页头信息和 文件名（Compose Banner and File Name）

Grunt提供一套[模版系统](http://gruntjs.com/api/grunt.template)，我们可以使用它构建页头和文件名称。模版可以在字符串中嵌入JavaScript表达式，通过&lt;%= expression %&gt; 语法。Grunt计算表达式的值并替换模版中的表达式。

例如，模版中的 &lt;%= pkg.name %&gt; 将被替换为 pkg.name 的属性值。如果属性值是字符串，模版的行为类似字符串拼接 ...' + pkg.name + '...

模版中可以引用Grunt中的全部属性。系统提供了一个非常有帮助的日期格式化函数。我们将使用 grunt.template.today(format) 函数生成当前的时间戳。

让我们生成一个简单的页头，包含项目名称，版本号，版权和当前的日期。由于我们需要在 Uglify 任务中使用banner，所以我们将其存储在变量中：

	var bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
	                    '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
	                    ' *  License: <%= pkg.license %> */\n';

上面的模版生成如下的页头：

	/*! gruntdemo v0.0.1 - 2013-06-04
	 *  License: BSD */

项目的名称和版本部分也需要在多处使用。将项目名和版本号拼在一起，存储在一个变量中：

	var name = '<%= pkg.name %>-v<%= pkg.version%>';

生成的名字如下：

	gruntdemo-v0.0.1

#### 配置目标和选项（Configure Target and Options）

target必须包含需要被拼接的文件列表，和合并完成后输出文件的名字。target支持通配符和模版，所以我们使用前一节生成的模版：

	target : {
	  // 拼接src目录下的所有文件
	  src : ['src/**/*.js'],
	  // place the result into the dist directory,
	  // name variable contains template prepared in
	  // previous section
	  dest : 'distrib/' + name + '.js'
	}

concat插件也可以通过banner属性添加banner。由于上面我们已经将banner内容赋给bannerContent变量，所以我们仅需引入即可：

	options: {
	  banner: bannerContent
	}

#### 加载和注册（Load and Register）

最后不要忘记从Npm加载 grunt-contrib-concat ，并且将其注册到默认工作流：

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.registerTask('default', ['jshint', 'concat']);

#### 完整的拼接配置（Full Concat Configuration）

这一节出示包含完整contat配置的Gruntfile.js文件。

注意pkg属性在传递给initConfig方法的参数中定义。我们不能把他放在其他地方，因为它读取模版信息，并且仅在initConfig方法的参数和grunt对象中有访问模版的权限。

	module.exports = function(grunt) {
	  var bannerContent = '... banner template ...';
	  var name = '<%= pkg.name %>-v<%= pkg.version%>';

	  grunt.initConfig({
	    // pkg is used from templates and therefore
	    // MUST be defined inside initConfig object
	    pkg : grunt.file.readJSON('package.json'),
	    // concat configuration
	    concat: {
	      options: {
	        banner: bannerContent
	      },
	      target : {
	        src : ['src/**/*.js'],
	        dest : 'distrib/' + name + '.js'
	      }
	    },
	    jshint: { /* ... jshint configuration ... */ }
	  });

	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.registerTask('default', ['jshint', 'concat']);
	};

### 压缩（Minify）

如果浏览器载入和解析大文件，会使页面载入变得缓慢。可能不是所有项目都会遇到这个问题，但对于移动端的app和使用非常多大型库的大型web应用程序而言，是必须要考虑的。

因此，我们也将我们库进行压缩。压缩会将输入的文件变小，通过去除空白元素，注释，替换变量名称等，但不会改变代码逻辑。

压缩功能使用 [grunt-contrib-uglify](https://github.com/gruntjs/grunt-contrib-uglify#readme) 插件，其通过Grunt集成 [UglifyJs](http://lisperator.net/uglifyjs/)。它通过uglify任务拼接和压缩一组文件。

#### 源程序映射（Source Maps）

压缩会使生成的文件难于阅读和调试，所以我们通过生成源程序映射来简化问题。

源程序映射是压缩文件和源文件之间的纽带。如果浏览器支持，浏览器调试工具会显示对人友好的源文件，而不是压缩文件。仅有chrome和nightly版本的 firefox支持源代码映射。你可以在[HTML5 rocks](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) 和 [Tutsplus ](http://net.tutsplus.com/tutorials/tools-and-tips/source-maps-101/)上获取更多信息，我建议你看看阮一峰老师的这篇文章：http://www.ruanyifeng.com/blog/2013/01/javascript_source_map.html

#### 安装插件（Install the Plugin）

将插件添加到package.json的开发依赖里，并且安装到本地Npm仓库。

使用如下命令：

	npm install grunt-contrib-uglify --save-dev

#### 配置目标（Configure Target）

配置uglify任务目标的方式和concat任务类似。必须要包含待压缩的javascript文件列表和输出文件的名字。

支持通配符和模版，所以我们可以使用前面章节中的用到的模版：

	target : {
	  // use all files in src directory
	  src : ['src/**/*.js'],
	  // place the result into the dist directory,
	  // name variable contains template prepared in
	  // previous sub-chapter
	  dest : 'distrib/' + name + '.min.js'
	}

#### 配置选项（Configure Options）

配置banner的方式和concat一样&mdash;&mdash;通过设置“banner”属性并且支持模版。因此，我们可以重复使用前面章节中准备好的 bannerContent 变量。

通过“sourceMap”属性生成源文件映射。包含生成文件的名字。此外，必须设置“sourceMapUrl”和“sourceMapRoot”属性。前一个包含相对于uglified文件到源文件映射文件的路径，后一个包含是源文件映射到源文件的相对路径。

通过bannerContent变量生成页眉，通过name变量生成源文件映射文件的名字：

	options: {
	  banner: bannerContent,
	  sourceMapRoot: '../',
	  sourceMap: 'distrib/'+name+'.min.js.map',
	  sourceMapUrl: name+'.min.js.map'
	}

#### 加载和注册（Load and Register）

最后一步是从Npm加载 grunt-contrib-uglify，并且添加到默认任务列表：

	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.registerTask('default', ['jshint', 'concat', 'uglify']);

#### 全部 Uglify 配置信息（Full Uglify Configuration）

下面是包含完整uglify配置信息的Gruntfile.js文件：

	module.exports = function(grunt) {
	  var bannerContent = '... banner template ...';
	  var name = '<%= pkg.name %>-v<%= pkg.version%>';

	  grunt.initConfig({
	    // pkg must be defined inside initConfig object
	    pkg : grunt.file.readJSON('package.json'),
	    // uglify configuration
	    uglify: {
	      options: {
	        banner: bannerContent,
	        sourceMapRoot: '../',
	        sourceMap: 'distrib/'+name+'.min.js.map',
	        sourceMapUrl: name+'.min.js.map'
	      },
	      target : {
	        src : ['src/**/*.js'],
	        dest : 'distrib/' + name + '.min.js'
	      }
	    },
	    concat: { /* ... concat configuration ... */ },
	    jshint: { /* ... jshint configuration ... */ }
	  });

	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.registerTask('default', ['jshint', 'concat', 'uglify']);
	};

### 最后的发布文件（Latest Release File）

最后要发布的库包括两个文件，并且都在名字中含有版本号。这会给想要自动下载每个新版本的人造成不必要的困难。

如果想要查看是否发布了新版本和新版本的名字，必须每次都要获取和解析一个json文件。如果每次都更改名称，则必须更新下载脚本。

因此我们将使用 [grunt-contrib-copy](https://github.com/gruntjs/grunt-contrib-copy#readme) 插件创建无版本号的文件。

#### 安装插件（Install the Plugin）

将插件添加进package.json的开发依赖，并且从Npm仓库安装到本地。

使用如下命令：

	npm install grunt-contrib-copy --save-dev

#### 配置插件（Configure the Plugin）

copy配置信息包括三个目标，分别对应三个发布文件。没有配置选项，基本和前一个插件配置过程一样。

仅有一点不一样，就是多任务。每个任务包含一对 src/dest，待拷贝的名字和待创建的名字。

对前面的任务配置选项稍加修改。将所有文件名字放到变量中，以便可以重复使用：

	module.exports = function(grunt) {
	  /* define filenames */
	  latest = '<%= pkg.name %>';
	  name = '<%= pkg.name %>-v<%= pkg.version%>';

	  devRelease = 'distrib/'+name+'.js';
	  minRelease = 'distrib/'+name+'.min.js';
	  sourceMapMin = 'distrib/source-map-'+name+'.min.js';

	  lDevRelease = 'distrib/'+latest+'.js';
	  lMinRelease = 'distrib/'+latest+'.min.js';
	  lSourceMapMin = 'distrib/source-map-'+latest+'.min.js';

	  grunt.initConfig({
	    copy: {
	      development: { // copy non-minified release file
	        src: devRelease,
	        dest: lDevRelease
	      },
	      minified: { // copy minified release file
	        src: minRelease,
	        dest: lMinRelease
	      },
	      smMinified: { // source map of minified release file
	        src: sourceMapMin,
	        dest: lSourceMapMin
	      }
	    },
	    uglify: { /* ... uglify configuration ... */ },
	    concat: { /* ... concat configuration ... */ },
	    jshint: { /* ... jshint configuration ... */ }
	  });

	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-copy');
	  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy']);

### 单元测试（Unit Tests）

最后，配置 grunt.js 运行单元测试，测试最新发布的文件。我们将使用 grunt-contrib-qunit 插件实现目标。这个插件将在无头的 [PhantomJS ](http://phantomjs.org/)实例中运行 [QUnit ](http://qunitjs.com/)单元测试。

这个解决方案不能模拟不同浏览器和查找全部 bug，但对于我们来说已经足够了。如果想得到更好的配置，可以使用 js-test-driver 或 其他类似工具，然而，关于 [js-test-dirver](http://code.google.com/p/js-test-driver/) 的配置超出了本文的范围。

#### 准备测试用例（Prepare Tests）

Qunit 单元测试经常要运行 src 目录里的 JavaScript 文件，由于测试是开发的一部分。如果你想测试刚刚发布的拼接压缩后的版本工作状况，需要创建一个新的 QUnit HTML 文件，并加载最后发布的文件。

下面是一个例子是 Qunit 的入口文件：

	<!DOCTYPE html>
	<html>
	<head>
	  <meta charset="utf-8">
	  <title>QUnit Example</title>
	  <link rel="stylesheet" href="../libs/qunit/qunit.css">
	</head>
	<body>
	  <div id="qunit"></div>
	  <div id="qunit-fixture"></div>
	  <script src="../libs/qunit/qunit.js"></script>

	  <!-- Use latest versionless copy of current release -->
	  <script src="../distrib/gruntdemo.min.js"></script>
	  <script src="tests.js"></script>
	</body>
	</html>

#### 安装插件（Install the Plugin）

将插件添加进package.json 的开发者依赖中，并且将其安装到本地 Npm 仓库。

使用如下命令：

	npm install grunt-contrib-qunit --save-dev

#### 配置插件（Configure Plugin）

配置 grunt-contrib-qunit 插件和配置前面的任务如出一辙。由于我们使用默认的 Qunit 配置，所以可以省略选项属性。不能忽略的是必须配置 target，指定全部的 Qunit HTML 文件。

接下来指定位于测试目录下的全部 HTML 文件，及其子目录应该运行 Qunit 测试：

	grunt.initConfig({
	  qunit:{
	    target: {
	      src: ['test/**/*.html']
	    }
	  },
	  // ... all previous tasks ...
	});

### 完整的 Grunt.js 文件（Final Grunt.js File）

下面是完整的 Gruntfile.js 配置信息：

	module.exports = function(grunt) {
	  var name, latest, bannerContent, devRelease, minRelease,
	      sourceMap, sourceMapUrl, lDevRelease, lMinRelease,
	      lSourceMapMin;

	  latest = '<%= pkg.name %>';
	  name = '<%= pkg.name %>-v<%= pkg.version%>';
	  bannerContent = '/*! <%= pkg.name %> v<%= pkg.version %> - ' +
	    '<%= grunt.template.today("yyyy-mm-dd") %> \n' +
	    ' *  License: <%= pkg.license %> */\n';
	  devRelease = 'distrib/'+name+'.js';
	  minRelease = 'distrib/'+name+'.min.js';
	  sourceMapMin = 'distrib/'+name+'.min.js.map';
	  sourceMapUrl = name+'.min.js.map';

	  lDevRelease = 'distrib/'+latest+'.js';
	  lMinRelease = 'distrib/'+latest+'.min.js';
	  lSourceMapMin = 'distrib/'+latest+'.min.js.map';

	  grunt.initConfig({
	    pkg: grunt.file.readJSON('package.json'),
	    qunit:{
	      target: {
	        src: ['test/**/*.html']
	      }
	    },
	    // configure copy task
	    copy: {
	      development: {
	        src: devRelease,
	        dest: lDevRelease
	      },
	      minified: {
	        src: minRelease,
	        dest: lMinRelease
	      },
	      smMinified: {
	        src: sourceMapMin,
	        dest: lSourceMapMin
	      }
	    },
	    // configure uglify task
	    uglify:{
	      options: {
	        banner: bannerContent,
	        sourceMapRoot: '../',
	        sourceMap: sourceMapMin,
	        sourceMappingURL: sourceMapUrl
	      },
	      target: {
	        src: ['src/**/*.js'],
	        dest: minRelease
	      }
	    },
	    // configure concat task
	    concat: {
	      options: {
	        banner: bannerContent
	      },
	      target: {
	        src: ['src/**/*.js'],
	        dest: devRelease
	      }
	    },
	    // configure jshint task
	    jshint: {
	      options: {
	        trailing: true,
	        eqeqeq: true
	      },
	      target: {
	        src: ['src/**/*.js', 'test/**/*.js']
	      }
	    }
	  });

	  grunt.loadNpmTasks('grunt-contrib-jshint');
	  grunt.loadNpmTasks('grunt-contrib-concat');
	  grunt.loadNpmTasks('grunt-contrib-uglify');
	  grunt.loadNpmTasks('grunt-contrib-copy');
	  grunt.loadNpmTasks('grunt-contrib-qunit');

	  grunt.registerTask('default', ['jshint', 'concat', 'uglify', 'copy', 'qunit']);
	};

## 结论（Conclusion）

现在 Grunt.js 配置好了，并且可以使用了。我们的目标是使配置尽可能简单，使用成对的 src/dest，通配符和模版。当然，Grunt.js 也提供其他更[高级的选项](http://gruntjs.com/configuring-tasks)。

如果能够自动下载和管理项目依赖的库，会变得更美好。我发现两个可行的解决方案，[Bower](http://bower.io/) 和 [Ender](http://ender.jit.su/)。我没有试过他们，但都可以管理前端JavaScript包和其依赖。

## 注

文章有些长，拖了很久的文章终于翻译完成了，我最近打算写一本关于 Grunt 指南的书籍，会详细讲解如何构建一套前端自动化工具，如果你支持我的工作，那就给我捐助吧。

原文：http://flippinawesome.org/2013/07/01/building-a-javascript-library-with-grunt-js/

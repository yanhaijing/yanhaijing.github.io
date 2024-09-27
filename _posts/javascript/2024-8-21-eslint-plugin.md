---
layout: post
title: 揭秘自定义 ESLint 插件开发，打造高效开发环境
category: js
tagline: '原创'
tags: [js]
keywords: [js]
description: 本文将揭秘如何开发自定义 ESLint 插件，帮助你打造更高效的开发环境，提升代码质量和团队协作效率。不容错过的实用指南！
---

{% include JB/setup %}

> 本文已收录到《[jsmini系列文章](https://yanhaijing.com/tags/#jsmini-ref)》

在工作中，我们会沉淀了一些最佳实践，一般工作中的一个项目可能由多个开发者负责，在这样的背景下，很难做到每个开发者对最佳实践都了然于胸，在遇到人员更迭的时候，就更难受了。

虽然可以通过代码审查发现问题，但是代码审查存在两个问题：一个是滞后问题，代码审查时已经开发完了；另一个是靠人来审查，难以 100%保证质量。

如何保障团队代码风格，最佳实践的一致性，让代码看起来就是一个人写的，本身就是一个难题。

如果能有一个智能助手，实时提示代码中的哪些部分可以使用工具库中的函数代替就好了。对于前端来说，这个助理就是 ESLint。

那么如何让 ESLint 支持我们的最佳实践呢，这可以通过 ESLint 的自定义插件来实现。要开发 ESLint 插件需要一些知识储备和经验，本文我将通过一个实例来教大家如何写一个 ESLint 插件。

本文通过一个真实案例来讲解，这个案例来源于我的实际工作，通过编写 ESLint 插件，并集成到项目，帮我解决了最佳实践的推广落地问题。

## 背景知识

下面先来介绍下背景知识，在我之前的文章《[如何回答面试中的JavaScript获取变量类型问题](https://yanhaijing.com/javascript/2022/07/09/js-type/)》中，提到过使用 typeof 和 instanceof 来判断变量类型是存在很多坑的，不信你看下面的例子，如果你对这个问题感兴趣，欢迎阅读我上面的文章：

```js
typeof []; // 'object'
typeof {}; // 'object' typeof c; // 'object'

[] instanceof Array // true
[] instanceof Object // true 注意这里
```

下面将写两个 ESLint 插件来解决对上面两个问题的校验。

## 插件

创建 ESLint 插件，ESLint 推荐使用 Yeoman generator。首先需要安装 Yeoman，安装命令如下：

```bash
$ npm i -g yo
```

Yeoman 是一款通用的初始化工具，想要初始化 ESLint 插件，需要安装 ESLint 模板，安装命令如下：

```bash
$ npm i -g generator-eslint
```

接下来，新建一个目录，目录名字按照自己喜好就行，命令如下：

```bash
$ mkdir eslint-plugin-utils
```

切换到上面新建的目录，执行“yo eslint:plugin”命令会进入交互界面，询问作者、插件名字等，输入如图所示的内容即可。

![]({{BLOG_IMG}}/644.png)

稍等片刻即可完成自动初始化，初始化成功后的目录结构如下所示。其中，lib/rules 目录存放自定义规则，tests/lib/rules 目录存放规则对应的单元测试代码。

```
.
├── .eslintrc.js
├── README.md
├── lib
│   ├── index.js
│   └── rules
├── package-lock.json
├── package.json
└── tests
    └── lib
        └── rules
```

ESLint 推荐使用测试驱动开发，要求每个规则都有完整的单元测试。

## type-typeof-limit

使用 typeof 操作符判断一个变量为对象时可能存在问题，如下面的 3 行代码都返回 true：

```js
typeof {} === 'object';
typeof [] === 'object';
typeof null === 'object';
```

下面写一个新规则，当发现“typeof \* === 'object'”时给出报错提示。首先使用“yo eslint:rule”命令新建一个规则，在询问界面中输入如图所示的内容。

![]({{BLOG_IMG}}/645.png)

完成上述操作后，会生成两个文件，分别是 lib/rules/type-typeof-limit.js 和 tests/lib/  
rules/type-typeof-limit.js。打开前一个文件，其内容如下：

```js
module.exports = {
  meta: {
    type: null, // `problem`, `suggestion`, or `layout`
    docs: {
      description: 'typeof不能用于对象和数组，请使用@jsmini/type',
      category: 'Fill me in',
      recommended: false,
      url: null, // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
  },

  create(context) {
    return {
      // visitor functions for different types of nodes
    };
  },
};
```

其中，meta 是规则的元数据，这里需要关注的字段的含义如下，更多字段可以查看 ESLint 官网。

- type：规则的类型，problem 代表报错，这里需要将 type 的值修改为 problem。
- docs：存放规则文档信息。
  - description：指定规则的简短描述，需要填写。
  - category：指定规则的分类信息，包括 Possible Errors、Best Practices、Variables 等，这里可以填入 Best Practices。
- fixable：表示这个规则是否提供自动修复功能，当其值被设置为 true 时，还需要提供自动修复的代码。

create 函数里面是具体的逻辑，其返回一个对象，该对象的属性名表示节点类型，在向下遍历树时，当遍历到和属性名匹配的节点时，ESLint 会调用属性名对应的函数。例如，我们要写的这个规则的 create 函数如下，其含义是每次遇到 BinaryExpression 节点，都会调用传递给 BinaryExpression 属性的函数。

```js
module.exports = {
  create(context) {
    return {
      BinaryExpression: (node) => {},
    };
  },
};
```

现在读者可能还不理解 BinaryExpression 的含义，这里需要介绍 ESLint 的原理。ESLint 会将每个 JavaScript 文件解析为抽象语法树（Abstract Syntax Tree，AST），简称语法树。ESLint 官网提供了一款工具，可以查看指定代码解析后的 AST。例如，下面的代码：

```js
typeof a === 'object';
```

ESLint 解析上述代码后会返回一个嵌套的 AST，每个节点中的 type 属性表示当前节点的类型，观察下面的 AST，上面的判断表达式可以用下面的逻辑来判断：

- BinaryExpression 节点。
- left.operator 为 typeof。
- operator 为===或==。
- right 为 Literal，并且 value 为 object。

ESLint 会把 JavaScript 代码解析为 AST，该 AST 使用 JSON 格式表示的代码如下：

```json
{
  "type": "Program",
  "start": 0,
  "end": 21,
  "body": [
    {
      "type": "ExpressionStatement",
      "start": 0,
      "end": 21,
      "expression": {
        "type": "BinaryExpression",
        "start": 0,
        "end": 21,
        "left": {
          "type": "UnaryExpression",
          "start": 0,
          "end": 8,
          "operator": "typeof",
          "prefix": true,
          "argument": {
            "type": "Identifier",
            "start": 7,
            "end": 8,
            "name": "a"
          }
        },
        "operator": "===",
        "right": {
          "type": "Literal",
          "start": 13,
          "end": 21,
          "value": "object",
          "raw": "'object'"
        }
      }
    }
  ],
  "sourceType": "module"
}
```

ESLint 遍历到 BinaryExpression 节点后会执行传递给 BinaryExpression 属性的函数，并将 BinaryExpression 节点传递给这个函数，然后进行上面的逻辑判断，如果为 true，则使用 context.report 报告错误。示例代码如下：

```js
module.exports = {
  create(context) {
    return {
      BinaryExpression: (node) => {
        const operator = node.operator;
        const left = node.left;
        const right = node.right;

        if (
          (operator === '==' || operator === '===') &&
          left.type === 'UnaryExpression' &&
          left.operator === 'typeof' &&
          right.type === 'Literal' &&
          right.value === 'object'
        ) {
          context.report({
            node,
            message: 'typeof不能用于对象和数组，请使用 @jsmini/type',
          });
        }
      },
    };
  },
};
```

前面提到了 ESLint 推荐使用测试驱动开发，上面的代码可以通过写单元测试来快速验证结果，修改 tests/lib/rules/type-typeof-limit.js 文件中的内容如下，其中包括三个单元测试：一个合法的单元测试和两个非法的单元测试。

```js
const rule = require('../../../lib/rules/type-typeof-limit'),
  RuleTester = require('eslint').RuleTester;

const msg = 'typeof不能用于对象和数组，请使用@jsmini/type';

const ruleTester = new RuleTester();
ruleTester.run('type-typeof-limit', rule, {
  valid: [{ code: 'typeof a == "number"' }, { code: 'a == "object"' }],

  invalid: [
    {
      code: 'typeof a == "object"',
      errors: [
        {
          message: msg,
        },
      ],
    },
    {
      code: 'typeof a === "object"',
      errors: [
        {
          message: msg,
        },
      ],
    },
  ],
});
```

写好单元测试后，执行“npm test”命令即可运行测试，如果看到如图所示的输出，则表示单元测试通过了。

![]({{BLOG_IMG}}/646.png)

下面在真实实验环境下新建插件，由于我们的插件还没有发布，因此需要通过 link 的方式使用。

首先在插件目录下执行如下命令，这会将本地的插件链接到本地的 npm 全局目录。

```bash
$ npm link
```

新建一个空项目 eslint-plugin-utils-demo，并初始化 ESLint 配置，接下来，在 eslint-  
plugin-utils-demo 根目录下执行下面的命令，这会在 node_modules 目录下创建一个软链接。

```bash
$ npm link @jsmini/eslint-plugin-utils
```

接下来，修改 eslint-plugin-utils-demo 根目录下的.eslintrc.js 文件，添加如下代码：

```js
module.exports = {
  plugins: ['@jsmini/utils'],
  rules: {
    '@jsmini/utils/type-typeof-limit': 2,
  },
};
```

在本地新建一个 xxx.js 文件，并在该文件中输入如下代码：

```js
typeof a === 'object';
```

如果能够看到如图所示的红色波浪线，当将鼠标指针悬停到波浪线上时，显示如图所示的错误信息，则表示成功了。

![]({{BLOG_IMG}}/647.png)

## type-instanceof-limit

参考上面 type-typeof-limit 插件的内容，可以实现校验如下的代码：

```js
a instanceof Object;
```

新建一个名字为 type-instanceof-limit 的插件，这部分就不再展开介绍了，该插件的核心代码如下：

```js
module.exports = {
  create(context) {
    function check(node) {
      const operator = node.operator;

      if (operator === 'instanceof') {
        context.report({
          node,
          message: 'instanceof操作符可能存在问题,请使用@jsmini/type',
        });
      }
    }

    return {
      BinaryExpression: check,
    };
  },
};
```

## recommended

现在已经有 2 个规则了，随着规则的增多，需要用户手动修改 rules。ESLint 配置示例如下：

```js
module.exports = {
  plugins: ['@jsmini/utils'],
  rules: {
    '@jsmini/utils/type-typeof-limit': 2,
    '@jsmini/utils/type-instanceof-limit': 2,
  },
};
```

其实插件可以提供推荐的配置，类似 eslint:recommended，用户直接使用推荐的配置即可。修改 lib/index.js 文件中的 exports，添加 configs 配置，示例代码如下：

```js
module.exports = {
  rules: requireIndex(__dirname + '/rules'),
  configs: {
    plugins: ['@jsmini/utils'],
    rules: {
      '@jsmini/utils/type-typeof-limit': 'error',
      '@jsmini/utils/type-instanceof-limit': 'error',
    },
  },
};
```

接下来，用户就可以直接像下面这样使用，而不需要单独配置 plugins 和 rules 了。

```js
module.exports = {
  extends: ['@jsmini/utils:recommended'],
};
```

## 总结

在本文中，我们探讨了如何通过编写自定义 ESLint 插件来保障团队代码风格和最佳实践的一致性。我们首先介绍了 ESLint 插件开发的背景知识，然后详细讲解了如何使用 Yeoman generator 创建 ESLint 插件。通过具体案例，我们编写了两个 ESLint 插件：`type-typeof-limit` 和 `type-instanceof-limit`，并展示了如何在项目中集成和测试这些插件。此外，我们还讨论了如何为插件提供推荐配置，以简化用户的配置过程。

通过这些步骤，我们可以确保团队代码风格统一，减少代码审查中的问题，提高代码质量。

欢迎大家阅读和分享这篇文章，如果有任何疑问或建议，欢迎在评论区留言。感谢大家的支持和阅读！

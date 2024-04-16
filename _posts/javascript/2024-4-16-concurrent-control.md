---
layout: post
title: 异步难题：前端并发控制全解析
category: javascript
tagline: '原创'
tags: [javascript]
keywords: [javascript]
description: 本文讲解Promise，callback，RxJS多种方式实现并发限制，通过示例循序渐进讲解，如何实现带数量限制的并发请求。
---

{% include JB/setup %}

本文讲解Promise，callback，RxJS多种方式实现并发限制，通过示例循序渐进讲解，如何实现带数量限制的并发请求，这来源于笔者业务中的真实场景，同时也是一道前端面试题，作为面试题的话，一般是考察对`Promise`的理解。

## 问题
笔者的业务中，经常存在通过一堆`ids`，批量获取的场景，其中最复杂的一个场景是获取数千个手机号的数据，对于这种场景，发送请求并不容易。

这里先交代下背景，笔者的系统是运行在 http2 上的，由于 http2 支持并发处理，所以在笔者的系统里，后端接口设计是基于这个假设的，后端不会提供批量获取的接口，需要前端通过 id 来逐个获取。

当同时发送上千个请求时，浏览器会变的明显卡顿，虽然这样发送可以更快的获取数据，但会带来不好的用户体验，笔者的解决方案是，给并发添加最大数量限制。

这里我们将问题定义为，给你`ids`和并发限制`max`，一般作为面试题，会让你直接实现如下的函数：

```js
function gets(ids, max) {
}
```

补充一点，如果是 http1.1，浏览器会有默认的并发限制，并不需要我们处理这个问题，比如Chrome 中并发数量是6个，所以这个问题的成立，建立在 http2 的基础上，如果是在面试中，不要忘了提这个知识点。

## Promise
目前来说，Promise是最通用的方案，一般我们最先想到`Promise.all`，当然最好是使用新出的`Promise.allsettled`。

下面简单介绍下二者的区别，假如存在某个请求失败时，`all`会整体失败，而`allsettled`只会让单个请求失败，对于大部分情况来说，`allsettled`的是更好的选择，因为`allsettled`更为灵活，一般来说面对这种情况，总共有三种处理方式，如下所示，`all`只能支持第一种，而`allsettled`三种都支持：

- 整体失败
- 最终结果，过滤失败的选项
- 将单个失败的保留，并渲染到UI中

##### 方法1 全部并发
直接使用`Promise.all`是最简单的，代码如下，然后`all`并没有并发控制能力，一瞬间会将全部请求发出，从而造成前面提到的浏览器卡顿问题。

这里`get`函数我们使用`setTimeout`+随机时间来模拟请求，其返回promise实例。

```js
function gets(ids, max) {
  return Promise.all(ids.map(id => get(id)))
}

function get(id) {
  return new Promise((resolve) => {
    setTimeout(() => { resolve({ id }) }, Math.ceil(Math.random() * 5))
  });
}
```

##### 方法2 分批并发
你可能会想到一种分批发送的办法，将请求按`max`数量分成N个组，每组并行发送，这需要结合递归和`Promise.all`，示例代码如下：

```js
function gets(ids, max) {
  let index = 0;
  const result = [];

  function nextBatch() {
    const batch = ids.slice(index, index + max);
    index += max;

    return Promise.all(batch.map(get)).then((res) => {
      result.push(...res);
      if (index < ids.length) {
        return nextBatch();
      }
      return result;
    });
  }

  return nextBatch();
}
```

这种方法的优势在于实现相对简单，容易理解。但是它的缺点是，每一批请求中的最慢的请求会决定整个批次的完成时间，这可能会导致一些批次的其他请求早早完成后需要等待，从而降低整体的并发效率。

这种方法在业务中是不太能接受的，面试中的话，也只能勉强及格。

##### 方法3 限制并发
一个更高效的思路是使用异步并发控制，而不是简单的批处理。这种方法可以在任何时刻都保持最大数量的并发请求，而不需要等待整个批次完成。这需要我们维护一个请求池，在每个请求完成时，将下一个请求添加到请求池中，示例代码如下：

`gets`函数返回一个promise，在请求全部完成后，promise变为`fulfilled`状态；内部采用递归，每个请求成功和失败后，发送下一个请求；在最下面先发送`max`个请求到请求池中。

```js
function gets(ids, max) {
  return new Promise((resolve) => {
    const res = [];
    let loadcount = 0;
    let curIndex = 0;
    function load(id, index) {
      return get(id).then(
        (data) => {
          loadcount++;
          if (loadcount === ids.length) {
            res[index] = data;
            resolve(res);
          } else {
            curIndex++;
            load(ids[curIndex]);
          }
        },
        (err) => {
          res[index] = err;
          loadcount++;
          curIndex++;
          load(ids[curIndex]);
        }
      );
    }

    for (let i = 0; i < max && i < ids.length; i++) {
      curIndex = i;
      load(ids[i], i);
    }
  });
}
```

当然这个代码还有其他实现方式，这里是笔者习惯的方式，聪明的你快来想想其他实现方式吧。

## callback
在Promise之前，js中的异步都是基于回调函数的，比如 jQuery 的 ajax，Node.js 中的 http 模块等。

茴字有多种写法，下面我们挑战一下使用callback来解决这个问题。下面我们先把`get`函数改造一下，基于回调函数的`get`如下所示：

```js
function get(id, success, error) {
  setTimeout(() => success({ id }), Math.ceil(Math.random() * 5))
}
```

`gets`函数的接口也要改成回调函数，如下所示：

```js
function gets(ids, max, success, error) {}
```

回调函数也是基于上面的思路，把上面的代码稍加改动即可，将其中的Promise换成`callback`，示例如下：

还记得前面让你想其他思路吗，还有一种结合递归和异步函数的方法，在Promise下会比这种方法更简单，但其实还是这个思路更好，Promise和callback都可以使用。

```js
function gets(ids, max, success, error) {
  const res = [];
  let loadcount = 0;
  let curIndex = 0;
  function load(id, index) {
    return get(
      id,
      (data) => {
        loadcount++;
        if (loadcount === ids.length) {
          res[index] = data;
          success(res);
        } else {
          curIndex++;
          load(ids[curIndex]);
        }
      },
      (err) => {
        res[index] = err;
        loadcount++;
        curIndex++;
        load(ids[curIndex]);
      }
    );
  }

  for (let i = 0; i < max && i < ids.length; i++) {
    curIndex = i;
    load(ids[i], i);
  }
}
```

## RxJS
最后我们来看看RxJS，这其实是我最想说的方法，笔者深度使用RxJS多年，相信绝大部分人都不太了解RxJS，RxJS号称异步编程的lodash，对于这个问题，其代码实现会非常简单。

> RxJS 是一个用于处理异步数据流的 JavaScript 库，它通过**可观察对象**（Observable）来代表随时间推移发出值的数据流。你可以使用一系列操作符（如 `map`、`filter`、`merge` 等）来处理这些数据流，并通过**订阅**（subscribe）来观察并执行相关操作。RxJS 使得处理复杂的异步逻辑变得简单而优雅，特别适合于实现并发控制等场景。

上面是RxJS的简介，相信看完了还是不理解，RxJS其实是比较难学的，建议大家阅读其他扩展资料，这里让我们聚焦我们的问题。

下面先用RxJS改造我们的`get`函数，改造完如下所示，这需要用到`Observable`和`observer`，这些都是RxJS的概念，即便不知道其含义，看代码和Promise是比较相似的。

```
import { Observable } from 'RxJS';

function get(id) {
  return new Observable((observer) => {
    setTimeout(() => {
      observer.next({ id });
      observer.complete();
    }, Math.ceil(Math.random() * 5));
  });
}
```

下面我们参考Promise中的思路，依次看看在RxJS中如何实现。

##### 方法1 全部并发
在RxJS中和`Promise.all`类似的功能是`forkJoin`，这种方法最简单，代码如下所示，和`Promise.all`类似，这并不满足我们的需求。

```js
import { forkJoin } from 'RxJS';

function gets(ids) {
  const observables = ids.map(get);
  return forkJoin(observables);
}
```

##### 方法2 分批并发
下面来看下如何实现分批并发，在Promise中我们使用递归+`Promise.all`来实现的。

在RxJS中，我们使用`concatMap`操作符来确保这些组是依次处理的，而不是同时处理。在处理每个组时，我们使用`forkJoin`来并行处理组内的所有请求。最后，我们使用`reduce`操作符来将所有组的结果合并成一个一维数组。

如果不理解RxJS，我们单纯看代码，可以看到RxJS代码的表现性更强，通过语义化的操作符串联，就完成了Promise中很多命令式的代码。

```js
import { from, forkJoin } from 'RxJS';
import { concatMap, reduce } from 'RxJS/operators';

function gets(ids, max) {
  // 将ids按max分组
  const groups = [];
  for (let i = 0; i < ids.length; i += max) {
    groups.push(ids.slice(i, i + max));
  }

  // 使用concatMap控制组之间的串行执行，并在每一组内使用forkJoin实现并行请求
  // 使用reduce来收集和合并所有组的结果
  return from(groups).pipe(
    concatMap((group) => forkJoin(group.map(get))),
    reduce((acc, results) => acc.concat(results), [])
  );
}
```

##### 方法3 限制并发
最后我们来看看RxJS如何实现限制并发，在这个实现中，我们使用`mergeMap`来控制并发，并使用一个`Map`对象来存储每个请求的结果，其中键是ID，值是请求结果。这样，我们可以在所有请求完成后，按照原始ID数组的顺序从`Map`中提取结果。

示例代码如下，控制并发是RxJS支持的功能，实现就是一个参数，非常简单，对比前面的代码，可以看到RxJS的代码非常短小精悍，操作符的也非常容易读懂。

```js
function gets(ids, max) {
  return from(ids).pipe(
    mergeMap((id) => get(id).pipe(
      map(result => ({ id, result }))
    ), max),
    reduce((acc, { id, result }) => acc.set(id, result), new Map()),
    map(resMap => ids.map(id => resMap.get(id)))
  );
}
```

## 总结
在本文中，我们探讨了使用Promise，callback和RxJS的方式实现并发限制，每种方式中又介绍了三种代码思路，包括简单的批处理、分组并发以及具有顺序保留的并发控制。每种方法都有其适用场景和优缺点：

-   **简单的批处理**适用于需要将请求分批次处理的场景，简单易懂，但可能不是最高效的方法。
-   **分组并发**在保持一定并发度的同时，避免同时发出过多的请求，适用于需要控制资源消耗的场景。
-   **具有顺序保留的并发控制**则结合了并发的高效性和结果顺序的一致性，适用于对结果顺序有要求的并发请求处理。

通过选择合适的方法，我们可以在保证性能的同时，满足不同场景下对并发控制的需求。

再次给大家安利RxJS，RxJS作为一个强大的响应式编程库，为我们提供了灵活而强大的工具来处理这些复杂的异步逻辑。

文章的最后，我想引申下请求层的概念，在实际项目中，请求层的设计和实现对整个应用的性能和稳定性至关重要。一个健壮的请求层不仅能够处理基本的数据请求和响应，还能够应对各种复杂的网络环境和业务需求。以下是请求层可以处理的一些常见问题：

-   **失败和错误处理**：优雅地处理请求失败和服务器返回的错误，提升用户体验。
-   **失败重试**：在请求失败时自动重试，增加请求的成功率。
-   **接口降级**：在服务不可用时，提供备选方案，保证应用的基本功能。
-   **模拟接口**：在后端服务尚未开发完成时，模拟接口响应，加速前端开发。
-   **模拟列表接口**：模拟分页、排序等列表操作，方便前端调试和测试。
-   **接口聚合和竞态**：合并多个接口请求，减少网络开销；处理接口请求的竞态问题，确保数据的一致性。
-   **逻辑聚合**：将多个资源的创建和更新等操作聚合成一个请求，简化前端逻辑。
-   **控制并发数量**：限制同时进行的请求数量，避免过度消耗资源。
-   **前端分页**：在前端进行数据分页，减轻后端压力。
-   **超时设置**：为每个请求设置超时时间，防止长时间等待。

通过在请求层中实现这些功能，我们可以使得前端应用更加稳定和可靠，同时也提升了用户的体验。因此，**加强请求层的建设**是每个前端项目都应该重视的一个方面。

感谢大家的阅读！希望这篇文章能够为你在处理并发请求和优化请求层方面提供一些有价值的见解。如果你对请求层的这些内容感兴趣，或者有任何想法和经验想要分享，请在评论区留言，我非常期待大家的交流和讨论。

再次感谢，祝大家编程愉快！
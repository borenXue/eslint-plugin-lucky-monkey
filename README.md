# eslint-plugin-lucky-monkey

[![Travis CI](https://img.shields.io/travis/borenXue/eslint-plugin-lucky-monkey/master.svg)](https://travis-ci.org/borenXue/eslint-plugin-lucky-monkey)
[![Join the chat at https://gitter.im/eslint-plugin-lucky-monkey/design](https://badges.gitter.im/eslint-plugin-lucky-monkey/design.svg)](https://gitter.im/eslint-plugin-lucky-monkey/design?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

## 安装

首先需要安装 [ESLint](http://eslint.org):

```bash
$ npm install -D eslint
$ npm install -D eslint-plugin-lucky-monkey
```

如果你的项目是 Vue 项目, 则需要安装 [`vue-eslint-parser`](https://www.npmjs.com/package/vue-eslint-parser)。或者安装 [`eslint-plugin-vue`](https://www.npmjs.com/package/eslint-plugin-vue) 也可以, 因为该插件也依赖于 [`vue-eslint-parser`](https://www.npmjs.com/package/vue-eslint-parser)

## 快速上手

> 修改 eslint 配置文件

```javascript
module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  extends: [
    'plugin:lucky-monkey/recommended'
    // Vue 项目请使用 vue-recommended (涵盖了 recommended 的所有规则)
    // 'plugin:lucky-monkey/vue-recommended'
  ],
  rules: {
    // 不允许项目中使用 google.cn 和 google.com 域名除外的其他域名下的资源文件 (html 不包含在内)
    'lucky-monkey/assert-hostname': ['error', {
      allowDomain: ['google\\.(cn|com)']
    }],
    // Vue 项目还需要添加 vue-assert-hostname
    'lucky-monkey/vue-assert-hostname': ['error', {
      allowDomain: ['google\\.(cn|com)']
    }]
  }
}
```

## 规则

* [`dead-protocol`](https://borenxue.github.io/eslint-plugin-lucky-monkey/#/rules/dead-protocol)
* [`assert-hostname`](https://borenxue.github.io/eslint-plugin-lucky-monkey/#/rules/assert-hostname)

#### Vue 相关规则

* [`vue-dead-protocol`](https://borenxue.github.io/eslint-plugin-lucky-monkey/#/rules/vue-dead-protocol)
* [`vue-assert-hostname`](https://borenxue.github.io/eslint-plugin-lucky-monkey/#/rules/vue-assert-hostname)

## QA

> 我只想使用某个规则该怎么配置?

```javascript
module.exports = {
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  plugins: ['weiyi'],
  rules: {
    // 在这里配置你想要使用的规则
    'lucky-monkey/dead-protocol': 'error'
  }
}
```

## [更新记录](https://github.com/borenXue/eslint-plugin-lucky-monkey/releases)
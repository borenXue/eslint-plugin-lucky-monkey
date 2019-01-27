# assert-hostname

## 规则说明

是否允许项目中包含指定域名外的其他域名的资源文件引用, 默认允许所有域名。

> 示例如下

```json
{
  "rules": {
    "lucky-monkey/vue-assert-hostname": ["error", {
      "allowDomain": "google\\.(cn|com)"
    }]
  }
}
```

#### 参数说明

* **allowDomain**: 指定允许的资源域名
  * 类型: `String`、`Array[String]`
  * 默认值: `[]`, 代表允许所有域名
  * 支持正则表达式
  * 字符串或数组内的字符串会被使用 `new RegExp(str)` 来生成正则表达式
* **res**: 资源文件的判断规则
  * 类型: `Array[String]`
  * 默认值: `["\\.(gif|png|jpg|jpeg|webp|js|css|json)$"]`
  * 支持正则表达式
  * 字符串或数组内的字符串会被使用 `new RegExp(str)` 来生成正则表达式

## 规则示例

```xml
<!-- bad  <index.vue> -->
<template>
  <div>
    <span>图片地址: //a.b.com/abcdefg.gif </span>
    <img src="//a.b.com/abcdefg.gif?nw=1">
  </di>
</template>

<!-- good <index.vue> -->
<template>
  <div>
    <span>图片地址: //a.google.cn/abcdefg.gif </span>
    <img src="//a.google.com/abcdefg.gif?nw=1">
  </di>
</template>
```
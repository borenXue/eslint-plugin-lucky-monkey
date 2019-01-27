# vue-dead-protocol

## 规则说明

是否允许出现 `http:`、`https:`, 支持自动 fix, fix 规则: `http://`、`https://` 会被替换为 `//`

## 规则示例

```xml
<!-- bad  <index.vue> -->
<template>
  <div>
    <span>图片地址: http://a.b.com/abcdefg.gif </span>
    <img src="https://a.b.com/abcdefg.gif?nw=1">
  </di>
</template>

<!-- good <index.vue> -->
<template>
  <div>
    <span>图片地址: //a.b.com/abcdefg.gif </span>
    <img src="//a.b.com/abcdefg.gif?nw=1">
  </di>
</template>
```
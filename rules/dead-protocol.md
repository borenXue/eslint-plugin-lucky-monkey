# dead-protocol

## 规则说明

是否允许出现 `http:`、`https:`, 支持自动 fix, fix 规则: `http://`、`https://` 会被替换为 `//`

## 规则示例

```javascript
// bad  <index.js> 或 <index.vue 中的 script 部分的内容>
const url1 = 'http://a.b.com/abcdefg.gif?nw=1'
const url2 = `https://a.b.com/abcdefg.gif?nw=1`

// good <index.js> 或 <index.vue 中的 script 部分的内容>
const url = '//a.b.com/abcdefg.gif?nw=1'
```
# assert-hostname

## 规则说明

是否允许项目中包含指定域名外的其他域名的资源文件引用, 默认允许所有域名。

> 示例如下

```json
{
  "rules": {
    "lucky-monkey/assert-hostname": ["error", {
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

```javascript
// bad  <index.js> 或 <index.vue 中的 script 部分的内容>
const url1 = '//a.b.com/abcdefg.gif'
const url2 = '//a.b.com/abcdefg.gif?nw=1'

// good <index.js> 或 <index.vue 中的 script 部分的内容>
const url1 = '//a.google.cn/abcdefg.gif'
const url2 = '//a.google.com/abcdefg.gif?nw=1'
```
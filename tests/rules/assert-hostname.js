
const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/assert-hostname').default;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

/**
 * 生成 valid 集合
 */
const valid = []
const Utils = require('../util');
const options = [{
  allowDomain: ['google\\.(cn|com)']
}]

for (const protocol of Utils.thirdParty.protocols) {
  for (const domain of Utils.thirdParty.domains) {
    for (const ext of Utils.thirdParty.exts) {
      for (const endstr of Utils.thirdParty.endstrs) {
        valid.push({options, code: `var a = '${protocol}${domain}${Utils.thirdParty.file}${ext}${endstr}';`})
        valid.push({options, code: `var a = \`${protocol}${domain}${Utils.thirdParty.file}${ext}${endstr}\`;`})
      }
    }
  }
}
valid.push({options, code: "var a = '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html';"})
valid.push({options, code: "var a = '//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe';"})

/**
 * invalid
 */
const invalid = []
const invalidUrls = [
  "//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif",
  "//wpimg.baidu.org/f778738c-e4f8-4870-b634-56703b4acafe.png",
  "//wpimg.baidu.org/f778738c-e4f8-4870-b634-56703b4acafe.png?afefg",
  "https://wpimg.baidu.org/f778738c-e4f8-4870-b634-56703b4acafe.png#defg",
]
for (const invalidUrl of invalidUrls) {
  invalid.push({
    code: `var a = '${invalidUrl}';`,
    options,
    errors: [{
      message: `invalid resource file: ${invalidUrl}`,
      type: 'Literal'
    }]
  })
  // es6
  invalid.push({
    code: `var a = \`${invalidUrl}\`;`,
    options,
    errors: [{
      message: `invalid resource file: ${invalidUrl}`,
      type: 'TemplateLiteral'
    }]
  })
}

ruleTester.run('assert-hostname', rule, {
  valid: valid.concat([
    'var a = "http://a.b.com/d.gif"'
  ]),
  invalid,
})


const RuleTester = require('eslint').RuleTester;
const rule = require('../../lib/rules/vue-assert-hostname').default;

const ruleTester = new RuleTester({
  parser: 'vue-eslint-parser',
  parserOptions: { ecmaVersion: 2015 }
});

const options = [{
  allowDomain: ['google\\.(cn|com)']
}]

/**
 * 生成 valid 集合
 */
const valid = []
const Utils = require('../util');
for (const protocol of Utils.thirdParty.protocols) {
  for (const domain of Utils.thirdParty.domains) {
    for (const ext of Utils.thirdParty.exts) {
      for (const endstr of Utils.thirdParty.endstrs) {
        valid.push({
          options,
          filename: 'test.vue',
          code: `
            <template>
              <div>
                <span>${protocol}${domain}${Utils.thirdParty.file}${ext}${endstr}</span>
              </div>
            </template>
          `
        })
        valid.push({
          options,
          filename: 'test.vue',
          code: `
            <template>
              <div>
                <img src="${protocol}${domain}${Utils.thirdParty.file}${ext}${endstr}">
              </div>
            </template>
          `
        })
      }
    }
  }
}
valid.push({
  options,
  filename: 'test.vue',
  code: `
    <template>
      <div>
        <span>//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html</span>
      </div>
    </template>
  `
})
valid.push({
  options,
  filename: 'test.vue',
  code: `
    <template>
      <div>
        <img src="//wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.html">
      </div>
    </template>
  `
})

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
    options,
    filename: 'test.vue',
    code: `
      <template>
        <div>
          <span>${invalidUrl}</span>
        </div>
      </template>
    `,
    errors: [{
      message: `invalid resource file: ${invalidUrl}`,
    }]
  })
  invalid.push({
    options,
    filename: 'test.vue',
    code: `
      <template>
        <div>
          <img src="${invalidUrl}">
        </div>
      </template>
    `,
    errors: [{
      message: `invalid resource file: ${invalidUrl}`,
    }]
  })
}

ruleTester.run('weiyi/vue-no-third-party-res', rule, {
    valid,
    invalid,
})

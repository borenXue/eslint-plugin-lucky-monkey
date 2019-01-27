
import UrlRegex from 'url-regex'
import UrlParse from "url-parse"

//------------------------------------------------------------------------------
// assert-hostname
//------------------------------------------------------------------------------

const defaultRes = [
  '\\.(gif|png|jpg|jpeg|webp|js|css|json)$'
]

export function thirdPartyResValid (value, allowDomain, res) {
  const obj = {
    valid: true,
    message: '',
  };
  if (!allowDomain || allowDomain.length === 0) return obj
  const result = value.match(UrlRegex())
  if (result && result.length > 0) {
    for (const item of result) {
      const itemParseObj = UrlParse(item)
      const pathName = getFixUrlComma(itemParseObj.pathname)
      const href  = getFixUrlComma(itemParseObj.href)
      if (
        !isMathedOne(itemParseObj.hostname, allowDomain) &&
        isMathedOne(pathName, res || defaultRes)
      ) {
        obj.valid = false;
        obj.message = 'invalid resource file: ' + href;
        return {
          valid: false,
          message: `invalid resource file: ${href}`
        };
      }
    }
  }
  return obj;
}

// Remove the first and last digits of single quotes and double quotes
function getFixUrlComma(str) {
  str = str.replace(/^'/, '').replace(/'$/, '')
        .replace(/^"/, '').replace(/"$/, '')
        .replace(/^`/, '').replace(/`$/, '')
  return str
}

function isMathedOne(val, arr) {
  if (!arr) return false
  for (var i = 0; i < arr.length; i++) {
    if (new RegExp(arr[i]).test(val)) return true
  }
  return false
}


//------------------------------------------------------------------------------
// dead-protocol
//------------------------------------------------------------------------------

export const deadProtocolMessages = {
  deadHttp: 'Avoid using the string "http://"',
  deadHttps: 'Avoid using the string "https://"',
}

export function deadProtocolValidAndFixLiteral (str) {
  var obj = {
    valid: false,
    fixStr: '',
    messageId: '',
  };
  if (str.indexOf('http://') >= 0) {
    obj.valid = false;
    obj.messageId = 'deadHttp';
    obj.fixStr = str.replace(/http:\/\//g, '//');
  } else if (str.indexOf('https://') >= 0) {
    obj.valid = false;
    obj.messageId = 'deadHttps';
    obj.fixStr = str.replace(/https:\/\//g, '//');
  } else {
    obj.valid = true;
  }
  return obj;
}


//------------------------------------------------------------------------------
// vue support
//------------------------------------------------------------------------------

module.exports.defineVueTemplateBodyVisitor = function (context, templateBodyVisitor, scriptVisitor) {
  if (context.parserServices.defineTemplateBodyVisitor == null) {
    context.report({
      loc: { line: 1, column: 0 },
      message: 'Use the latest vue-eslint-parser. See also https://github.com/vuejs/eslint-plugin-vue#what-is-the-use-the-latest-vue-eslint-parser-error'
    })
    return {}
  }
  return context.parserServices.defineTemplateBodyVisitor(templateBodyVisitor, scriptVisitor)
}

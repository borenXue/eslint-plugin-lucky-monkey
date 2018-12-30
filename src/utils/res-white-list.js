
import UrlRegex from 'url-regex'
import UrlParse from "url-parse"

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

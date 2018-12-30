
import _curry from 'lodash/curry'
import { thirdPartyResValid } from '../utils/res-white-list'

const literalHandlerCurried = _curry(literalHandler)

export default {
  meta: {
    docs: {
      description: "res resource white list.",
      category: "Variables",
      recommended: true,
      url: ""
    },
    schema: [{
      type: 'object',
      properties: {
        allowDomain: {
          anyOf: [
            { type: 'string' },
            {
              type: 'array',
              items: { type: 'string' }
            }
          ]
        },
        res: {
          type: 'array',
          items: { type: 'string' }
        }
      },
      additionalProperties: false
    }]
  },
  create (context) {
    return {
      Literal: literalHandlerCurried(context)(false),
      TemplateLiteral: literalHandlerCurried(context)(true)
    }
  }
}

function extractParams(context) {
  const result = {}
  const paramObj = context.options && typeof context.options[0] === 'object' ? context.options[0] : {}
  if (paramObj.allowDomain) {
    if (typeof paramObj.allowDomain === 'string') {
      result.allowDomain = [paramObj.allowDomain]
    } else if (paramObj.allowDomain instanceof Array) {
      result.allowDomain = paramObj.allowDomain
    }
  }
  if (paramObj.res && paramObj.res instanceof Array) {
    result.res = paramObj.res
  }
  return result
}

function literalHandler(context, isTemplate, node) {
  const value = context.getSourceCode().getText(node);
  const { allowDomain, res } = extractParams(context)
  if (typeof value === 'string') {
    var validObj = thirdPartyResValid(value, allowDomain, res);
    if (!validObj.valid) {
      context.report({
        node: node,
        message: validObj.message
      });
    }
  }
}

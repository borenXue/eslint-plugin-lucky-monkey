/**
 * @fileoverview Rule to disallow dead protocol
 * @author luck-monkey
 *
 */

const _curry = require('lodash/curry');
const {
  thirdPartyResValid,
  defineVueTemplateBodyVisitor,
} = require('../utils');

const literalHandlerCurried = _curry(literalHandler)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

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
    return defineVueTemplateBodyVisitor(context, {
      VLiteral: literalHandlerCurried(context),
      VText: literalHandlerCurried(context),
    })
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

function literalHandler(context, node) {
  const originText = context.getSourceCode().getText(node);
  const { allowDomain, res } = extractParams(context)
  const validObj = thirdPartyResValid(originText, allowDomain, res);
  if (!validObj.valid) {
    context.report({
      node: node.key,
      loc: node.loc,
      message: validObj.message
    });
  }
}

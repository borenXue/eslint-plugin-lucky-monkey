
var _curry = require('lodash/curry');
var { deadProtocolValidAndFixLiteral, deadProtocolMessages } = require('../utils');

function literalHandler(context, isTemplate, node) {
  var value = context.getSourceCode().getText(node);
  if (typeof value === 'string' && value) {
    var validObj = deadProtocolValidAndFixLiteral(value);
    var valid = validObj.valid,
      fixStr = validObj.fixStr,
      messageId = validObj.messageId;
    if (!valid) {
      context.report({
        node,
        messageId,
        fix: function(fixer) {
          return fixer.replaceText(node, fixStr);
        }
      });
    }
  }
}
var literalHandlerCurried = _curry(literalHandler)

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

export default {
  meta: {
    docs: {
      description: "Use window.location.protocol instead of 'http:' or 'https:'",
      category: "Variables",
      recommended: true,
      url: ''
    },
    messages: deadProtocolMessages,
    fixable: "code",
    schema: []
  },
  create: function(context) {
    return {
      Literal: literalHandlerCurried(context)(false),
      TemplateLiteral: literalHandlerCurried(context)(true),
    };
  }
}

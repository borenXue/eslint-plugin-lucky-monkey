/**
 * @fileoverview Rule to disallow dead protocol
 * @author luck-monkey
 *
 */

"use strict";

import _curry from 'lodash/curry';
import { deadProtocolValidAndFixLiteral, deadProtocolMessages, defineVueTemplateBodyVisitor } from '../utils';

function literalHandler(context, node) {
  const originText = context.getSourceCode().getText(node);
  const validObj = deadProtocolValidAndFixLiteral(originText);
  const valid = validObj.valid;
  const fixStr = validObj.fixStr;
  const messageId = validObj.messageId;
  if (!valid) {
    context.report({
      node: node.key,
      loc: node.loc,
      messageId,
      fix (fixer) {
        return fixer.replaceText(node, fixStr);
      }
    });
  }
}
const literalHandlerCurried = _curry(literalHandler)

//------------------------------------------------------------------------------
// Rule  Definition
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
  create(context) {
    return defineVueTemplateBodyVisitor(context, {
      VLiteral: literalHandlerCurried(context),
      VText: literalHandlerCurried(context),
    })
  }
}

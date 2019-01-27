/**
 * @fileoverview lucky-monkey eslint plugin
 * @author luck-monkey
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var requireIndex = require("requireindex");

//------------------------------------------------------------------------------
// Plugin Definition
//------------------------------------------------------------------------------

module.exports.rules = requireIndex(__dirname + "/rules");

module.exports.configs = {
  'recommended': require('./config/recommended'),
  'vue-recommended': require('./config/vue-recommended')
}

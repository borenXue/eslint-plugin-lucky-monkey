
module.exports = {
  rules: {
    // object-curly-newline
    // object-curly-spacing
    // no-trailing-spaces

    // https://eslint.org/docs/rules/object-property-newline
    'object-property-newline': ['error', {
      'allowAllPropertiesOnSameLine': false
    }],
    // https://eslint.org/docs/rules/object-curly-newline
    'object-curly-newline': ['error', {
      'ObjectExpression': {
        'multiline': true,
        'minProperties': 3,
        'consistent': true
      },
      'ObjectPattern': {
        'multiline': true,
        'minProperties': 3,
        'consistent': true
      },
      'ImportDeclaration': {
        'multiline': true,
        'minProperties': 3,
        'consistent': true
      },
      'ExportDeclaration': 'always'
    }],
    // https://eslint.org/docs/rules/object-curly-spacing
    'object-curly-spacing': ['error', 'never', {
      'arraysInObjects': false,
      'objectsInObjects': false
    }],

    // https://eslint.org/docs/rules/array-element-newline
    'array-element-newline': ['error', {
      multiline: true,
      minItems: 2
    }],
    // https://eslint.org/docs/rules/array-bracket-newline
    'array-bracket-newline': [2, {
      multiline: true,
      minItems: 2
    }],
    // https://eslint.org/docs/rules/array-bracket-spacing
    'array-bracket-spacing': ['error', 'never', {
      singleValue: true,
      objectsInArrays: true,
      arraysInArrays: true,
    }],

    // https://eslint.org/docs/rules/comma-dangle
    'comma-dangle': ['error', {
      'arrays': 'always-multiline',
      'objects': 'always-multiline',
      'imports': "always-multiline",
      'exports': 'always-multiline',
      'functions': 'always-multiline'
    }],
  }
}

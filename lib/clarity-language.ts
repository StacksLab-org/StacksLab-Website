import * as monaco from 'monaco-editor'

// Clarity language definition for Monaco Editor
export const clarityLanguageDefinition: monaco.languages.IMonarchLanguage = {
  // Set defaultToken to invalid to see what you do not tokenize yet
  defaultToken: 'invalid',

  keywords: [
    'define-public', 'define-private', 'define-read-only', 'define-constant',
    'define-data-var', 'define-map', 'define-fungible-token', 'define-non-fungible-token',
    'let', 'if', 'begin', 'asserts!', 'unwrap!', 'unwrap-err!', 'unwrap-panic', 'try!',
    'is-eq', 'is-some', 'is-none', 'is-ok', 'is-err', 'and', 'or', 'not',
    'map-get?', 'map-set', 'map-insert', 'map-delete', 'var-get', 'var-set',
    'ft-mint?', 'ft-transfer?', 'ft-burn?', 'ft-get-balance', 'ft-get-supply',
    'nft-mint?', 'nft-transfer?', 'nft-burn?', 'nft-get-owner?',
    'contract-call?', 'as-contract', 'tx-sender', 'contract-caller', 'block-height',
    'stx-get-balance', 'stx-transfer?', 'stx-burn?', 'get-block-info?',
    'ok', 'err', 'some', 'none', 'true', 'false'
  ],

  typeKeywords: [
    'uint', 'int', 'bool', 'principal', 'buff', 'string-ascii', 'string-utf8',
    'optional', 'response', 'tuple', 'list'
  ],

  operators: [
    '+', '-', '*', '/', 'mod', '<', '<=', '>', '>=', '=', '!=',
    'append', 'concat', 'len', 'element-at', 'index-of'
  ],

  // we include these common regular expressions
  symbols: /[=><!~?:&|+\-*\/\^%]+/,

  // C# style strings
  escapes: /\\(?:[abfnrtv\\"']|x[0-9A-Fa-f]{1,4}|u[0-9A-Fa-f]{4}|U[0-9A-Fa-f]{8})/,

  // The main tokenizer for our languages
  tokenizer: {
    root: [
      // identifiers and keywords
      [/[a-z_$][\w$-]*/, { 
        cases: { 
          '@typeKeywords': 'keyword',
          '@keywords': 'keyword',
          '@default': 'identifier' 
        } 
      }],
      [/[A-Z][\w\$]*/, 'type.identifier'],  // to show class names nicely

      // whitespace
      { include: '@whitespace' },

      // delimiters and operators
      [/[{}()\[\]]/, '@brackets'],
      [/[<>](?!@symbols)/, '@brackets'],
      [/@symbols/, { 
        cases: { 
          '@operators': 'operator',
          '@default': '' 
        } 
      }],

      // @ annotations.
      [/@\s*[a-zA-Z_\$][\w\$]*/, { token: 'annotation' }],

      // numbers
      [/\bu\d*/, 'number'],
      [/\d*\.\d+([eE][\-+]?\d+)?/, 'number.float'],
      [/0[xX][0-9a-fA-F]+/, 'number.hex'],
      [/\d+/, 'number'],

      // delimiter: after number because of .\d floats
      [/[;,.]/, 'delimiter'],

      // strings
      [/"([^"\\]|\\.)*$/, 'string.invalid'],  // non-terminated string
      [/"/, { token: 'string.quote', bracket: '@open', next: '@string' }],

      // characters
      [/'[^\\']'/, 'string'],
      [/(')(@escapes)(')/, ['string', 'string.escape', 'string']],
      [/'/, 'string.invalid']
    ],

    comment: [
      [/[^;]+/, 'comment'],
      [/;;/, 'comment', '@pop'],
      [/[;]/, 'comment']
    ],

    string: [
      [/[^\\"]+/, 'string'],
      [/@escapes/, 'string.escape'],
      [/\\./, 'string.escape.invalid'],
      [/"/, { token: 'string.quote', bracket: '@close', next: '@pop' }]
    ],

    whitespace: [
      [/[ \t\r\n]+/, 'white'],
      [/;;.*$/, 'comment']
    ]
  }
}

export const clarityLanguageConfiguration: monaco.languages.LanguageConfiguration = {
  comments: {
    lineComment: ';;'
  },
  brackets: [
    ['(', ')'],
    ['{', '}'],
    ['[', ']']
  ],
  autoClosingPairs: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '"', close: '"' }
  ],
  surroundingPairs: [
    { open: '(', close: ')' },
    { open: '{', close: '}' },
    { open: '[', close: ']' },
    { open: '"', close: '"' }
  ],
  folding: {
    markers: {
      start: new RegExp('^\\s*;;\\s*#region\\b'),
      end: new RegExp('^\\s*;;\\s*#endregion\\b')
    }
  }
}
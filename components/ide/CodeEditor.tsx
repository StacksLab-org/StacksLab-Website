'use client'

import React, { useRef, useState } from 'react'
import Editor from '@monaco-editor/react'
import * as monaco from 'monaco-editor'
import { useIDE } from '@/contexts/IDEContext'
import { clarityLanguageDefinition, clarityLanguageConfiguration } from '@/lib/clarity-language'

interface CodeEditorProps {
  fileId: string
  content: string
  language: string
  onChange: (content: string) => void
}

const CodeEditor: React.FC<CodeEditorProps> = ({ fileId, content, language, onChange }) => {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null)
  const { addTerminalOutput, saveFile, compileContract } = useIDE()
  const [cursorPosition, setCursorPosition] = useState({ line: 1, column: 1 })
  const [isEditorReady, setIsEditorReady] = useState(false)

  // Configure Monaco Editor before it mounts
  const handleEditorWillMount = (monacoInstance: typeof monaco) => {
    // Register Clarity language
    monacoInstance.languages.register({ id: 'clarity' })

    // Set language definition and configuration
    monacoInstance.languages.setMonarchTokensProvider('clarity', clarityLanguageDefinition)
    monacoInstance.languages.setLanguageConfiguration('clarity', clarityLanguageConfiguration)

    // Register completion item provider for Clarity
    monacoInstance.languages.registerCompletionItemProvider('clarity', {
      provideCompletionItems: (model, position) => {
        const word = model.getWordUntilPosition(position)
        const range = {
          startLineNumber: position.lineNumber,
          endLineNumber: position.lineNumber,
          startColumn: word.startColumn,
          endColumn: word.endColumn
        }

        const suggestions: monaco.languages.CompletionItem[] = [
          {
            label: 'define-public',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-public (${1:function-name} (${2:params})\n  ${3:body}\n)',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a public function',
            range: range
          },
          {
            label: 'define-private',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-private (${1:function-name} (${2:params})\n  ${3:body}\n)',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a private function',
            range: range
          },
          {
            label: 'define-read-only',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-read-only (${1:function-name} (${2:params})\n  ${3:body}\n)',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a read-only function',
            range: range
          },
          {
            label: 'define-constant',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-constant ${1:constant-name} ${2:value}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a constant',
            range: range
          },
          {
            label: 'define-data-var',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-data-var ${1:var-name} ${2:type} ${3:initial-value}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a data variable',
            range: range
          },
          {
            label: 'define-map',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-map ${1:map-name} ${2:key-type} ${3:value-type}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a map',
            range: range
          },
          {
            label: 'define-fungible-token',
            kind: monacoInstance.languages.CompletionItemKind.Keyword,
            insertText: 'define-fungible-token ${1:token-name}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Define a fungible token',
            range: range
          },
          {
            label: 'ft-transfer?',
            kind: monacoInstance.languages.CompletionItemKind.Function,
            insertText: 'ft-transfer? ${1:token-name} ${2:amount} ${3:sender} ${4:recipient}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Transfer fungible tokens',
            range: range
          },
          {
            label: 'ft-mint?',
            kind: monacoInstance.languages.CompletionItemKind.Function,
            insertText: 'ft-mint? ${1:token-name} ${2:amount} ${3:recipient}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Mint fungible tokens',
            range: range
          },
          {
            label: 'asserts!',
            kind: monacoInstance.languages.CompletionItemKind.Function,
            insertText: 'asserts! ${1:condition} ${2:error}',
            insertTextRules: monacoInstance.languages.CompletionItemInsertTextRule.InsertAsSnippet,
            documentation: 'Assert a condition',
            range: range
          }
        ]

        return { suggestions }
      }
    })

    // Set theme
    monacoInstance.editor.defineTheme('clarity-dark', {
      base: 'vs-dark',
      inherit: true,
      rules: [
        { token: 'comment', foreground: '6A9955' },
        { token: 'keyword', foreground: '569CD6' },
        { token: 'type', foreground: '4EC9B0' },
        { token: 'number', foreground: 'B5CEA8' },
        { token: 'string', foreground: 'CE9178' },
        { token: 'identifier', foreground: '9CDCFE' }
      ],
      colors: {
        'editor.background': '#1e1e1e',
        'editor.foreground': '#d4d4d4',
        'editorLineNumber.foreground': '#858585',
        'editorLineNumber.activeForeground': '#c6c6c6'
      }
    })
  }

  const handleEditorDidMount = (editor: monaco.editor.IStandaloneCodeEditor, monacoInstance: typeof monaco) => {
    editorRef.current = editor
    setIsEditorReady(true)

    // Set theme
    monacoInstance.editor.setTheme('clarity-dark')

    // Add keyboard shortcuts
    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.KeyS, () => {
      saveFile(fileId)
    })

    editor.addCommand(monacoInstance.KeyMod.CtrlCmd | monacoInstance.KeyCode.Enter, () => {
      compileContract(fileId)
    })

    // Track cursor position
    editor.onDidChangeCursorPosition((e) => {
      setCursorPosition({
        line: e.position.lineNumber,
        column: e.position.column
      })
    })

    // Focus the editor
    editor.focus()

    addTerminalOutput('success', 'Monaco Editor loaded with Clarity language support')
  }

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      onChange(value)
    }
  }

  const getLanguageForMonaco = (lang: string) => {
    switch (lang) {
      case 'clarity':
        return 'clarity'
      case 'javascript':
      case 'js':
        return 'javascript'
      case 'typescript':
      case 'ts':
        return 'typescript'
      case 'json':
        return 'json'
      case 'markdown':
      case 'md':
        return 'markdown'
      default:
        return 'plaintext'
    }
  }

  return (
    <div className="h-full flex flex-col bg-gray-900 text-gray-100">
      {/* Editor Header */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">
            {language === 'clarity' ? 'Clarity' : language.toUpperCase()}
          </span>
          <span className="text-xs text-gray-500">•</span>
          <span className="text-xs text-gray-500">UTF-8</span>
          {isEditorReady && (
            <>
              <span className="text-xs text-gray-500">•</span>
              <span className="text-xs text-green-400">Monaco Ready</span>
            </>
          )}
        </div>
        <div className="flex items-center space-x-4 text-xs text-gray-500">
          <span>Ln {cursorPosition.line}, Col {cursorPosition.column}</span>
          <span>Spaces: 2</span>
        </div>
      </div>

      {/* Monaco Editor */}
      <div className="flex-1">
        <Editor
          height="100%"
          language={getLanguageForMonaco(language)}
          value={content}
          onChange={handleEditorChange}
          beforeMount={handleEditorWillMount}
          onMount={handleEditorDidMount}
          options={{
            theme: 'clarity-dark',
            fontSize: 14,
            fontFamily: 'var(--font-geist-mono), Consolas, "Courier New", monospace',
            lineHeight: 1.5,
            tabSize: 2,
            insertSpaces: true,
            detectIndentation: false,
            minimap: { enabled: true },
            scrollBeyondLastLine: false,
            wordWrap: 'on',
            automaticLayout: true,
            bracketPairColorization: { enabled: true },
            guides: {
              bracketPairs: true,
              indentation: true
            },
            suggest: {
              showKeywords: true,
              showSnippets: true
            },
            quickSuggestions: {
              other: true,
              comments: false,
              strings: false
            },
            parameterHints: { enabled: true },
            hover: { enabled: true },
            contextmenu: true,
            mouseWheelZoom: true,
            cursorBlinking: 'blink',
            cursorSmoothCaretAnimation: 'on',
            smoothScrolling: true,
            folding: true,
            foldingHighlight: true,
            showFoldingControls: 'always',
            matchBrackets: 'always',
            renderLineHighlight: 'all',
            renderWhitespace: 'selection',
            rulers: [80, 120]
          }}
          loading={
            <div className="flex items-center justify-center h-full bg-gray-900">
              <div className="text-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p className="text-gray-400">Loading Monaco Editor...</p>
              </div>
            </div>
          }
        />
      </div>

      {/* Status Bar */}
      <div className="px-4 py-1 bg-gray-800 border-t border-gray-700 flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-4">
          <span className="text-green-400">Ready</span>
          <span>•</span>
          <span>Clarity Language Server</span>
          <span>•</span>

        </div>
        <div className="flex items-center space-x-4">
          <span>Ctrl+S to Save</span>
          <span>•</span>
          <span>Ctrl+Enter to Compile</span>
          <span>•</span>
          <span>Ctrl+Shift+D for AI Debug</span>
          <span>•</span>
          <span>Ctrl+Scroll to Zoom</span>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor
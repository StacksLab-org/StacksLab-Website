'use client'

import React from 'react'
import Editor from '@monaco-editor/react'

const MonacoTest: React.FC = () => {
  const clarityCode = `;;  Simple Token Contract
;;  This contract implements a basic fungible token

;; Define the token
(define-fungible-token my-token)

;; Define constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))

;; Public functions
(define-public (transfer (amount uint) (from principal) (to principal))
  (begin
    (asserts! (is-eq from tx-sender) err-owner-only)
    (ft-transfer? my-token amount from to)
  )
)

(define-public (get-balance (account principal))
  (ok (ft-get-balance my-token account))
)`

  return (
    <div className="h-96 w-full border border-gray-300 rounded">
      <Editor
        height="100%"
        defaultLanguage="clarity"
        defaultValue={clarityCode}
        theme="vs-dark"
        options={{
          fontSize: 14,
          minimap: { enabled: false },
          scrollBeyondLastLine: false,
          wordWrap: 'on'
        }}
      />
    </div>
  )
}

export default MonacoTest
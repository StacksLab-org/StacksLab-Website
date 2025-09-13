;; Simple test contract for deployment
(define-constant contract-owner tx-sender)

;; Define a simple counter
(define-data-var counter uint u0)

;; Public function to increment counter
(define-public (increment)
  (begin
    (var-set counter (+ (var-get counter) u1))
    (ok (var-get counter))
  )
)

;; Read-only function to get counter value
(define-read-only (get-counter)
  (var-get counter)
)

;; Read-only function to get contract owner
(define-read-only (get-owner)
  contract-owner
)
import React from 'react'
import { PaymentForm } from '../../forms'

const PaymentPage = () => {
  return (
    <div
      data-testid={'paymentPage'}
      className={
        'container mx-auto px-4 sm:px-6 py-16 payment-page container flex justify-center items-center'
      }
    >
      <PaymentForm />
    </div>
  )
}

export default PaymentPage

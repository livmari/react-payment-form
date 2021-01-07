import React from 'react'
import { Formik } from 'formik'
import { paymentSchema } from '../validation/PaymentValidation'
import { CreditCard } from '../../components'

const PaymentForm = () => {
  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 9 }, (_x, i) => currentYear + i)

  const months = Array.from({ length: 12 }, (x, i) => {
    const month = i + 1
    return month <= 9 ? '0' + month : month
  })

  // This is here because I couldn't get tailwind to work with Parcel 🥺
  const inputStyles =
    ' focus:outline-none focus:border-gray-400 px-3 border rounded-md w-full py-2 '
  const labelStyles = ' text-sm text-gray-600 '
  const errorBorder = ' border-pink-500 '

  return (
    <Formik
      initialValues={{
        cardNum: '',
        cardName: '',
        cardExpMonth: '',
        cardExpYear: '',
        cardCvv: '',
      }}
      validationSchema={paymentSchema}
      onSubmit={(data, { setSubmitting, resetForm }) => {
        setSubmitting(true)

        // todo: use form data in backend
        console.log(data)
        alert(
          "Form submitted! 🥳\n\nps. This is here because I don't have time to make something more fancy."
        )

        resetForm()

        setSubmitting(false)
      }}
    >
      {({
        values,
        errors,
        touched,
        isSubmitting,
        handleChange,
        handleBlur,
        handleSubmit,
      }) => (
        <form
          onSubmit={handleSubmit}
          className={
            'max-w-screen-sm flex justify-center flex-col gap-16 sm:bg-gray-50 sm:border sm:rounded-md sm:px-10 sm:py-12'
          }
        >
          {/* Form data visualization */}
          <div className={'sm:items-center sm:justify-center hidden sm:flex'}>
            <CreditCard
              num={values.cardNum}
              name={values.cardName}
              expMonth={values.cardExpMonth}
              expYear={values.cardExpYear}
              cvv={values.cardCvv}
            />
          </div>
          <div
            className={
              'block sm:hidden bg-gray-50 rounded-md p-10 font-semibold shadow-sm border text-gray-500 text-center'
            }
          >
            Please open me in a window that is at least 640 pixels wide to see
            the interactive card 💕
          </div>

          {/* Form fields */}
          <div className={'grid gap-4 sm:grid-cols-2'}>
            {/* Card number input field */}
            <fieldset className={'sm:col-span-2'}>
              <label htmlFor={'cardNum'} className={labelStyles}>
                Card number
              </label>

              <input
                id={'cardNum'}
                className={
                  touched.cardNum && errors.cardNum
                    ? inputStyles + errorBorder
                    : inputStyles
                }
                type={'text'}
                maxLength={'16'}
                name={'cardNum'}
                value={values.cardNum}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.cardNum && errors.cardNum ? (
                <small className={'mt-2 text-right text-pink-600 w-full block'}>
                  {errors.cardNum}
                </small>
              ) : null}
            </fieldset>

            {/* Cardholder name input field */}
            <fieldset className={'sm:col-span-2'}>
              <label htmlFor={'cardName'} className={labelStyles}>
                Cardholder name
              </label>

              <input
                id={'cardName'}
                className={
                  touched.cardName && errors.cardName
                    ? inputStyles + errorBorder
                    : inputStyles
                }
                type={'text'}
                name={'cardName'}
                value={values.cardName}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.cardName && errors.cardName ? (
                <small className={'mt-2 text-right text-pink-600 w-full block'}>
                  {errors.cardName}
                </small>
              ) : null}
            </fieldset>

            {/* Card expiration month and year dropdowns */}
            <fieldset className={'sm:col-span-1 content-start'}>
              <label
                htmlFor={'cardExpMonth'}
                className={labelStyles + ' col-span-2'}
              >
                Expiry date
              </label>

              <div className={'flex gap-x-3'}>
                {/* Dropdown for card expiration month */}
                <select
                  className={
                    touched.cardExpMonth && errors.cardExpMonth
                      ? inputStyles + errorBorder + 'py-2.5'
                      : inputStyles + ' py-2.5'
                  }
                  name={'cardExpMonth'}
                  value={values.cardExpMonth}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {/* Doing this gives a warning,
              but I don't know how else to default to 'Month' in 'select'. */}
                  <option value={''} selected disabled hidden>
                    Month
                  </option>
                  {months.map(month => (
                    <option key={month} value={month}>
                      {month}
                    </option>
                  ))}
                </select>

                {/* Dropdown for card expiration year */}
                <select
                  className={
                    touched.cardExpYear && errors.cardExpYear
                      ? inputStyles + errorBorder + 'py-2.5'
                      : inputStyles + ' py-2.5'
                  }
                  name={'cardExpYear'}
                  value={values.cardExpYear}
                  onChange={handleChange}
                  onBlur={handleBlur}
                >
                  {/* Doing this gives a warning,
              but I don't know how else to default to 'Year' in 'select'. */}
                  <option value={''} selected disabled hidden>
                    Year
                  </option>
                  {years.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
              </div>
            </fieldset>

            {/* Card CVV input field */}
            <fieldset className={'sm:col-span-1'}>
              <label htmlFor={'cardCvv'} className={labelStyles}>
                Cvv
              </label>

              <input
                id={'cardCvv'}
                className={
                  touched.cardCvv && errors.cardCvv
                    ? inputStyles + errorBorder
                    : inputStyles
                }
                type={'text'}
                name={'cardCvv'}
                value={values.cardCvv}
                onChange={handleChange}
                onBlur={handleBlur}
              />

              {touched.cardCvv && errors.cardCvv ? (
                <small
                  className={
                    'sm:col-span-3 mt-2 text-right text-pink-600 w-full block'
                  }
                >
                  {errors.cardCvv}
                </small>
              ) : null}
            </fieldset>

            <button
              disabled={isSubmitting}
              type={'submit'}
              className={
                'mt-6 btn-action-primary sm:col-span-2 focus:outline-none px-6 py-3 rounded-md font-semibold'
              }
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </Formik>
  )
}

export default PaymentForm

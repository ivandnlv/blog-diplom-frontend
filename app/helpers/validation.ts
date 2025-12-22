import { string } from 'yup'
import { VALIDATION_ERRORS } from '~/constants/app/validation-errors'

export const appValidator = {
  required,
  requiredEmail,
  requiredPassword
}

function required() {
  return string().required(VALIDATION_ERRORS.REQUIRED)
}

function requiredEmail() {
  return required().email(VALIDATION_ERRORS.EMAIL)
}

function requiredPassword() {
  return required().min(6, VALIDATION_ERRORS.PASSWORD_MIN_LENGTH_6).max(32, VALIDATION_ERRORS.PASSWORD_MAX_LENGTH_32)
}

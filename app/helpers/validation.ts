import { string } from 'yup'
import { VALIDATION_ERRORS } from '~/constants/app/validation-errors'

export const appValidator = {
  required,
  requiredEmail,
  requiredPassword,
  isEmail,
  requiredMaxLength,
  isUrl,
  requiredUrl
}

function isEmail() {
  return string().email(VALIDATION_ERRORS.EMAIL)
}

function isUrl() {
  return string().url(VALIDATION_ERRORS.URL)
}

function requiredUrl() {
  return required().url(VALIDATION_ERRORS.URL)
}

function required() {
  return string().required(VALIDATION_ERRORS.REQUIRED)
}

function requiredEmail() {
  return isEmail().required(VALIDATION_ERRORS.REQUIRED)
}

function requiredPassword() {
  return required().min(6, VALIDATION_ERRORS.PASSWORD_MIN_LENGTH_6).max(32, VALIDATION_ERRORS.PASSWORD_MAX_LENGTH_32)
}

function requiredMaxLength(max: number = 128) {
  return required().max(max, `${VALIDATION_ERRORS.MAX_LENGTH} ${max}`)
}

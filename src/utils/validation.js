const validator = require("email-validator")

export const emptyLoginPassword = value => {
  return !value || !value.length ? "Введите свой пароль" : undefined
}

export const emptyName = value => {
  return !value || !value.length ? "Введите своё имя" : undefined
}

export const emptyCode = value => {
  return !value || !value.length ? "Введите код подтверждения" : undefined
}

const minMaxLength = /^[\s\S]{8,32}$/,
  upper = /[A-Z]/,
  lower = /[a-z]/,
  number = /[0-9]/,
  special = /[ !"#$%&'()*+,\-./:;<=>?@[\\\]^_`{|}~]/,
  phone = /^\+(?:[0-9]●?){10,14}[0-9]$/

const email_invalid = "Введите адрес электронной почты",
  minMaxLength_invalid = "Пароль длинной не менее восьми знаков",
  upper_invalid = "Должен содержать заглавные буквы",
  lower_invalid = "Должен содержать строчные буквы",
  number_invalid = "Должен содержать цифры",
  special_invalid = "Должен содержать символ ( !, @, #, $, %, ^, &, _ )",
  empty_phone = "Введите свой номер телефона",
  phone_invalid = "Номер в формате +7**********"

export const validateEmail = value => {
  return !value || !value.length || !validator.validate(value)
    ? email_invalid
    : null
}

export const validatePassword = value => {
  switch (true) {
    case validateNotNull(value):
      return minMaxLength_invalid
    case validateLength(value):
      return minMaxLength_invalid
    case validateLower(value):
      return lower_invalid
    case validateUpper(value):
      return upper_invalid
    case validateNumber(value):
      return number_invalid
    case validateSpecial(value):
      return special_invalid
    default:
      return undefined
  }
}

export const validatePhoneNumber = value => {
  switch (true) {
    case validateNotNull(value):
      return empty_phone
    case validatePhone(value):
      return phone_invalid
    default:
      return undefined
  }
}

const validateNotNull = value => {
  return !value || !value.length
}

const validateLength = value => {
  return !minMaxLength.test(value)
}

const validateLower = value => {
  return !lower.test(value)
}

const validateUpper = value => {
  return !upper.test(value)
}

const validateNumber = value => {
  return !number.test(value)
}

const validateSpecial = value => {
  return !special.test(value)
}

const validatePhone = value => {
  return !phone.test(value)
}

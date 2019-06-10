export const emptyEmail = value => {
  return !value || !value.length ? "Введите адрес эл. почты" : undefined
}

export const emptyPassword = value => {
  return !value || !value.length
    ? "Введите пароль длинной не менее восьми знаков"
    : undefined
}

export const emptyName = value => {
  return !value || !value.length ? "Введите своё имя" : undefined
}

export const emptyPhone = value => {
  return !value || !value.length ? "Введите свой номер телефона" : undefined
}

export const emptyCode = value => {
  return !value || !value.length ? "Введите код подтверждения" : undefined
}

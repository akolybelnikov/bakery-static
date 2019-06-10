export const mapSignUpError = ({ code, message }) => {
  switch (code) {
    case /incorrect.*username.*password/i.test(message):
      return "Неверный адрес эл. почты или пароль"
    case "UsernameExistsException":
      return "Пользователь с таким адресом эл. почты уже существует"
    case "InvalidParameterException":
      switch (message) {
        case "Username should be an email.":
          return "Недействительный адрес эл. почты."
        case "Invalid phone number format.":
          return "Неверный формат номера телефона. Используйте формат +7 *********"
        default:
          return "Ошибка при регистрации. Попробуйте позже."
      }
    case "InvalidPasswordException":
      return "Для пароля используйте не менее 8 знаков, включая заглавные и строчные буквы, цифры и специальные символы (!, @, #, $, %, ^, &)"
    case "UserNotFoundException":
      return "Пользователя с таким адресом эл. почты не существует"
    default:
      return "Ошибка при регистрации. Попробуйте позже."
  }
}

export const mapSignInError = ({ code }) => {
  switch (code) {
    case "NotAuthorizedException":
      return "Неверный адрес эл. почты или пароль"
    case "UserNotFoundException":
      return "Пользователя с таким адресом эл. почты не существует"
    default:
      return "Ошибка при входе на сайт. Попробуйте позже."
  }
}

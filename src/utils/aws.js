export const mapError = ({ code, message }) => {
  switch (code) {
    case /incorrect.*username.*password/i.test(message):
      return "Неверный адрес эл. почты или пароль"
    case "NotAuthorizedException":
      return "Неверный адрес эл. почты или пароль"
    case "UsernameExistsException":
      return "Пользователь с таким адресом эл. почты уже существует"
    case "InvalidParameterException":
      switch (message) {
        case "Username should be an email.":
          return "Недействительный адрес эл. почты."
        case "Invalid phone number format.":
          return "Неверный формат номера телефона. Используйте формат +7 *********"
        case "Cannot reset password for the user as there is no registered/verified email or phone_number":
          return "Вы не подтвердили свой адрес эл. почты при регистрации. Смена пароля невозможна."
        default:
          return "Произошла ошибка. Нам очень жаль... Попробуйте позже."
      }
    case "InvalidPasswordException":
      return "Для пароля используйте не менее 8 знаков, включая заглавные и строчные буквы, цифры и специальные символы (!, @, #, $, %, ^, &)"
    case "UserNotFoundException":
      return "Пользователя с таким адресом эл. почты не существует"
    case "CodeMismatchException":
      return "Указан неверный код подтверждения."
    default:
      return "Произошла ошибка. Нам очень жаль... Попробуйте позже."
  }
}

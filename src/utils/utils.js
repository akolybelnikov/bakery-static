function parseIngridients(ingridients) {
  const parsed = ingridients.split(";")
  for (let each of parsed) {
    each.trim()
  }

  return parsed.join(", ")
}

const PAGE = {
  DELIVERY: "delivery",
  PICK_UP: "pick_up",
}

Object.freeze(PAGE)

const USER = {
  NAME: "_name",
  EMAIL: "_replyto",
  PHONE: "_phone",
  ADDRESS: "_address",
  PICKUP: "_pickup",
  METRO: "_metro",
  USERNAME: "_username"
}

Object.freeze(USER)

export { USER, PAGE, parseIngridients }

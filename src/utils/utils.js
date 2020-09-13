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
  NAME: "name",
  EMAIL: "email",
  PHONE: "phone",
  ADDRESS: "address",
  PICKUP: "pickup",
}

Object.freeze(USER)

export { USER, PAGE, parseIngridients }

export function parseIngridients(ingridients) {
    const parsed = ingridients.split(';')
    for (let each of parsed) {
        each.trim()
    }

    return parsed.join(', ')
}
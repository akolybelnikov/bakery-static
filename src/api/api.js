const createOrder = async data => {
  const response = await fetch("/.netlify/functions/orders-create", {
    body: JSON.stringify(data),
    method: "POST",
  })
  return response.json()
}

export { createOrder }

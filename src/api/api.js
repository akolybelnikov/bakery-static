const axios = require("axios")

const createOrder = async data => {
  return await axios.post("/.netlify/functions/orders-create", { data })
}

const readAll = async () => {
  const res = await axios.get("/.netlify/functions/orders-read-all")
  return res.data
}

const getOrder = async orderid => {
  return await axios.get("/.netlify/functions/orders-read", {
    params: {
      orderid,
    },
  })
}

export { createOrder, readAll, getOrder }

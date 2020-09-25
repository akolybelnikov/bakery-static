import axios from "axios"

const createOrder = async data => {
  return await axios({
    method: "post",
    url: "/.netlify/functions/orders-create",
    data,
    responseType: "json",
  })
}

const readAll = async () => {
  return await axios({
    method: "get",
    url: "/.netlify/functions/orders-read-all",
    responseType: "json",
  })
}

const getOrder = async orderid => {
  return await axios({
    method: "get",
    url: "/.netlify/functions/orders-read",
    params: {
      orderid,
    },
    responseType: "json",
  })
}

export { createOrder, readAll, getOrder }

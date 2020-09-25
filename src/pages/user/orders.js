import React, { useEffect, useState } from "react"
import { Flex as FlexRebass } from "rebass"
import styled from "styled-components"
import { getOrder, readAll } from "../../api/api"
import { getCurrentUser, isLoggedIn } from "../../utils/auth"

const Flex = styled(FlexRebass).attrs({
  py: [2],
  px: [2],
  width: [1],
  m: "0 auto",
  flexDirection: "column",
  justifyContent: "space-evenly",
  alignItems: "center",
})`
  position: relative;
  min-height: 50vh;
`

const Orders = () => {
  const user = getCurrentUser() //eslint-disable-line no-unused-vars
  const [orders, setOrders] = useState([])

  useEffect(() => {
    async function fetchData() {
      const res = await readAll()
      setOrders(res.data)
      const order = await getOrder(res.data[0].data._orderid)
      console.log(order)
    }

    fetchData()
  }, [setOrders])

  return (
    <>
      {isLoggedIn() && user.roles.includes("admin") ? (
        <Flex>
          {orders.map(order => (
            <p key={order.ref["@ref"].id}>{order.data._orderid}</p>
          ))}
        </Flex>
      ) : null}
    </>
  )
}

export default Orders

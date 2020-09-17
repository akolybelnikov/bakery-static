const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNADB,
})

exports.handler = function(event, context) {
  console.log("Function `orders-read-all` invoked")

  return client
    .query(q.Paginate(q.Match(q.Ref("indexes/all_orders"))))
    .then(response => {
      const orderRefs = response.data
      console.log("Order refs", orderRefs)
      console.log(`${orderRefs.length} orders found`)

      const getAllOrderDataQuery = orderRefs.map(ref => {
        return q.Get(ref)
      })

      return client.query(getAllOrderDataQuery).then(ret => {
        return {
          statusCode: 200,
          body: JSON.stringify(ret),
        }
      })
    })
    .catch(error => {
      console.log("error", error)
      return {
        statusCode: 400,
        body: JSON.stringify(error),
      }
    })
}

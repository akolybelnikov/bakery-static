const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNADB,
})

exports.handler = function(event, context) {
  const {
    queryStringParameters: { orderid },
  } = event
  console.log(`Function 'orders-read' invoked. Read id: ${orderid}`)

    return client
      .query(q.Get(q.Match(q.Index("orders_by_orderid"), orderid)))
      .then(response => {
        console.log("success", response)
        return {
          statusCode: 200,
          body: JSON.stringify(response),
        }
      })
      .catch(error => {
        console.log("error", error)
        return {
          statusCode: 400,
          body: JSON.stringify(error),
        }
      })
}

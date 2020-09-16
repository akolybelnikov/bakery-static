const faunadb = require("faunadb")

const q = faunadb.query
const client = new faunadb.Client({
  secret: process.env.GATSBY_FAUNADB,
})

exports.handler = function(event, context, callback) {
  const data = JSON.parse(event.body)
  console.log("Function `orders-create` invoked", data)
  const orderItem = {
    data: data,
  }

  return client
    .query(q.Create(q.Ref("classes/orders"), orderItem))
    .then(response => {
      console.log("success", response)

      return callback(null, {
        statusCode: 200,
        body: JSON.stringify(response),
      })
    })
    .catch(error => {
      console.log("error", error)

      return callback(null, {
        statusCode: 400,
        body: JSON.stringify(error),
      })
    })
}

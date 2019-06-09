const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulCategory(filter: { node_locale: { eq: "ru" } }) {
          edges {
            node {
              name
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulCategory.edges.map(({ node }) => {
        createPage({
          path: node.name,
          component: path.resolve(`./src/templates/category.js`),
          context: {
            name: node.name,
          },
        })
      })
      resolve()
    })
  })
}

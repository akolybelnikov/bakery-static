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
        allContentfulProduct(
          filter: { node_locale: { eq: "ru" }, status: { eq: "active" } }
        ) {
          edges {
            node {
              id
              category {
                name
              }
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
      result.data.allContentfulProduct.edges.map(({ node }) => {
        createPage({
          path: `${node.category.name}/${node.id}`,
          component: path.resolve(`./src/templates/product.js`),
          context: {
            id: node.id,
          },
        })
      })
      resolve()
    })
  })
}

// const { createFilePath } = require(`gatsby-source-filesystem`)
// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions

//   const blogPost = path.resolve(`./src/templates/blog-post.js`)
//   return graphql(
//     `
//       {
//         allMarkdownRemark(
//           sort: { fields: [frontmatter___date], order: DESC }
//           limit: 1000
//         ) {
//           edges {
//             node {
//               fields {
//                 slug
//               }
//               frontmatter {
//                 title
//               }
//             }
//           }
//         }
//       }
//     `
//   ).then(result => {
//     if (result.errors) {
//       throw result.errors
//     }

//     // Create blog posts pages.
//     const posts = result.data.allMarkdownRemark.edges

//     posts.forEach((post, index) => {
//       const previous = index === posts.length - 1 ? null : posts[index + 1].node
//       const next = index === 0 ? null : posts[index - 1].node

//       createPage({
//         path: post.node.fields.slug,
//         component: blogPost,
//         context: {
//           slug: post.node.fields.slug,
//           previous,
//           next,
//         },
//       })
//     })

//     return null
//   })
// }

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions

//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode })
//     createNodeField({
//       name: `slug`,
//       node,
//       value,
//     })
//   }
// }

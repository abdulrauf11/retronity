const path = require(`path`)

// exports.createPages = ({ graphql, actions }) => {
//   const { createPage } = actions
//   return graphql(`
//     {
//       freeVisuals: allVimeoVideo(filter: { paid: { eq: false } }) {
//         edges {
//           node {
//             slug
//           }
//         }
//       }

//       paidVisuals: allVimeoVideo(filter: { paid: { eq: true } }) {
//         edges {
//           node {
//             slug
//           }
//         }
//       }
//     }
//   `).then(result => {
//     result.data.freeVisuals.edges.forEach(({ node }) => {
//       createPage({
//         path: `visuals/${node.slug}`,
//         component: path.resolve(`./src/templates/visuals-single.js`),
//         context: {
//           slug: node.slug,
//         },
//       })
//     })
//     result.data.paidVisuals.edges.forEach(({ node }) => {
//       createPage({
//         path: `visuals/${node.slug}`,
//         component: path.resolve(`./src/templates/visuals-paid-single.js`),
//         context: {
//           slug: node.slug,
//         },
//       })
//     })
//   })
// }

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    {
      allSanityFreeVisual(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }

      allSanityPaidVisual(filter: { slug: { current: { ne: null } } }) {
        edges {
          node {
            title
            slug {
              current
            }
          }
        }
      }
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const freeVisuals = result.data.allSanityFreeVisual.edges || []
  const paidVisuals = result.data.allSanityPaidVisual.edges || []

  freeVisuals.forEach(({ node }) => {
    createPage({
      path: `visuals/${node.slug.current}`,
      component: path.resolve(`./src/templates/visuals-single.js`),
      context: { slug: node.slug.current },
    })
  })

  paidVisuals.forEach(({ node }) => {
    createPage({
      path: `visuals/${node.slug.current}`,
      component: path.resolve(`./src/templates/visuals-paid-single.js`),
      context: { slug: node.slug.current },
    })
  })
}

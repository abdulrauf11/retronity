/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

const path = require(`path`)

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      freeVisuals: allContentfulVisual {
        edges {
          node {
            slug
          }
        }
      }

      paidVisuals: allContentfulPaidVisual {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.freeVisuals.edges.forEach(({ node }) => {
      createPage({
        path: `visuals/${node.slug}`,
        component: path.resolve(`./src/templates/visuals-single.js`),
        context: {
          slug: node.slug,
        },
      })
    })
    result.data.paidVisuals.edges.forEach(({ node }) => {
      createPage({
        path: `visuals/${node.slug}`,
        component: path.resolve(`./src/templates/visuals-paid-single.js`),
        context: {
          slug: node.slug,
        },
      })
    })
  })
}

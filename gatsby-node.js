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
      visuals: allContentfulVisual {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    result.data.visuals.edges.forEach(({ node }) => {
      createPage({
        path: `visuals/${node.slug}`,
        component: path.resolve(`./src/templates/visuals-single.js`),
        context: {
          slug: node.slug,
        },
      })
    })
  })
}

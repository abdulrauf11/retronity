const path = require(`path`)

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
    }
  `)

  if (result.errors) {
    throw result.errors
  }

  const freeVisuals = result.data.allSanityFreeVisual.edges || []

  freeVisuals.forEach(({ node }) => {
    createPage({
      path: `visuals/${node.slug.current}`,
      component: path.resolve(`./src/templates/visuals-single.js`),
      context: { slug: node.slug.current },
    })
  })
}

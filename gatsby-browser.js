/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// You can delete this file if you're not using it
import React from "react"
import ScrollProvider from "./src/components/context"

export const wrapRootElement = ({ element }) => (
  <ScrollProvider>{element}</ScrollProvider>
)

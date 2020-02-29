import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"

function exitAnimation(exit, node) {
  gsap.to(node, { duration: 0.2, opacity: 0 })
}

function entryAnimation(entry, node) {
  gsap.set(node, { opacity: 0 })
  gsap.to(node, { duration: 0.8, opacity: 1 })
}

const FadeLink = ({ to, children, activeClassName }) => (
  <TransitionLink
    to={to}
    activeClassName={activeClassName}
    exit={{
      length: 0.2,
      trigger: ({ exit, node }) => exitAnimation(exit, node),
    }}
    entry={{
      length: 0.8,
      delay: 0.5,
      trigger: ({ entry, node }) => entryAnimation(entry, node),
    }}
  >
    {children}
  </TransitionLink>
)

export default FadeLink

import React from "react"
import TransitionLink from "gatsby-plugin-transition-link"
import { gsap } from "gsap"

function exitAnimation(exit, node) {
  gsap.to(node, { duration: 0.3, opacity: 0, ease: "sine.out" })
}

function entryAnimation(entry, node) {
  gsap.set(node, { opacity: 0 })
  gsap.to(node, { duration: 1, opacity: 1, ease: "sine.out" })
}

const FadeLink = ({ to, children, className, activeClassName }) => (
  <TransitionLink
    to={to}
    className={className}
    activeClassName={activeClassName}
    exit={{
      length: 0.3,
      trigger: ({ exit, node }) => exitAnimation(exit, node),
    }}
    entry={{
      length: 1,
      delay: 0.7,
      trigger: ({ entry, node }) => entryAnimation(entry, node),
    }}
  >
    {children}
  </TransitionLink>
)

export default FadeLink

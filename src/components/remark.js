import React from "react"
import rehypeReact from "rehype-react"

const PrimaryHeading = ({ children, ...props }) => (
  <h1 {...props} className="px-4 mt-4 text-3xl font-semibold">
    {children}
  </h1>
)

const Paragraph = ({ children, ...props }) => (
  <p {...props} className="px-4 py-1 mt-2">
    {children}
  </p>
)

const Anchor = ({ children, ...props }) => (
  <a
    {...props}
    className="cursor-pointer text-blue-700 underline hover:no-underline"
  >
    {children}
  </a>
)

const renderRemark = new rehypeReact({
  createElement: React.createElement,
  components: {
    h1: PrimaryHeading,
    p: Paragraph,
    a: Anchor,
  },
}).Compiler

export default renderRemark

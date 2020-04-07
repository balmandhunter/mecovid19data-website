import React, { useState, useEffect } from "react"
import { useStaticQuery, graphql } from "gatsby"

import renderRemark from "./remark"

const MOBILE_BREAKPOINT = 640

function useWidth() {
  const [width, setWidth] = useState(null)

  useEffect(() => {
    setWidth(window.innerWidth)
    function handleResize() {
      setWidth(window.innerWidth)
    }
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return width
}

const Plots = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(
          sort: { order: ASC, fields: frontmatter___order }
          filter: { frontmatter: { type: { eq: "plot" } } }
        ) {
          edges {
            node {
              htmlAst
              frontmatter {
                filename
                slug
              }
            }
          }
        }
      }
    `
  )

  const width = useWidth()
  if (width === null) {
    return null
  }

  return (
    <>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Plot
          key={node.frontmatter.slug}
          filename={node.frontmatter.filename}
          htmlAst={node.htmlAst}
          width={width}
        />
      ))}
    </>
  )
}

const Plot = ({ filename, htmlAst, width }) => {
  const size = width < MOBILE_BREAKPOINT ? "small" : "large"

  return (
    <>
      <figure className="py-4 max-w-screen-md mx-auto md:px-4">
        <embed type="image/svg+xml" src={`/plot/${filename}?size=${size}`} />
      </figure>
      <div className="max-w-screen-sm mx-auto">{renderRemark(htmlAst)}</div>
    </>
  )
}

export default Plots

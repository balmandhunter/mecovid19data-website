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

  return (
    <>
      {data.allMarkdownRemark.edges.map(({ node }) => (
        <Plot
          key={node.frontmatter.slug}
          slug={node.frontmatter.slug}
          filename={node.frontmatter.filename}
          htmlAst={node.htmlAst}
        />
      ))}
    </>
  )
}

const Plot = ({ slug, filename, htmlAst }) => {
  const width = useWidth()

  return (
    <>
      <figure id={slug} className="py-4 max-w-screen-md mx-auto md:px-4">
        {width === null ? null : (
          <embed
            type="image/svg+xml"
            src={`/plot/${filename}?size=${
              width < MOBILE_BREAKPOINT ? "small" : "large"
            }`}
          />
        )}
      </figure>
      <div className="max-w-screen-sm mx-auto">{renderRemark(htmlAst)}</div>
    </>
  )
}

export default Plots

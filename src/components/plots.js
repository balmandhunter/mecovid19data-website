import React from "react"
import { useStaticQuery, graphql } from "gatsby"

const Plots = () => {
  const data = useStaticQuery(
    graphql`
      query {
        allMarkdownRemark(sort: { order: ASC, fields: frontmatter___order }) {
          edges {
            node {
              html
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
        <Plot filename={node.frontmatter.filename} html={node.html} />
      ))}
    </>
  )
}

const Plot = ({ filename, html }) => (
  <>
    <figure>
      <embed type="image/svg+xml" src={`/plot/${filename}`} />
    </figure>
    <div className="plot-content" dangerouslySetInnerHTML={{ __html: html }} />
  </>
)

export default Plots

import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import renderRemark from "../components/remark"

const About = () => {
  const data = useStaticQuery(
    graphql`
      query MyQuery {
        markdownRemark(frontmatter: { slug: { eq: "about" } }) {
          htmlAst
        }
      }
    `
  )

  return (
    <div className="max-w-screen-sm mx-auto">
      {renderRemark(data.markdownRemark.htmlAst)}
    </div>
  )
}

export default About

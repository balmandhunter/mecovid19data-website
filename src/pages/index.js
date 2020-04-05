import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Plots from "../components/plots"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div
      className="summary-content"
      dangerouslySetInnerHTML={{ __html: data.markdownRemark.html }}
    />
    <Plots />
  </Layout>
)

export const query = graphql`
  query IndexPageQuery {
    markdownRemark(frontmatter: { slug: { eq: "summary" } }) {
      frontmatter {
        title
        slug
      }
      html
    }
  }
`

export default IndexPage

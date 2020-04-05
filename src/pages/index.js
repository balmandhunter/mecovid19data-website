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
    <div>
      <h1>References</h1>
      {data.allReferencesYaml.edges.map(({ node }, i) => (
        <p key={node.slug} id={node.slug}>
          <a href={node.url}>{`[${i + 1}]`}</a> {node.text}
        </p>
      ))}
    </div>
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
    allReferencesYaml {
      edges {
        node {
          slug
          text
          url
        }
      }
    }
  }
`

export default IndexPage

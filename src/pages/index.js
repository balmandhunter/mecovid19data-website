import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Plots from "../components/plots"
import renderRemark from "../components/remark"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <div className="max-w-screen-sm mx-auto">
      {renderRemark(data.markdownRemark.htmlAst)}
    </div>
    <Plots />
    <div className="max-w-screen-sm mx-auto">
      <h1 className="px-4 mt-4 text-3xl font-semibold">References</h1>
      <div className="p-4">
        {data.allReferencesYaml.edges.map(({ node }, i) => (
          <p
            className={`${
              i > 0 ? "mt-4" : ""
            } px-4 py-2 rounded-lg bg-gray-200`}
            key={node.slug}
            id={node.slug}
          >
            <a className="tracking-wider text-blue-700" href={node.url}>{`[${i +
              1}]`}</a>{" "}
            {node.text}
          </p>
        ))}
      </div>
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
      htmlAst
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

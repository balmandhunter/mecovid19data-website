import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Contents from "../components/contents"
import Plots from "../components/plots"
import About from "../components/about"
import renderRemark from "../components/remark"

const IndexPage = ({ data }) => (
  <Layout>
    <SEO title="Home" />
    <Contents />
    <div className="max-w-screen-sm mx-auto">
      {renderRemark(data.markdownRemark.htmlAst)}
    </div>
    <Plots />
    <About />
    <div className="max-w-screen-sm mx-auto">
      <h1 id="references" className="px-4 mt-4 text-3xl font-semibold">
        References
      </h1>
      <div className="p-4">
        {data.allReferencesYaml.edges.map(({ node }, i) => (
          <Reference
            key={node.slug}
            slug={node.slug}
            text={node.text}
            link={node.link}
            index={i}
          />
        ))}
      </div>
    </div>
  </Layout>
)

const Reference = ({ slug, text, link, index }) => (
  <p
    className={`${
      index > 0 ? "pt-2" : ""
    } pb-2 flex leading-normal text-base sm:text-lg`}
    id={slug}
  >
    <div className="tracking-wider">{`[${index + 1}]`}</div>
    <div className="ml-2 sm:ml-4">
      {text}{" "}
      <a className="text-blue-700 underline hover:no-underline" href={link.url}>
        {link.label}
      </a>
      .
    </div>
  </p>
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
          link {
            label
            url
          }
        }
      }
    }
  }
`

export default IndexPage

import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Plots from "../components/plots"

const IndexPage = () => (
  <Layout>
    <SEO title="Maine COVID-19 Data" />
    <h1>Hello</h1>
    <Plots />
  </Layout>
)

export default IndexPage

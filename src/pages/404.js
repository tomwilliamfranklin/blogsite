import React from "react"
import "../components/notfound.scss"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <div class="not-found-container">
      <div>
      <h1>Error 404</h1>
      <p>Unable to find the page you're looking for :(</p>
      <p>Why not play some snake instead?</p>
      <iframe class="exampleContainer" src="/examples/snake-404/index.html" width="1000" height="820"></iframe>
      </div>


    </div>
  </Layout>
)

export default NotFoundPage

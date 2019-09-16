import React from "react"
import { Link } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <h1>My Blog</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>

      <ul>
      {data.allMarkdownRemark.edges.map(post => (
       <li>
         <Link key={post.node.id} href={post.node.frontmatter.path}> 
        {post.node.frontmatter.title}   {post.node.frontmatter.date}
        </Link>
        </li> 
      ))}
      </ul> 
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
)

export const pageQuery = graphql `
query indexQuery {
  allMarkdownRemark(
    limit:10 
    filter: { frontmatter: { published: {eq: true} } }
    sort:{fields: [frontmatter___date] order:DESC}
  
    ) {
      edges {
          node {
              id
              frontmatter {
                date(formatString: "DD-MMMM-YYYY")
                title
                path         
                published
              }
          }
      }
  }
}
`

export default IndexPage

import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"


const IndexPage = ({data}) => (
  <Layout>
    <h1>My Blog</h1>
      <div class="blog-post-list">
        {data.allMarkdownRemark.edges.map(post => (
          <Link class="blog-post-item" key={post.node.id} to={post.node.frontmatter.path}> 
              <h2> {post.node.frontmatter.title}</h2>
              <h2> {post.node.frontmatter.date} </h2>
          </Link>
        ))}
      </div>
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

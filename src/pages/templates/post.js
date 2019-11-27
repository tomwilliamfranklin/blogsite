import React from 'react';
import Helmet from 'react-helmet';
import Layout from "../../components/layout"
import Img from "gatsby-image"

export default function Template({ data: {markdownRemark} }) {
    const {frontmatter, html} = markdownRemark;
    //const post = data.markdownRemark;
    return (
        <Layout>
            <div class="blog-page-container">
                <div class="blog-page-header">

                </div>
                <div class="blog-post__inner-container">

                </div>
            </div>
            <div class="blog-post-list"> 
                <Helmet title={frontmatter.title}/>
                <div class="blog-post-container" dangerouslySetInnerHTML={{__html: html}}/> 
            </div>
        </Layout>
    )
}

export const postQuery = graphql`
    query BlogPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path} }) {
            html
            frontmatter {
                path
                title
                image {
                    childImageSharp {
                      fluid(maxWidth: 800) {
                        ...GatsbyImageSharpFluid
                      }
                    }
                  }
            }
        }
    }
`
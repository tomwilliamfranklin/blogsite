import React from 'react';
import Helmet from 'react-helmet';
import Layout from "../../components/layout"

export default function Template({ data: {markdownRemark} }) {
    const {frontmatter, html} = markdownRemark;
    //const post = data.markdownRemark;
    return (
        <Layout>
            <div class="blog-page-container">
                <div class="blog-page-header">

                </div>
                <div class="blog-page__inner-container">
                <Helmet title={frontmatter.title}/>
                <div class="blog-post-container" dangerouslySetInnerHTML={{__html: html}}/> 
       
                </div>
            </div>
            <div class="blog-post-list"> 

       </div>
        </Layout>
    )
}

export const postQuery = graphql`
    query ProjectPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path} }) {
            html
            frontmatter {
                date(formatString: "DD-MMMM-YYYY")
                title
                path         
                published
                summary
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
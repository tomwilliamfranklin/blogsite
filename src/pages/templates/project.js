import React from 'react';
import Helmet from 'react-helmet';
import Layout from "../../components/layout"

export default function Template({ data: {markdownRemark} }) {
    const {frontmatter, html} = markdownRemark;
    //const post = data.markdownRemark;
    return (
        <Layout>
            <div class="blog-post-list"> 
                <Helmet title={frontmatter.title}/>
                <img></img>
                <div class="blog-post-container" dangerouslySetInnerHTML={{__html: html}}/> 
            </div>
        </Layout>
    )
}

export const postQuery = graphql`
    query ProjectPostByPath($path: String!) {
        markdownRemark(frontmatter: { path: { eq: $path} }) {
            html
            frontmatter {
                path
                title
            }
        }
    }
`
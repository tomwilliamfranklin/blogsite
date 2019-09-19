import React from 'react';
import Helmet from 'react-helmet';
import Layout from "../../components/layout"

export default function Template({ data: {markdownRemark} }) {
    const {frontmatter, html} = markdownRemark;
    //const post = data.markdownRemark;
    return (
        <Layout>
            <div> 
                <Helmet title={frontmatter.title}/>
                <img></img>
                <h2> {frontmatter.title} </h2>
                <div dangerouslySetInnerHTML={{__html: html}}/> 
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
            }
        }
    }
`
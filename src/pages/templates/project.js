import React from 'react';
import Helmet from 'react-helmet';
import Layout from "../../components/layout"
import "./styling/post.scss"
import Img from "gatsby-image"

export default function PortfolioTemplate({ data: {markdownRemark} }) {
    if(markdownRemark !== null) {
    const frontmatter = markdownRemark.frontmatter;
    const html = markdownRemark.html;
      
    //const post = data.markdownRemark;
    return (
        <Layout>
            <Helmet title={frontmatter.title}/>
            <div class="blog-page-container">
                <div class="blog-page-header">
                        <Img style={{height:'100%', margin:'auto'}}fluid={frontmatter.image.childImageSharp.fluid}/>
                        <div class="blog-page-header__inner">
                            <div class="blog-page-header-text">
                            <h1>{frontmatter.title}</h1>
                            <div class="blog-page-header-subtitle">
                                <p>
                                {frontmatter.date}
                                <br/>
                                By Tom Franklin</p>
                            </div>
                            </div>
                        </div>
                    </div>
                    <div class="blog-page__inner-container">
                    <div class="blog-page-date">
                    </div>
                    <p class="footnote">{frontmatter.context}</p>
                    <div class="blog-page-contents">
                        <div class="blog-post-container__inner" dangerouslySetInnerHTML={{__html: html}}/>
                    </div>
                </div>
            </div>
        </Layout>
    )
    } else return null
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
                context
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
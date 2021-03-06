import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SectionPictureContainer from "../components/pictureContainer"
import Img from "gatsby-image"
import iconcogs from "../images/cogs.svg";
import icondata from "../images/data.svg";
import iconhtml from "../images/html.svg";
import iconthinking from "../images/thinking.svg";

const IndexPage = ({data}) => (
  <div>
  <Layout>
  <canvas class="canvas" id="fancycanvas"></canvas>
    <SectionPictureContainer></SectionPictureContainer>
    
    {/* Portfolio Section */}
    <section id="aboutme" class="title-section">
    <div class="contents-text-container">
      <h4>Hey!</h4>
      <p>
        I’m a <span class="highlighted-alt"> graduate software developer </span> from Northamptonshire, England.
        <br/>
        I love programming, and in my spare time I enjoy developing and 
        <br/>
         working on my own projects like this website.
        <br/>
      </p>
    </div>
      
      <div class="title-section__inner-container">
        <div class="skills-container">
        <div class="skills-container-item">
            <img class="icon1"src={icondata}/>
            <h3>Server-side Development</h3>
            <p>Developing and maintaining SQL Queries, Stored Procedures and Relational Databases in SQL.
            <br></br> 
            </p>
            <h4>Server-side Technologies</h4>
            <p>
              SQL Server 2019
              <br/>
              MySQL
              <br/>
              BASH Terminal
              <br/>
              PuTTY
              <br/>
              Git
            </p>
          </div>
          <div class="skills-container-item">
            <img class="icon1" src={iconcogs}/>
            <h3>Back-end Development</h3>
            <p>Building and maintaining .NET Core APIs in C# to producing software applications in Java. </p>
            <h4>Back-end Skills & Tools</h4>
            <p>
              .NET Core
              <br/>
              C#
              <br/>
              Java
            </p>
          </div>
          <div class="skills-container-item">
            <img class="icon1" src={iconhtml}/>
            <h3>Front-End Development</h3>
            <p> Producing and maintaining web based applications for clients in Angular and JavaScript Node.
            <br></br><br></br>
            </p>
            <h4>Front-End Technologies</h4>
            <p>
              TypeScript
              <br/>
              JavaScript
              <br/>
              SCSS
              <br/>
              Angular
              <br />
              GatsbyJS
            </p>
          </div>
        </div>
      </div>
    </section>

    <section class="contents-section blogposts">
      <div class="contents-section__inner">
        <div style={{paddingTop: "75px"}} id="portfolio" class="contents-title-container">
          <h2>Recent Personal Projects</h2>
        </div>
        <div class="contents-text-container centered">
        <p>
          Heres are some of the projects I have recently developed. 
          <br/>
        </p>
        </div>
        <div class="portfolio-post-list">
              {data.docs.edges.map(post => {
                    let featuredImgFluid = post.node.frontmatter.image.childImageSharp.fluid
              return (
                <Link class="portfolio-post-item" key={post.node.id} to={post.node.frontmatter.path}> 
                <div class="portfolio-post-item-details-top">
                        <h5>{post.node.frontmatter.title}</h5>
                          <div class="circle red">
                          </div>
                          <div class="circle orange">
                          </div>
                          <div class="circle green">
                          </div>
                      </div>
                      <div class="portfolio-post-item-image"><Img style={{margin:'auto'}}fluid={featuredImgFluid}/>
                      <div class="portfolio-post-item-details">
                        <div class="portfolio-post-item-details__inner">
                        {post.node.frontmatter.tags.map(tag => {
                      return (<h4>{tag}</h4>)
                            })}
                        </div>
                      </div>
                      </div>
              </Link>
              )})}
          </div>
      </div>
    </section>

    {/* Blog Section */}
    <section class="title-section-small">
        <div class="contents-text-container">
        <p>
          <span class="highlighted-alt"> Interested in working together? </span> I would love for you to get in contact
          <br/>
          <br/>
        </p>
        <a class="margin-auto" href="mailto:tomwilliamfranklin@gmail.com" ><button class="button-outlined highlighted">Drop me an email</button></a>
        </div>
    </section>

    <section id="blog" class="contents-section blogposts">
      <div class="contents-title-container">
          <h2>Blog</h2>
        </div>
        <div class="blog-post-list">
            {data.blogs.edges.map(post => {
              let featuredImgFluid = post.node.frontmatter.image.childImageSharp.fluid
            return (
              <Link class="blog-post-item" key={post.node.id} to={post.node.frontmatter.path}> 
                <div class="blog-post-item-text">
                    <div class="blog-post-item-title"><h2> {post.node.frontmatter.title}</h2></div>
                    <div class="blog-post-item-date"><h2> Published {post.node.frontmatter.date} </h2></div>
                    <div class="blog-post-item-summary"><h2> {post.node.frontmatter.summary} </h2></div>
                    <button class="button-outlined small">Read More</button>
                </div>
                <div class="blog-post-item-imagecontainer">
                    <div class="blog-post-item-image"><Img style={{width:'250px', height:'250px', margin:'auto'}}fluid={featuredImgFluid}/></div>
                </div>
            </Link>
            )})}
        </div>
    </section>
  </Layout>
  </div>
)

export const pageQuery = graphql `
query indexQuery {
  blogs: allMarkdownRemark(
    limit:10 
    filter: { fileAbsolutePath: {regex : "\/blogposts/"}, frontmatter: { published: {eq: true} } }
    sort:{fields: [frontmatter___title] order:ASC}
  
    ) {
      edges {
          node {
              id
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
  }
  docs: allMarkdownRemark(
    filter: { fileAbsolutePath: {regex : "\/portfolioposts/"},  frontmatter: { published: {eq: true} } },
    sort: {fields: [frontmatter___date], order: DESC},
  ) {
    totalCount
    edges {
        node {
            id
            frontmatter {
              date(formatString: "DD-MMMM-YYYY")
              title
              path         
              published
              tags
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
  }

}


`

export default IndexPage

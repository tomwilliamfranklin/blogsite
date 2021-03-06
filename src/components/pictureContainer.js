
import React from "react"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"
import SocialMedias from "../components/socialmedias"
import Img from "gatsby-image"
import { graphql } from "gatsby"
const pictureContainer = ({ data }) =>  { return (
<div>
<Helmet>
<script src={withPrefix('fading.js')}  type="text/javascript" ></script>
</Helmet>
  <section class="picture-section">
      <div class="colorbackground-fixed"/>
      <div class="background-fixed"/>
      {/* <Img style={{margin:'auto'}}fluid={data.file.childImageSharp.fluid}/> */}
      <div class="picture-section__inner">
        <div class="picture-section-container">
          <h1>Tom Franklin</h1>
          <h2>Graduate Software Developer</h2>
        </div>
        <div class="picture-section-breaker"></div>
        <SocialMedias></SocialMedias>
      </div>
</section>
</div>
)
}
export const query = graphql`
  query {
    file(relativePath: { eq: "images/default.jpg" }) {
      childImageSharp {
        fluid(maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
  `
export default pictureContainer

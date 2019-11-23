import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

const AboutImage = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "me-walking-in-the-park.jpg" }) {
        childImageSharp {
          fluid(quality: 100 maxHeight: 1000) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  `)

  return <div style={{display: 'flex',justifyContent: 'center'}}><Img style={{height:'auto', width:'100%'}} class="ImageContainer" fluid={data.placeholderImage.childImageSharp.fluid} class="about-image"/></div>
}

export default AboutImage
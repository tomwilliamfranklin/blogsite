/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import "./layout.scss"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"
import Header from "../components/header"
import SocialMedias from "../components/socialmedias"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
    <Helmet>
    <script src="https://kit.fontawesome.com/15be33f2fc.js" crossorigin="anonymous"></script>
    <script src={withPrefix('jquery.min.js')}  type="text/javascript" ></script>
    <script src={withPrefix('fancycanvas.js')}  type="text/javascript" ></script>
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet"></link>
    </Helmet>
    <Header></Header>
     <div class="mainContainer">
        <main class="main">
          {children}
        </main>       
      </div>

      <footer class="footer">
        <div class="footer-inner">
          <SocialMedias></SocialMedias>
           <p>
          © {new Date().getFullYear()}, Made with ♥ by Tom Franklin 
          </p>
          </div>
      </footer>

    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout

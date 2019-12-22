import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header class="header">
    <div class="header-inner">
    <a><span id="" class="navigation-button">About Me</span></a>
    <a><span id="" class="navigation-button">Portfolio</span></a>
    <a><span id="" class="navigation-button">Blog</span></a>
    </div>
  </header>
)
Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

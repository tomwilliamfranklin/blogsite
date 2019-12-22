import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header class="header">
    <div class="header-inner">
    <Link to="/#aboutme"><span id="nav-aboutme" class="navigation-button">About Me</span></Link>
    <Link to="/#portfolio"><span id="nav-portfolio" class="navigation-button">Portfolio</span></Link>
    <Link to="/#blog"><span id="nav-blog" class="navigation-button">Blog</span></Link>
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

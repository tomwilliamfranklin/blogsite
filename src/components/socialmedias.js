import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import iconemail from "../images/socialmedia/email.svg";
import icongithub from "../images/socialmedia/github.svg";
import iconlinkedin from "../images/socialmedia/linkedin.svg";
import icontwitter from "../images/socialmedia/twitter.svg";

const SocialMedias = ({ siteTitle }) => (
        <div class="picture-section-icons-container">
          <a href="mailto:tomwilliamfranklin@gmail.com"><img class="icon1"src={iconemail}/></a>
          <a href="https://github.com/tomwilliamfranklin"><img class="icon1"src={icongithub}/></a>
          <a href="https://twitter.com/tomwilliam31"><img class="icon1"src={icontwitter}/></a>
          <a href="https://www.linkedin.com/in/tomwilliamfranklin/"><img class="icon1"src={iconlinkedin}/></a>
        </div>
)
export default SocialMedias

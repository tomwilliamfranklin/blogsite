
import React from "react"
import Helmet from "react-helmet"
import { withPrefix, Link } from "gatsby"

const pictureContainer = ({ siteTitle }) => (
<div>
<Helmet>
<script src={withPrefix('fading.js')}  type="text/javascript" ></script>
</Helmet>
<canvas class="canvas" id="fancycanvas"></canvas>
  <section class="picture-section">
      <div class="colorbackground-fixed"/>
      <div class="background-fixed"/>
      <div class="picture-section__inner">
        <div class="picture-section-container">
          <h1>Tom Franklin</h1>
          <h2>Professional Software Developer</h2>
        </div>
        <div class="picture-section-breaker"></div>
        <div class="picture-section-icons-container">
          <a><i class="far fa-envelope"></i></a>
          <a><i class="fab fa-github"></i></a>
          <a><i class="fab fa-twitter"></i></a>
          <a><i class="fab fa-linkedin"></i></a>
        </div>
      </div>
</section>
</div>
)

export default pictureContainer

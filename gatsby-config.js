module.exports = {
  pathPrefix: "/",
  siteMetadata: {
    title: `blogsite`,
    description: `My blog site for recording different stuffs, - Tom Franklin `,
    author: `@tomfranklin`,
  },
  plugins: [
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [`gatsby-remark-responsive-iframe`],
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blogposts`,
        name: `blogposts`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/portfolioposts`,
        name: `portfolioposts`,
      },
    },
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },

    `gatsby-transformer-sharp`,
    `gatsby-plugin-sass`,
    {
      resolve:   `gatsby-source-filesystem`,
      options: {
        path:  `${__dirname}/src/components`,
        name: `pages`,
      }
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-mdx`,
      options: {
        gatsbyRemarkPlugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 1200,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 590,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: "gatsby-remark-custom-blocks",
            options: {
              blocks: {
                header: {
                  classes: "blog-page-header",
                },
                title: {
                  classes: "blog-page-title",
                },
                image: {
                  classes: "blog-page-image",
                },
              },
            },
          },
        ],
      },
    },
  ],
  
}

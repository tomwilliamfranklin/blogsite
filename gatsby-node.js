const path = require('path');
exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators;
    const portfolioTemplate = path.resolve('src/pages/templates/project.js');
    return graphql(`{
        blogs: allMarkdownRemark {
            edges {
                node {
                    html
                    id
                    frontmatter {
                        path
                        title
                    }
                }
            }
        }
    }`)
    .then(res => {
        if(res.errors) {
            return Promise.reject(res.rerros);
        }
        res.data.blogs.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: portfolioTemplate,
                context:(node)
            })
        })
    })
}

const express= require('express');

exports.onCreateDevServer=({app})=>{
    app.use(express.static('public'))
}
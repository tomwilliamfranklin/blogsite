const path = require('path');
exports.createPages = ({boundActionCreators, graphql}) => {
    const {createPage} = boundActionCreators;
    const postTemplate = path.resolve('src/pages/templates/post.js');
    const docTemplate = path.resolve('src/pages/templates/project.js');
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
        docs: allMarkdownRemark {
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
                component: postTemplate,
            })
        })

        res.data.docs.edges.forEach(({node}) => {
            createPage({
                path: node.frontmatter.path,
                component: docTemplate,
            })
        })
    })
}


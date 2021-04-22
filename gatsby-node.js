const path = require(`path`)
const chunk = require(`lodash/chunk`)

// This is a simple debugging tool
// dd() will prettily dump to the terminal and kill the process
// const { dd } = require(`dumper.js`)

/**
 * exports.createPages is a built-in Gatsby Node API.
 * It's purpose is to allow you to create pages for your site! 💡
 *
 * See https://www.gatsbyjs.com/docs/node-apis/#createPages for more info.
 */
exports.createPages = async gatsbyUtilities => {
  // Query our posts from the GraphQL server
  const posts = await getPosts(gatsbyUtilities)
  const heroes = await getHero(gatsbyUtilities)
  const pages = await getPages(gatsbyUtilities)

  // If there are no posts in WordPress, don't do anything
  if (!posts.length) {
    return
  }

  // If there are posts, create pages for them
  await createIndividualBlogPostPages({ posts, gatsbyUtilities })

  // If there are posts, create pages for them
  await createIndividualHeroPostPages({ heroes, gatsbyUtilities })

  // If there are posts, create pages for them
  await createIndividualPages({ pages, gatsbyUtilities })

}

/**
 * This function creates all the individual blog pages in this site
 */
const createIndividualBlogPostPages = async ({ posts, gatsbyUtilities }) =>
  Promise.all(
    posts.map(({ previous, post, next }) =>
      // createPage is an action passed to createPages
      // See https://www.gatsbyjs.com/docs/actions#createPage for more info
      gatsbyUtilities.actions.createPage({
        // Use the WordPress uri as the Gatsby page path
        // This is a good idea so that internal links and menus work 👍
        path: post.uri,

        // use the blog post template as the page component
        component: path.resolve(`./src/templates/WpPost.js`),

        // `context` is available in the template as a prop and
        // as a variable in GraphQL.
        context: {
          // we need to add the post id here
          // so our blog post template knows which blog post
          // the current page is (when you open it in a browser)
          id: post.id,

          // We also use the next and previous id's to query them and add links!
          previousPostId: previous ? previous.id : null,
          nextPostId: next ? next.id : null,
        },
      })
    )
  )
/**
 * This function creates all the individual blog pages in this site
 */
 const createIndividualHeroPostPages = async ({ heroes, gatsbyUtilities }) =>
 Promise.all(
   heroes.map(({ previous, post, next }) =>
     // createPage is an action passed to createPages
     // See https://www.gatsbyjs.com/docs/actions#createPage for more info
     gatsbyUtilities.actions.createPage({
       // Use the WordPress uri as the Gatsby page path
       // This is a good idea so that internal links and menus work 👍
       path: post.uri,

       // use the blog post template as the page component
       component: path.resolve(`./src/templates/WpHero.js`),

       // `context` is available in the template as a prop and
       // as a variable in GraphQL.
       context: {
         // we need to add the post id here
         // so our blog post template knows which blog post
         // the current page is (when you open it in a browser)
         id: post.id,

         // We also use the next and previous id's to query them and add links!
         previousPostId: previous ? previous.id : null,
         nextPostId: next ? next.id : null,
       },
     })
   )
 )
 /**
 * This function creates all the individual pages in this site
 */
 const createIndividualPages = async ({ pages, gatsbyUtilities }) =>
 Promise.all(
   pages.map(({ previous, post, next }) =>
     // createPage is an action passed to createPages
     // See https://www.gatsbyjs.com/docs/actions#createPage for more info
     gatsbyUtilities.actions.createPage({
       // Use the WordPress uri as the Gatsby page path
       // This is a good idea so that internal links and menus work 👍
       path: post.uri,

       // use the blog post template as the page component
       component: path.resolve(`./src/templates/WpPage.js`),

       // `context` is available in the template as a prop and
       // as a variable in GraphQL.
       context: {
         // we need to add the post id here
         // so our blog post template knows which blog post
         // the current page is (when you open it in a browser)
         id: post.id,
       },
     })
   )
 )
/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
async function getPosts({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPosts {
      # Query all WordPress blog posts sorted by date
      allWpPost(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
      # Query heroes
      allWpHero(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPost.edges
}


/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
 async function getHero({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpHero {
      # Query heroes
      allWpHero(sort: { fields: [date], order: DESC }) {
        edges {
          previous {
            id
          }

          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }

          next {
            id
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpHero.edges
}

/**
 * This function queries Gatsby's GraphQL server and asks for
 * All WordPress blog posts. If there are any GraphQL error it throws an error
 * Otherwise it will return the posts 🙌
 *
 * We're passing in the utilities we got from createPages.
 * So see https://www.gatsbyjs.com/docs/node-apis/#createPages for more info!
 */
 async function getPages({ graphql, reporter }) {
  const graphqlResult = await graphql(/* GraphQL */ `
    query WpPage {
      # Query heroes
      allWpPage(sort: { fields: [date], order: DESC }) {
        edges {
          # note: this is a GraphQL alias. It renames "node" to "post" for this query
          # We're doing this because this "node" is a post! It makes our code more readable further down the line.
          post: node {
            id
            uri
          }
        }
      }
    }
  `)

  if (graphqlResult.errors) {
    reporter.panicOnBuild(
      `There was an error loading your blog posts`,
      graphqlResult.errors
    )
    return
  }

  return graphqlResult.data.allWpPage.edges
}

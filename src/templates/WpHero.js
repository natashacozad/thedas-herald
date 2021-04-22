import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/layout";
import SEO from "../components/seo";
import PostCard from "../components/post-card";

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

const WpHero = ({ data }) => {
  const {
    wpHero: { title, content, id },
  } = data
  return (
    <Layout>
    <div className={`post-${id}`}>
      <h1>{title}</h1>
      <div dangerouslySetInnerHTML={{ __html: content }} />
    </div>
    </Layout>
  )
}
export const query = graphql`
  query($id: String) {
    wpHero(id: { eq: $id }) {
      title
      content
      featuredImage {
        node {
          id
        }
      }
    }
  }
`
export default WpHero
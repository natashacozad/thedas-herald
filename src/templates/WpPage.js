import React from "react"
import { graphql } from "gatsby"

// We're using Gutenberg so we need the block styles
import "@wordpress/block-library/build-style/style.css"
import "@wordpress/block-library/build-style/theme.css"

const WpPage = ({
    data: {
      wpPage: { title, content, id },
    },
  }) => {
    return (
      <div className={`post-${id}`}>
        <h1>{title}</h1>
        <div dangerouslySetInnerHTML={{ __html: content }} />
      </div>
    )
  }

export default WpPage

export const query = graphql`
  query($id: String) {
    wpPage(id: { eq: $id }) {
      id
      title
      content
    }
  }
`
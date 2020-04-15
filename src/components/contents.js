import React, { useState } from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

const PRE = [
  { slug: "introduction-disclaimer", title: "Introduction & Disclaimer" },
  { slug: "method-for-sourcing-data", title: "Method for Sourcing Data" },
]

const POST = [
  { slug: "about-us", title: "About Us" },
  { slug: "references", title: "References" },
]

const Contents = () => {
  const data = useStaticQuery(graphql`
    query {
      allMarkdownRemark(
        sort: { order: ASC, fields: frontmatter___order }
        filter: { frontmatter: { type: { eq: "plot" } } }
      ) {
        edges {
          node {
            htmlAst
            frontmatter {
              slug
              title
            }
          }
        }
      }
    }
  `)

  const [isOpen, setIsOpen] = useState(false)

  function handleClick() {
    setIsOpen(isOpen => !isOpen)
  }

  const contents = PRE.concat(
    data.allMarkdownRemark.edges.map(
      ({
        node: {
          frontmatter: { slug, title },
        },
      }) => ({ slug, title })
    )
  ).concat(POST)

  return (
    <div className="text-base max-w-screen-sm m-auto xl:fixed">
      <Header isOpen={isOpen} onClick={handleClick} />
      <div className={`${isOpen ? "" : "hidden xl:block"} px-2 w-64`}>
        {contents.map(({ slug, title }, i) => (
          <Link
            className={`${
              i > 0 ? "mt-1" : ""
            } px-2 py-1 block rounded truncate hover:bg-gray-300`}
            key={slug}
            to={`/#${slug}`}
          >
            {title}
          </Link>
        ))}
      </div>
    </div>
  )
}

const Header = ({ isOpen, onClick }) => (
  <div className="flex items-center justify-between px-4 py-3 xl:hidden">
    <div />
    <div className="flex">
      <Button isOpen={isOpen} onClick={onClick} />
    </div>
  </div>
)

const Button = ({ isOpen, onClick }) => (
  <button className="focus:outline-none" onClick={onClick}>
    <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24">
      {isOpen ? (
        <path d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z" />
      ) : (
        <path
          fillRule="evenodd"
          d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
        />
      )}
    </svg>
  </button>
)

export default Contents

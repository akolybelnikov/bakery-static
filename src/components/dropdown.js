import { graphql, useStaticQuery, navigate } from "gatsby"
import React from "react"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { theme } from "../utils/styles"

const animatedComponents = makeAnimated()

const styles = {
  control: styles => ({
    ...styles,
    minWidth: `200px`,
    borderColor: theme.colors.complimentary,
    boxShadow: theme.colors.complimentary,
    "&:focus": {
      borderColor: theme.colors.complimentary,
    },
    "&:hover": {
      borderColor: theme.colors.primary,
    },
  }),
  input: styles => ({
    ...styles,
    color: theme.colors.primary,
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: isSelected ? `white` : theme.colors.primary,
    backgroundColor: isSelected
      ? theme.colors.primary
      : isFocused
      ? theme.colors.secondary
      : null,
  }),
  placeholder: styles => ({ ...styles, color: theme.colors.primary }),
  singleValue: styles => ({ ...styles, color: theme.colors.primary }),
}

export default ({ location }) => {
  const path = location.pathname.replace("/", "")
  const { allContentfulCategory } = useStaticQuery(
    graphql`
      query {
        allContentfulCategory(filter: { node_locale: { eq: "ru" } }) {
          edges {
            node {
              name
              label
            }
          }
        }
      }
    `
  )

  const categories = allContentfulCategory.edges.map(edge => ({
    value: edge.node.name,
    label: edge.node.label,
  }))

  const selectedOption =
    categories.find(category => category.value === path) || null

  const handleChange = option => {
    navigate(`/${option.value}`)
  }

  return (
    <Select
      components={animatedComponents}
      options={categories}
      styles={styles}
      defaultValue={selectedOption}
      onChange={handleChange}
      placeholder="Наша продукция"
    />
  )
}

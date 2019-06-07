import { graphql, useStaticQuery, navigate } from "gatsby"
import React from "react"
import Select from "react-select"
import makeAnimated from "react-select/animated"
import { theme } from "../utils/styles"

const animatedComponents = makeAnimated()

const styles = {
  control: (styles, { isFocused, isSelected }) => ({
    ...styles,
    minWidth: `175px`,
    color: theme.colors.primary,
    borderColor: "transparent",
    transition: "all 200ms ease-in",
    fontWeight: (isFocused || isSelected) ? 500 : 300,
    boxShadow: (isFocused || isSelected) ? "inset 0 0 0 2px" :  "inset 0 0 0 1px",
    "&:hover": {
      boxShadow: "inset 0 0 0 2px",
      fontWeight: 500,
    },
    marginBottom: 8,
    fontSize: 16,
  }),
  input: styles => ({
    ...styles,
    color: theme.colors.primary,
    margin: "4px 0",
  }),
  option: (styles, { isFocused, isSelected }) => ({
    ...styles,
    color: isSelected ? `white` : theme.colors.primary,
    backgroundColor: isSelected
      ? theme.colors.primary
      : isFocused
      ? theme.colors.secondary
      : null,
      fontSize: 16,
  }),
  dropdownIndicator: styles => ({
    ...styles,
    "&:focus": {
      color: theme.colors.primary,
    },
    "&:active": {
      color: theme.colors.primary,
    },
    "&:hover": {
      color: theme.colors.primary,
    },
  }),
  indicatorSeparator: styles => ({
    ...styles,
    backgroundColor: theme.colors.primary,
  }),
  placeholder: styles => ({ ...styles, color: theme.colors.primary }),
  singleValue: styles => ({ ...styles, color: theme.colors.primary }),
}

export default ({ location }) => {
  const path = location && location.pathname.replace("/", "")
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

  const selectedOption = categories.find(category => category.value === path)

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
      placeholder="Продукция"
    />
  )
}

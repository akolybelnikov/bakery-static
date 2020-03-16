import { Input } from "@rebass/forms"
import Fuse from "fuse.js"
import { graphql } from "gatsby"
import { Form, useField } from "informed"
import React, { useRef, useState } from "react"
import Responsive from "react-responsive"
import { Box, Button, Flex, Heading, Text } from "rebass"
import BottomSheet from "../components/aws/BottomSheet"
import Layout from "../components/layout"
import MobileProductFeed from "../components/mobileproducts"
import ProductFeed from "../components/products"
import SEO from "../components/seo"
import { theme } from "../utils/styles"

const Default = props => <Responsive {...props} minWidth={768} />
const Mobile = props => <Responsive {...props} maxWidth={767} />

const TextInput = props => {
  const { fieldState, fieldApi, render, ref, userProps } = useField({
    ...props,
  })

  const { value } = fieldState
  const { setValue, setTouched } = fieldApi
  const { onChange, onBlur, onKeyPress, ...rest } = userProps

  return render(
    <Input
      {...rest}
      ref={ref}
      value={!value && value !== 0 ? "" : value}
      onChange={e => {
        setValue(e.target.value)
        if (onChange) {
          onChange(e)
        }
      }}
      onBlur={e => {
        setTouched(true)
        if (onBlur) {
          onBlur(e)
        }
      }}
    />
  )
}

const Category = ({
  data: {
    contentfulCategory: { label, product },
  },
  location,
}) => {
  const activeProducts = product.filter(p => p.status !== "inactive" && p.image)

  const [products, setProducts] = useState(activeProducts)
  const [noResults, setNoResults] = useState(false)
  const [searchResults, setSearchResults] = useState([])
  const apiRef = useRef()

  const options = {
    shouldSort: true,
    includeMatches: true,
    minMatchCharLength: 4,
    threshold: 0.4,
    location: 0,
    distance: 1000,
    keys: [
      "productName",
      "ingridients.ingridients",
      "description.internal.content",
      "filling.name",
    ],
  }

  const filterProducts = term => {
    let searchItems = []
    const fuse = new Fuse(activeProducts, options)
    const results = fuse.search(term)

    if (results.length) {
      for (let result of results) {
        if (result.matches.length) {
          searchItems = [...searchItems, ...[result.item]]
        }
      }
      setSearchResults(searchItems)
    }
  }

  const onTextInput = e => {
    const {
      currentTarget: { value },
    } = e

    if (value.length > 3) {
      filterProducts(value)
      if (searchResults.length) {
        setProducts(searchResults)
      }
    } else {
      setProducts(activeProducts)
    }
  }

  const onFilterProducts = form => {
    const { term } = form
    if (term && term.length > 3) {
      filterProducts(term)
      if (searchResults.length) {
        setProducts(searchResults)
      } else {
        setNoResults(true)
        setTimeout(() => setNoResults(false), 3000)
      }
    } else {
      setProducts(activeProducts)
      setNoResults(false)
    }
  }

  const closeBottomSheet = () => {
    setNoResults(false)
  }

  return (
    <Layout location={location} title={label}>
      <SEO title={label} />
      <Flex
        px={[0, 3]}
        flexWrap="wrap"
        justifyContent={["flex-start", "space-between"]}
        alignItems={["flex-end"]}
      >
        <Heading mb={[3, 4]} color="primary">
          {label}
        </Heading>
        <Form apiRef={apiRef} onSubmit={onFilterProducts}>
          <Flex alignItems={["flex-end"]}>
            <TextInput
              mr={[1]}
              sx={{
                borderRadius: [4],
              }}
              type="text"
              placeholder={"Поиск"}
              width={[250]}
              height={[48]}
              field="term"
              id="term"
              onChange={onTextInput}
            />
            <Button height={48} variant="primary" type="submit">
              Искать
            </Button>
          </Flex>
        </Form>
      </Flex>
      <Box>
        <Default>
          <ProductFeed location={location} products={products} />
        </Default>
        <Mobile>
          <MobileProductFeed location={location} products={products} />
        </Mobile>
        <BottomSheet
          color={`white`}
          toggle={closeBottomSheet}
          open={noResults}
          width={`70%`}
          left={`15%`}
          backgroundColor={theme.colors.primary}
          children={
            <Text>
              Наименований не найдено. Попробуйте изменить условия поиска.
            </Text>
          }
        />
      </Box>
    </Layout>
  )
}

export default Category

export const pageQuery = graphql`
  query($name: String!) {
    contentfulCategory(name: { eq: $name }, node_locale: { eq: "ru" }) {
      name
      label
      product {
        id
        category {
          name
        }
        image {
          fluid(maxWidth: 900) {
            sizes
            src
            srcSet
            srcSetWebp
            srcWebp
            base64
            aspectRatio
          }
        }
        description {
          internal {
            content
          }
        }
        filling {
          name
        }
        ingridients {
          ingridients
          internal {
            content
          }
        }
        productName
        price
        weight
        status
      }
    }
  }
`

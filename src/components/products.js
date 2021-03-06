import Img from "gatsby-image/withIEPolyfill"
import React, { useState } from "react"
import Modal from "react-responsive-modal"
import { Button, Card, Flex } from "rebass"
import styled from "styled-components"
import Open from "../components/svg/open"
import { theme } from "../utils/styles"
import ProductCard from "./productcard"

const modalStyles = {
  overlay: {
    // padding: 0,
  },
  modal: {
    padding: 0,
    borderRadius: 12,
    maxWidth: `500px`,
  },
  closeButton: {
    boxShadow: "0 0 0 transparent",
    outline: "none",
    cursor: "pointer",
    left: 20,
  },
}

const Container = styled(Flex)`
  position: relative;
`

const StyledCard = styled(Card).attrs({
  width: [3 / 10],
})`
  background: ${props => props.theme.colors.secondary};
`

const Image = styled(Img)`
  width: 100%;
  height: 30vw;
  border-top-left-radius: 8px;
  border-top-right-radius: 8px;
  background: white;
  @media (min-width: 1199px) {
    height: 25vw;
  }
`

const ProductFeed = ({ products, location }) => {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen(!open)

  const [current, setIdx] = useState(0)
  const handleClick = i => {
    setIdx(i)
    toggle()
  }

  return (
    <>
      <Container mb={4} flexWrap={"wrap"}>
        {products.map(({ category: { name }, image, productName }, index) => {
          return (
            <StyledCard
              key={index}
              mx={"auto"}
              my={3}
              borderRadius={12}
              boxShadow={`0 2px 8px ${theme.colors.primaryBR4}`}
            >
              {image && (
                <Image
                  fluid={image.fluid}
                  objectFit={name === "order" ? "cover" : "contain"}
                />
              )}
              <Flex
                style={{ minHeight: 90 }}
                alignItems={"center"}
                justifyContent={"center"}
              >
                <Button
                  onClick={() => handleClick(index)}
                  style={{ fontWeight: 400 }}
                  variant="clear"
                >
                  {productName}
                  <Open width={24} height={24} fill={theme.colors.primary} />
                </Button>
              </Flex>
            </StyledCard>
          )
        })}
      </Container>
      {products[current] && (
        <Modal
          open={open}
          onClose={toggle}
          styles={modalStyles}
          closeIconSize={50}
          closeIconSvgPath={
            <>
              <path
                fill={theme.colors.primary}
                d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"
              />
              <path fill="none" d="M0 0h24v24H0V0z" />
            </>
          }
          children={
            <ProductCard
              product={products[current]}
              location={location}
              toggle={toggle}
            />
          }
        />
      )}
    </>
  )
}

export default ProductFeed

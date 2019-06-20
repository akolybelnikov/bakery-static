import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import {
  FacebookIcon,
  FacebookShareButton,
  OKIcon,
  OKShareButton,
  VKIcon,
  VKShareButton,
  WhatsappIcon,
  WhatsappShareButton,
} from "react-share"
import { Flex } from "rebass"
import urljoin from "url-join"

export default ({ location, iconSize, quote, title, description, image }) => {
  const {
    site: {
      siteMetadata: { siteUrl },
    },
  } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            siteUrl
          }
        }
      }
    `
  )
  const url = urljoin(siteUrl, location.pathname)

  return (
    <Flex justifyContent="space-around" pt={2}>
      <FacebookShareButton url={url} quote={quote}>
        <FacebookIcon round size={iconSize} />
      </FacebookShareButton>
      <VKShareButton
        url={url}
        tite={title}
        description={description}
        image={image}
        windowWidth={660}
        windowHeight={460}
      >
        <VKIcon round size={iconSize} />
      </VKShareButton>
      <OKShareButton
        url={url}
        tite={title}
        description={description}
        image={image}
      >
        <OKIcon round size={iconSize} />
      </OKShareButton>
      <WhatsappShareButton url={url} tite={title} separator=":: ">
        <WhatsappIcon round size={iconSize} />
      </WhatsappShareButton>
    </Flex>
  )
}

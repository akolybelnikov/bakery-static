import axios from "axios"
import React, { useEffect, useState } from "react"
import Moment from "react-moment"
import { Card, Flex, Image, Text } from "rebass"
import styled from "styled-components"
import InstagramIcon from "./svg/instagram"

const StyledImage = styled(Image)`
  margin: 0 auto;
  opacity: 1;
  transition: opacity 0.25s ease-in;
`
const StyledLink = styled.a`
  cursor: pointer;
  text-shadow: none;
  background-image: none;
`

export default () => {
  const [posts, setData] = useState({ posts: {} })

  const fetchData = async () => {
    const result = await axios(
      `https://graph.instagram.com/me/media?fields=id,caption,media_url,timestamp, permalink&access_token=${
        process.env.GATSBY_INSTAGRAM_ACCESS_TOKEN
      }&limit=4`
    )
    setData(result.data.data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <>
      {!posts.length && (
        <Flex justifyContent="center" mt={2}>
          <StyledLink
            aria-label="Instagram link"
            href="https://www.instagram.com/vsebulochkitut"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon width={36} />
          </StyledLink>
        </Flex>
      )}
      {posts.length && (
        <Flex flexWrap="wrap">
          {posts.map(
            (
              {
                timestamp,
                media_url,
                caption,
                permalink,
              },
              i
            ) => {
              const lastSpace = caption.normalize().substring(0, 170).lastIndexOf(" ")

              return (
                <Card
                  key={i}
                  width={[96 / 100, 46 / 100]}
                  mx="auto"
                  p={2}
                  mb={4}
                  bg="secondary"
                  borderRadius={8}
                  boxShadow="0 2px 16px rgba(0, 0, 0, 0.25)"
                >
                  <Flex justifyContent="space-between" mb={2}>
                    <Text>
                      <Moment unix locale="ru" format="LL">
                        {timestamp}
                      </Moment>
                    </Text>
                    <StyledLink
                      aria-label="Instagram link"
                      href={permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <InstagramIcon width={24} />
                    </StyledLink>
                  </Flex>
                  <StyledImage
                    src={media_url}
                    alt="instagram post image"
                    borderRadius={2}
                  />
                  <Text p={2} style={{ wordBreak: "break-word" }}>
                    {caption && caption.normalize().substring(0, lastSpace)}
                    &nbsp;...&nbsp;
                    <StyledLink
                      style={{
                        backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) 1px, #950451 1px, #950451 2px, rgba(0, 0, 0, 0) 2px)`,
                      }}
                      aria-label="Instagram link"
                      href={permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      читать дальше.
                    </StyledLink>
                  </Text>
                </Card>
              )
            }
          )}
        </Flex>
      )}
    </>
  )
}

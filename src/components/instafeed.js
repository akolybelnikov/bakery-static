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
  background-image: none;
  cursor: pointer;
  text-shadow: none;
`

export default () => {
  const [posts, setData] = useState({ posts: {} })

  const fetchData = async () => {
    const result = await axios(
      `https://api.instagram.com/v1/users/${
        process.env.GATSBY_INSTAGRAM_USER_ID
      }/media/recent/?access_token=${
        process.env.GATSBY_INSTAGRAM_ACCESS_TOKEN
      }&&count=4`
    )
    setData(result.data.data)
  }

  useEffect(() => {
    fetchData()
  }, {})

  return (
    <>
      {!posts.length && (
        <Flex justifyContent="center" mt={2}>
          <StyledLink
            aria-label="Instagram link"
            href="https://www.instagram.com/confertru.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon width={36} />
          </StyledLink>
        </Flex>
      )}
      {posts.length && (
        <Flex flexWrap="wrap">
          {posts.map((post, i) => (
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
                    {post.created_time}
                  </Moment>
                </Text>
                <StyledLink
                  aria-label="Instagram link"
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <InstagramIcon width={24} />
                </StyledLink>
              </Flex>
              <StyledImage
                src={post.images.standard_resolution.url}
                alt="instagram post image"
                borderRadius={2}
              />
              <Text style={{ wordBreak: "break-word" }}>
                {post.caption && post.caption.text.substring(0, 150)} ...
                <StyledLink
                  aria-label="Instagram link"
                  href={post.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp; &nbsp; &nbsp; читать дальше.
                </StyledLink>
              </Text>
            </Card>
          ))}
        </Flex>
      )}
    </>
  )
}

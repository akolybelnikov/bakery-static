import React from "react"
import { Box, Flex, Text } from "rebass"
import styled from "styled-components"
import FacebookIcon from "./svg/facebook"
import InstagramIcon from "./svg/instagram"

const StyledLink = styled.a`
  background-image: none;
  img,
  span {
    margin: 0 10px;
  }
`

export default () => {
  return (
    <footer>
      <Flex flexWrap="wrap" mx={-2} my={4}>
        <Flex flexDirection="column" p={2} width={[1, 1 / 4]}>
          <Text color="primary" fontWeight="bolder">
            Наш адрес:
          </Text>
          <span>109377, г.Москва</span>
          <span>Рязанский проспект, 58/1</span>
        </Flex>
        <Flex flexDirection="column" p={2} width={[1, 1 / 4]}>
          <Text color="primary" fontWeight="bolder">
            Наши номера телефона:
          </Text>
          <span>+7 (926) 982-35-72</span>
          <span>+7 (926) 629-87-26</span>
        </Flex>
        <Flex flexDirection="column" p={2} width={[1, 1 / 2]}>
          <Text color="primary" fontWeight="bolder">
            Наши часы работы:
          </Text>
          <span>с понедельника по субботу: с 8.00 до 20.00</span>
          <span>в воскресенье: с 9.00 до 18.00</span>
        </Flex>
      </Flex>
      <Flex justifyContent="space-around" mx={-2}>
        <Box>
          <Text />
          <FacebookIcon width={36} />
        </Box>
        <Box>
          <Text />
          <InstagramIcon width={36} />
        </Box>
      </Flex>
      <Flex flexDirection="column" mx={-2} my={4}>
        <Text px={2} py={1} width={1} textAlign={["left", "center"]}>
          <StyledLink
            href="https://www.copyright.ru/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Copyright
          </StyledLink>
          <StyledLink
            href="https://www.copyright.ru/ru/documents/zashita_avtorskih_prav/znak_ohrani_avtorskih_i_smegnih_prav/"
            target="_blank"
            rel="noopener noreferrer"
          >
            ©<span>2019</span>
          </StyledLink>
          <strong>Все Булочки Тут</strong>
        </Text>
        <Text px={2} py={1} width={1} textAlign={["left", "center"]}>
          <StyledLink
            href="https://www.copyright.ru/ru/documents/registraciy_avtorskih_prav/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Все права защищены
          </StyledLink>
          <StyledLink
            href="https://copyright.ru"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="https://copyright.ru/images/TMCIMG/copyright_2.gif"
              alt="www.copyright.ru"
              title="Copyright защита прав"
            />
          </StyledLink>
        </Text>
        <Text px={2} py={1} width={1} textAlign={["left", "center"]}>
          Услуги разработчика:
          <StyledLink
            href="https://github.com/akolybelnikov"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>Андрей Колыбельников</span>
          </StyledLink>
        </Text>
        <Text px={2} py={1} width={1} textAlign={["left", "center"]}>
          <span>Программный код страницы защищён лицензией:</span>
          <StyledLink
            href="https://opensource.org/licenses/mit-license.php"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span>MIT</span>
          </StyledLink>
        </Text>
      </Flex>
    </footer>
  )
}

import React from "react"
import { Box, Flex, Text } from "rebass"
import styled from "styled-components"
import FacebookIcon from "./svg/facebook"
import InstagramIcon from "./svg/instagram"
import GoogleMapIcon from "./svg/googlemap"
import { Link } from "gatsby"

const StyledLink = styled.a`
  background-image: none;
  img,
  span {
    margin: 0 10px;
  }
  cursor: pointer;
`

const PhoneButton = styled.a`
  color: ${props => props.theme.colors.primary};
  background: ${props => props.theme.colors.secondaryWashed};
  padding: 6px 12px;
  margin: 8px 0;
  border-radius: 8px;
  width: fit-content;
  cursor: pointer;
  text-shadow: none;
`

export default () => {
  return (
    <footer>
      <Flex flexWrap="wrap" mx={[-2, 2]} my={4}>
        <Flex flexDirection="column" p={2} width={[1, 3.33 / 10]}>
          <Text fontSize={[2,2,3]} color="primary" fontWeight="normal">
            Наш адрес эл. почты:
          </Text>
          <PhoneButton
            href="mailto:confert76@gmail.com?Subject=Контакт со службой поддержки"
            target="_self"
            name="email"
          >
            confert76@gmail.ru
          </PhoneButton>
          <Text mb={[1,2]} fontSize={[2,2,3]} color="primary" fontWeight="normal">
            Наш адрес:
          </Text>
          <Text fontSize={[2,2,3]}>109377, г.Москва</Text>
          <Text fontSize={[2,2,3]}>Рязанский проспект, 58/1</Text>
        </Flex>
        <Flex flexDirection="column" p={2} width={[1, 3.33 / 10]}>
          <Text fontSize={[2,2,3]} color="primary" fontWeight="normal">
            Наши номера телефона:
          </Text>
          <PhoneButton
            href="tel:+79269823572"
            target="_self"
            name="phone number"
          >
            +7 (926) 982-35-72
          </PhoneButton>
          <PhoneButton
            href="tel:+79266298726"
            target="_self"
            name="phone number"
          >
            +7 (926) 629-87-26
          </PhoneButton>
        </Flex>
        <Flex flexDirection="column" p={2} width={[1, 3.33 / 10]}>
          <Text fontSize={[2,2,3]} color="primary" fontWeight="normal" mb={[1,2]}>
            Наши часы работы:
          </Text>
          <Text mb={[1,2]} fontSize={[2,2,3]}>с понедельника по субботу: с 8.00 до 20.00</Text>
          <Text fontSize={[2,2,3]}>в воскресенье: с 9.00 до 18.00</Text>
        </Flex>
      </Flex>
      <Flex justifyContent={[`flex-start`, `space-around`]} alignItems="center">
        <Box>
          <Link aria-label="Google maps link" to={`/contact`}>
            <Box mr={[5]}>
              <GoogleMapIcon width={48} />
            </Box>
          </Link>
        </Box>
        <Box>
          <StyledLink
            aria-label="Facebook link"
            href="https://www.facebook.com/CONFERTRU.RU"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Box mr={[5]}>
              <FacebookIcon width={36} />
            </Box>
          </StyledLink>
        </Box>
        <Box>
          <StyledLink
            aria-label="Instagram link"
            href="https://www.instagram.com/vsebulochkitut"
            target="_blank"
            rel="noopener noreferrer"
          >
            <InstagramIcon width={36} />
          </StyledLink>
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

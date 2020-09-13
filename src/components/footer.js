import { Link } from "gatsby"
import React from "react"
import { Box, Flex, Text } from "rebass"
import styled from "styled-components"
import FacebookIcon from "./svg/facebook"
import GoogleMapIcon from "./svg/googlemap"
import InstagramIcon from "./svg/instagram"

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

const Copyright = styled(Flex)`
  @media (max-width: 600px) {
    border-block-start: 4px dotted ${props => props.theme.colors.secondary};
    border-block-end: 4px dotted ${props => props.theme.colors.secondary};
  }
`

const Footer = () => {
  return (
    <footer>
      <Flex flexWrap="wrap" mx={[-2, 2]} my={4}>
        <Flex flexDirection="column" p={2} width={[1, 3.33 / 10]}>
          <Text fontSize={[2, 2, 3]} color="primary" fontWeight="normal">
            Наш адрес эл. почты:
          </Text>
          <PhoneButton
            href="mailto:confert76@gmail.com?Subject=Контакт со службой поддержки"
            target="_self"
            name="email"
          >
            confert76@gmail.com
          </PhoneButton>
          <Text
            mb={[1, 2]}
            fontSize={[2, 2, 3]}
            color="primary"
            fontWeight="normal"
          >
            Наш адрес:
          </Text>
          <Text fontSize={[2, 2, 3]}>109377, г.Москва</Text>
          <Text fontSize={[2, 2, 3]}>Рязанский проспект, 58/1</Text>
        </Flex>
        <Flex flexDirection="column" p={2} width={[1, 3.33 / 10]}>
          <Text fontSize={[2, 2, 3]} color="primary" fontWeight="normal">
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
          <Text pt={[3, 2]} fontSize={[2, 2, 3]}>
            <Link aria-label="Delivery and payment" to={`/delivery`}>
              Оплата и доставка{" "}
            </Link>
          </Text>
        </Flex>
        <Flex flexDirection="column" p={2} width={[1, 3.33 / 10]}>
          <Text
            fontSize={[2, 2, 3]}
            color="primary"
            fontWeight="normal"
            mb={[1, 2]}
          >
            Наши часы работы:
          </Text>
          <Text mb={[1, 2]} fontSize={[2, 2, 3]}>
            с понедельника по пятницу:
          </Text>
          <Text mb={[1, 2]} fontSize={[2, 2, 3]}>
            9.00 - 21.00
          </Text>
          <Text fontSize={[2, 2, 3]}>
            в субботу, воскресенье и праздничные дни:
          </Text>
          <Text fontSize={[2, 2, 3]}>10.00 - 18.00</Text>
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
      <Flex flexWrap="wrap" mx={[-2, 2]} mt={[0, 4]}>
        <Copyright flex={["100%", "60%"]} flexDirection="column" p={2} my={[2]}>
          <Text py={1} width={1}>
            <Link aria-label="Privacy policy" to={`/privacy`}>
              Правила и условия пользования сайтом{" "}
            </Link>
          </Text>
          <Text py={1} width={1}>
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
          <Text py={1} width={1}>
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
            ></StyledLink>
          </Text>
          <Text py={1} width={1}>
            Услуги разработчика:
            <StyledLink
              href="https://akolybelnikov.now.sh"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>Андрей Колыбельников</span>
            </StyledLink>
          </Text>
          <Text py={1} width={1}>
            <span>Программный код страницы защищён лицензией:</span>
            <StyledLink
              href="https://opensource.org/licenses/mit-license.php"
              target="_blank"
              rel="noopener noreferrer"
            >
              <span>MIT</span>
            </StyledLink>
          </Text>
        </Copyright>
        <Flex flex={["100%", "40%"]} flexDirection="column" p={2} my={[0, 2]}>
          <Text py={1} width={1}>
            <strong>Юридические данные:</strong>
          </Text>
          <Text py={1} width={1}>
            <strong>ИП</strong> Хмельникер Анастасия Андреевна
          </Text>
          <Text py={1} width={1}>
            <strong>ИНН</strong> 772391045036
          </Text>
          <Text py={1} width={1}>
            <strong>ГРНИП</strong> 319774600190685
          </Text>
          <Text>
            <Link aria-label="Company data" to={`/company`}>
              Полные данные компании
            </Link>
          </Text>
        </Flex>
      </Flex>
    </footer>
  )
}

export default Footer

import { Link } from "gatsby"
import React, { useState } from "react"
import Menu from "react-burger-menu/lib/menus/slide"
import styled from "styled-components"
import { menuStyles, theme } from "../utils/styles"
import { rhythm } from "../utils/typography"

const StyledLink = styled(Link)`
  boxshadow: none;
  textdecoration: none;
  color: inherit;
  backgroundimage: none;
  text-transform: uppercase;
  letter-spacing: 1px;
`

export default () => {
  const [menuOpenState, setMenuOpenState] = useState(false)

  const toggleMenu = () => setMenuOpenState(!menuOpenState)
  const stateChangeHandler = newState => setMenuOpenState(newState.isOpen)

  return (
    <Menu
      right
      width={`100%`}
      styles={menuStyles}
      isOpen={menuOpenState}
      onStateChange={state => stateChangeHandler(state)}
      burgerButtonClassName={"no-outline"}
    >
      <StyledLink
        style={{
          paddingBlockEnd: rhythm(1.5),
          borderBlockEnd: `${rhythm(0.05)} solid ${theme.colors.primary}`,
          outline: `none`
        }}
        onClick={toggleMenu}
        to={`/offers`}
      >
        Спецпредложения
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/order`}>
        На заказ
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/cakes`}>
        Кондитерка
      </StyledLink>
      <StyledLink
        style={{
          paddingBlockEnd: rhythm(1.5),
          borderBlockEnd: `${rhythm(0.05)} solid ${theme.colors.primary}`,
        }}
        onClick={toggleMenu}
        to={`/bread`}
      >
        Хлеб и Булочки
      </StyledLink>

      <StyledLink
        style={{ paddingBlockStart: rhythm(1) }}
        onClick={toggleMenu}
        to={`/news`}
      >
        Все новости
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/about`}>
        О нас
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/contact`}>
        Наши координаты
      </StyledLink>
    </Menu>
  )
}

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
  outline: none;
  font-size: 18px;
`

export default ({ location }) => {
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
      pageWrapId={"page-wrap"}
      outerContainerId={"outer-container"}
    >
      {location.pathname !== "/" && (
        <StyledLink onClick={toggleMenu} to={`/`}>
          В начало
        </StyledLink>
      )}
      {location.pathname !== "/offers" && (
        <StyledLink onClick={toggleMenu} to={`/offers`}>
          Спецпредложения
        </StyledLink>
      )}
      <hr style={{ background: theme.colors.primary, padding: 0 }} />
      {location.pathname !== "/order" && (
        <StyledLink onClick={toggleMenu} to={`/order`}>
          На заказ
        </StyledLink>
      )}
      {location.pathname !== "/cakes" && (
        <StyledLink onClick={toggleMenu} to={`/cakes`}>
          Кондитерка
        </StyledLink>
      )}
      {location.pathname !== "/bread" && (
        <StyledLink
          onClick={toggleMenu}
          to={`/bread`}
        >
          Хлеб и Булочки
        </StyledLink>
      )}
      <hr style={{ background: theme.colors.primary, padding: 0 }} />
      {location.pathname !== "/about" && (
        <StyledLink
          style={{ paddingBlockStart: rhythm(1) }}
          onClick={toggleMenu}
          to={`/about`}
        >
          Новости
        </StyledLink>
      )}
      {location.pathname !== "/contact" && (
        <StyledLink onClick={toggleMenu} to={`/contact`}>
          Наши координаты
        </StyledLink>
      )}
    </Menu>
  )
}

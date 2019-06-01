import { Link } from "gatsby"
import React, { useState } from "react"
import { slide as Menu } from "react-burger-menu"
import styled from "styled-components"
import { menuStyles } from "../utils/styles"

const StyledLink = styled(Link)`
  boxshadow: none;
  textdecoration: none;
  color: inherit;
  backgroundimage: none;
  text-transform: uppercase;
`

export default () => {
  const [menuOpenState, setMenuOpenState] = useState(true)

  const toggleMenu = () => setMenuOpenState(!menuOpenState)
  const stateChangeHandler = newState => setMenuOpenState(newState.isOpen)

  return (
    <Menu
      width={`100%`}
      styles={menuStyles}
      isOpen={menuOpenState}
      onStateChange={state => stateChangeHandler(state)}
      burgerButtonClassName={"no-outline"}
    >
      <StyledLink onClick={toggleMenu} to={`/order`}>
        На заказ
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/cakes`}>
        Кондитерка
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/bread`}>
        Хлеб и Булочки
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/news`}>
        Все новости
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/about`}>
        О нас
      </StyledLink>
      <StyledLink onClick={toggleMenu} to={`/contact`}>
        Контакт
      </StyledLink>
    </Menu>
  )
}

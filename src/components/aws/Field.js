import React from "react"
import { Flex } from "rebass"
import styled from "styled-components"
import { theme } from "../../utils/styles"

const Field = styled(Flex).attrs({
  width: [1],
  mb: [4],
  px: [1],
})`
  height: 56px;
  border-radius: 4px;
  position: relative;
  background-color: ${theme.colors.primaryBR3};
  transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out;

  &:hover {
    background-color: ${theme.colors.primaryBR4};
    box-shadow: 0 2px 8px ${theme.colors.primaryBR2};
  }

  &.active {
    background-color: #ffffff;
    box-shadow: 0 2px 8px ${theme.colors.primary};
  }

  &.active input {
    padding: 24px 16px 8px 16px;
  }

  &.active input + label {
    top: 4px;
    opacity: 1;
    color: ${theme.colors.primary};
  }

  .locked {
    pointer-events: none;
  }

  input {
    width: 100%;
    height: 56px;
    position: relative;
    padding: 0px 16px;
    border: none;
    border-radius: 4px;
    font-family: "Roboto", sans-serif;
    font-size: 16px;
    font-weight: normal;
    line-height: normal;
    background-color: transparent;
    color: #282828;
    outline: none;
    box-shadow: 0px 4px 20px 0px transparent;
    transition: 0.3s background-color ease-in-out, 0.3s box-shadow ease-in-out,
      0.1s padding ease-in-out;
    -webkit-appearance: none;
  }

  input::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  input::-moz-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  input:-ms-input-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  input:-moz-placeholder {
    color: rgba(255, 255, 255, 0.8);
  }

  input + label {
    position: absolute;
    top: 24px;
    left: 16px;
    font-family: "Roboto", sans-serif;
    font-size: 12px;
    font-weight: bolder;
    line-height: 24px;
    color: #fff;
    opacity: 0;
    pointer-events: none;
    transition: 0.1s all ease-in-out;
  }

  input + label.error {
    color: ${theme.colors.red};
  }
`

export default ({ label, error, locked, active, children, id, value }) => {
  const fieldClassName = `${(locked ? active : active || value || error) &&
    "active"} ${locked && !active && "locked"}`

  return (
    <Field className={fieldClassName}>
      {children}
      <label htmlFor={id} className={error && "error"}>
        {error || label}
      </label>
    </Field>
  )
}

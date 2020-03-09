/*
Define the button styles with `type` prop:
- primary / by default
- secondary
- tertiary
*/

import React from "react";
import styled, { css } from "styled-components";
import { color, radius } from "variables";

const hoverButton = css`
  &:hover {
    box-shadow: 0px 0px 0px ${color.dark};
    transform: translateY(4px);
  }
`;

const disabled = css`
  opacity: 0.5;
  pointer-events: none;
`;

const BaseButton = styled.button`
  padding: 0;
  height: 56px;
  border: 2px solid ${color.dark};
  box-shadow: 0px 4px 0px ${color.dark};
  border-radius: ${radius.normal};
  font-size: 18px;
  padding-right: 24px;
  padding-left: 24px;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.15s ease-in;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
  ${props => props.disabled && disabled};
`;

const PrimaryStyles = styled(BaseButton)`
  background: ${color.primary};
  color: white;
  &:active {
    background-color: black;
  }
  ${hoverButton}
`;

const SecondaryStyles = styled(BaseButton)`
  background: ${color.grayHard};
  color: ${color.dark};
  &:active {
    background-color: #c0c0c0;
  }
  ${hoverButton}
`;

const TertiaryStyles = styled(BaseButton)`
  padding-left: 16px;
  padding-right: 16px;
  height: 40px;
  background: ${color.grayHard};
  font-size: 14px;
  border: 0;
  box-shadow: none;
  transition: all 0.15s ease-in;
  border: 1px solid transparent;
  &:hover {
    border-color: #59595950;
  }
  &:active {
    background-color: #c0c0c0;
  }
`;

function Button({
  type = "primary",
  className,
  children,
  as,
  onClick,
  disabled,
  href,
}) {
  switch (type) {
    case "primary":
      return (
        <PrimaryStyles
          className={className}
          as={as}
          onClick={onClick}
          disabled={disabled}
          href={href}
        >
          {children}
        </PrimaryStyles>
      );
    case "secondary":
      return (
        <SecondaryStyles
          className={className}
          as={as}
          onClick={onClick}
          disabled={disabled}
          href={href}
        >
          {children}
        </SecondaryStyles>
      );
    case "tertiary":
      return (
        <TertiaryStyles
          className={className}
          as={as}
          onClick={onClick}
          disabled={disabled}
          href={href}
        >
          {children}
        </TertiaryStyles>
      );
    default:
      return (
        <PrimaryStyles
          className={className}
          as={as}
          onClick={onClick}
          disabled={disabled}
          href={href}
        >
          {children}
        </PrimaryStyles>
      );
  }
}

export default Button;

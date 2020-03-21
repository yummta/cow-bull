import styled from "styled-components";
import Button from "ui/buttons/button";
import { weight } from "variables";

const Image = styled.img`
  margin-right: 12px;
  margin-left: 12px;
  vertical-align: top;
  animation: vibrate-1 1s linear infinite both;
  &:first-child {
    animation-delay: 0.5s;
  }
`;

const Body = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
`;

const StyledButton = styled(Button)`
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 14px;
  margin-left: 8px;
  display: inline-block;
`;

const Code = styled.span`
  font-weight: ${weight.bold};
`;

const Center = styled.div``;
const TextCenter = styled.p`
  text-align: center;
`;

export { Image, Body, StyledButton, Code, Center, TextCenter };

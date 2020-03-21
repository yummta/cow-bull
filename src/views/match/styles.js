import styled from "styled-components";
import { color, weight, radius } from "variables";
import { FaArrowRight } from "react-icons/fa";
import Button from "ui/buttons/button";
import InputText from "ui/form/input-text";
import BigNumbers from "components/big-numbers";
import Move from "components/move/move";

const StyledInputText = styled(InputText)`
  flex: 1 1 0;
`;

const SendButton = styled(Button)`
  padding: 0;
  position: relative;
  top: -4px;
  height: 50px;
  width: 50px;
  margin-left: 8px;
`;
const Footer = styled.div`
  display: flex;
  align-items: flex-end;
  padding: 24px;
  grid-area: footer;
  transition: all 0.25s;
  background-color: ${props => (props.current ? "#dcfbeb" : color.grayHard)};
`;

const ArrowRightIcon = styled(FaArrowRight)`
  font-size: 14px;
`;

const Grid = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: grid;
  grid-template-rows: 106px 1fr 124px;
  grid-template-areas:
    "header"
    "body"
    "footer";
`;

const Header = styled.div`
  grid-area: header;
  position: relative;
`;

const Body = styled.div`
  grid-area: body;
  overflow: hidden;
`;

const Heading4 = styled.span`
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 4px;
  display: block;
  text-align: ${props => props.align && props.align};
`;

const HeaderContent = styled.div`
  padding: 24px;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  transition: all 0.25s;
  background-color: ${props => (!props.current ? "#dcfbeb" : color.grayLight)};
`;

const Moves = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 88px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 16px;
  scroll-behavior: smooth;
  & > * {
    margin-bottom: 8px;
  }
`;

const StyledBigNumbers = styled(BigNumbers)`
  padding-bottom: 16px;
  padding-top: 24px;
`;

const StyledMove = styled(Move)`
  flex-shrink: 0;
`;

const HighlightNumber = styled.div`
  background-color: ${color.dark};
  color: white;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 8px;
  border-radius: ${radius.small};
  font-weight: ${weight.bold};
  & > * {
    letter-spacing: 0.7em;
    margin-right: -0.7em;
  }
`;

export {
  Footer,
  ArrowRightIcon,
  SendButton,
  StyledInputText,
  Grid,
  Header,
  Body,
  HeaderContent,
  Heading4,
  Moves,
  StyledMove,
  StyledBigNumbers,
  HighlightNumber,
};

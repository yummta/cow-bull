import styled from "styled-components";
import { color } from "variables";
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
  background-color: ${color.grayHard};
  display: flex;
  align-items: flex-end;
  padding: 24px;
  grid-area: footer;
`;

const ArroRightIcon = styled(FaArrowRight)`
  font-size: 14px;
`;

const Grid = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: grid;
  grid-template-rows: 56px 1fr 124px;
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

const LiveMove = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Heading4 = styled.span`
  font-size: 12px;
  text-transform: uppercase;
`;

const HeaderContent = styled.div`
  position: absolute;
  height: 100%;
  top: 0;
  left: 16px;
  right: 16px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Moves = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 136px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 16px;
  scroll-behavior: smooth;
  & > * {
    margin-bottom: 8px;
  }
`;

const StyledBigNumbers = styled(BigNumbers)`
  margin-bottom: 24px;
  margin-top: 64px;
`;

const StyledMove = styled(Move)`
  flex-shrink: 0;
`;

export {
  Footer,
  ArroRightIcon,
  SendButton,
  StyledInputText,
  Grid,
  Header,
  Body,
  LiveMove,
  Heading4,
  HeaderContent,
  Moves,
  StyledMove,
  StyledBigNumbers,
};

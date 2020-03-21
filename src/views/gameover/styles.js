import styled from "styled-components";
import { color, weight } from "variables";
import BigNumbers from "components/big-numbers";
import Move from "components/move/move";

const Footer = styled.div`
  background-color: ${color.grayLight};
  box-shadow: 0px -7px 8px -2px rgba(0, 0, 0, 0.11);
  display: flex;
  justify-content: center;
  align-items: center;
  grid-area: footer;
  position: relative;
  z-index: 1;
  overflow-y: hidden;
`;

const Grid = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  display: grid;
  grid-template-rows: 56px 1fr 102px;
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

const Links = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
`;

const Moves = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: calc(100% - 206px);
  overflow-y: auto;
  box-sizing: border-box;
  padding-bottom: 16px;
  & > * {
    margin-bottom: 8px;
  }
`;

const StyledBigNumbers = styled(BigNumbers)`
  margin-bottom: 16px;
`;

const StyledMove = styled(Move)`
  flex-shrink: 0;
`;

const Heading3 = styled.div`
  font-weight: ${weight.bold};
  font-size: 24px;
  margin-bottom: 8px;
  margin-top: 56px;
`;

const Resume = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-end;
`;

export {
  Footer,
  Grid,
  Header,
  Body,
  Links,
  Moves,
  StyledMove,
  StyledBigNumbers,
  Heading3,
  Resume,
};

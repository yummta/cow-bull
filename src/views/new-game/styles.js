import styled from "styled-components";
import Link from "ui/link";
import { color, weight, radius } from "variables";

const Code = styled.input`
  background-color: ${color.grayHard};
  display: flex;
  padding: 8px 48px;
  text-align: center;
  font-size: 40px;
  font-weight: ${weight.medium};
  border-radius: ${radius.normal};
  letter-spacing: 4px;
  border: 0;
  width: 100%;
  box-sizing: border-box;
  font-family: monospace;
`;

const Header = styled.div`
  display: flex;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const Message = styled.p`
  max-width: 248px;
  text-align: center;
  margin-bottom: 48px;
`;

const Actions = styled.div`
  max-width: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Space = styled.div`
  height: 32px;
`;

export { Code, Header, Body, StyledLink, Message, Actions, Space };

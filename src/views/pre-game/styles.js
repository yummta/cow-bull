import styled from "styled-components";
import Link from "ui/link";
import { FaArrowRight } from "react-icons/fa";
import InputText from "ui/form/input-text";

const StyledLink = styled(Link)`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const Message = styled.p`
  margin-bottom: 48px;
`;

const Actions = styled.div`
  max-width: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const ArroRightIcon = styled(FaArrowRight)`
  font-size: 14px;
  margin-left: 8px;
`;

const StyledInputText = styled(InputText)`
  font-size: 20px;
`;

export { StyledLink, Message, Actions, ArroRightIcon, StyledInputText };

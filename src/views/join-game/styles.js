import styled from "styled-components";
import Link from "ui/link";

const StyledLink = styled(Link)`
  position: absolute;
  top: 16px;
  left: 16px;
`;

const Actions = styled.div`
  max-width: 200px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const Message = styled.p`
  margin-bottom: 48px;
`;

export { StyledLink, Actions, Message };

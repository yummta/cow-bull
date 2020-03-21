import styled from "styled-components";

const Image = styled.img`
  margin-right: 16px;
  margin-left: 16px;
  vertical-align: top;
  animation: vibrate-1 1s linear infinite both;
  &:first-child {
    animation-delay: 0.5s;
  }
`;

const Brand = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 64px;
`;

const Center = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const Actions = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  width: 100%;
  align-items: stretch;
  margin-right: auto;
  margin-left: auto;
  & > *:first-child {
    margin-bottom: 24px;
  }
`;

export { Image, Brand, Center, Actions };

import styled, { css } from "styled-components";
import { color, radius, weight } from "variables";

const defaultWrapper = css`
  height: 56px;
  width: 270px;
  background-color: ${color.grayLight};
  font-size: 20px;
`;

const smallWrapper = css`
  height: 40px;
  width: 188px;
  background-color: white;
  font-size: 16px;
`;

const defaultNumbers = css`
  flex: 0 0 140px;
  border-color: white;
  display: flex;
  justify-content: center;
`;

const smallNumbers = css`
  font-size: 16px;
  flex: 0 0 104px;
  letter-spacing: 0.7em;
  border-color: ${color.grayLight};
  display: flex;
  justify-content: center;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: stretch;
  font-family: monospace;
  border-radius: ${radius.small};
  ${props => (props.size === "default" ? defaultWrapper : smallWrapper)};
`;

const Numbers = styled.div`
  border-right: 1px solid transparent;
  display: flex;
  align-items: center;
  font-weight: ${weight.bold};
  ${props => (props.size === "default" ? defaultNumbers : smallNumbers)};
`;

const Results = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex: 1 1 100%;
`;

const ResultSlot = styled.div`
  display: flex;
  align-items: center;
`;

const Image = styled.img`
  width: ${props => (props.size === "default" ? "24px" : "16px")};
  margin-left: ${props => (props.size === "default" ? "0.2em" : "0.1em")};
`;

const Data = styled.span`
  letter-spacing: 0.7em;
  margin-right: -0.7em;
`;

export { Wrapper, Numbers, Results, ResultSlot, Image, Data };

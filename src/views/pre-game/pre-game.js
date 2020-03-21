import React, { useState, useEffect } from "react";
import BackButton from "ui/buttons/back-button";
import Button from "ui/buttons/button";
import ContainerApp from "components/container-app";
import { Center } from "ui/layout";
import validateNumber from "../../lib/validateNumber";
import * as S from "./styles";

function PreGame({ setParent }) {
  const [number, setNumber] = useState("");
  const [valid, setValid] = useState(false);

  const handleChangeNumber = event => {
    const value = event.currentTarget.value;
    if (validateNumber(value)) {
      setNumber(value);
    }
  };

  useEffect(() => {
    const splitNumber = number.split("");
    const cleanRepeat = [...new Set(splitNumber)];
    setValid(cleanRepeat.length === 4);
  }, [number]);

  const handleSubmit = event => {
    event.preventDefault();
    if (valid) {
      setParent(number);
    }
  };

  return (
    <ContainerApp>
      <Center>
        <S.StyledLink to="/new-game">
          <BackButton />
        </S.StyledLink>
        <Center onSubmit={handleSubmit} as="form">
          <S.StyledInputText
            label="Put a number of 4 digits"
            center
            placeholder="# # # #"
            value={number}
            onChange={handleChangeNumber}
          />
          <S.Message>[!] The numbers mustn't repeat</S.Message>
          <S.Actions>
            <Button type="primary" disabled={!valid}>
              Next <S.ArroRightIcon />
            </Button>
          </S.Actions>
        </Center>
      </Center>
    </ContainerApp>
  );
}

export default PreGame;

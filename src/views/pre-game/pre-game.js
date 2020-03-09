import React, { useState, useEffect } from "react";
import BackButton from "ui/buttons/back-button";
import Button from "ui/buttons/button";
import ContainerApp from "components/container-app";
import { Center } from "ui/layout";
import * as S from "./pre-game.styles";
import validateNumber from "../../lib/validateNumber";

function PreGame({ setParent }) {
  const [number, setNumber] = useState("");
  const [valid, setValid] = useState(true);

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

  const handleClick = () => {
    setParent(number);
  };

  return (
    <ContainerApp>
      <Center>
        <S.StyledLink to="/new-game">
          <BackButton />
        </S.StyledLink>
        <S.StyledInputText
          label="Put a number of 4 digits"
          center
          placeholder="# # # #"
          value={number}
          onChange={handleChangeNumber}
        />
        {/* <input type="text" onChange={handleChangeNumber} value={number} /> */}
        <S.Message>[!] The numbers mustn't repeat</S.Message>
        <S.Actions>
          <Button type="primary" onClick={handleClick} disabled={!valid}>
            Next <S.ArroRightIcon />
          </Button>
        </S.Actions>
      </Center>
    </ContainerApp>
  );
}

export default PreGame;

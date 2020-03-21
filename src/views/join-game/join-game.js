import React, { useState, useContext } from "react";
import SocketContext from "../../contexts/SocketContext";
import { navigate } from "@reach/router";
import BackButton from "ui/buttons/back-button";
import Button from "ui/buttons/button";
import ContainerApp from "components/container-app";
import InputText from "ui/form/input-text";
import { Center } from "ui/layout";
import * as S from "./styles";

function JoinGame() {
  const socket = useContext(SocketContext);
  const [roomId, setRoomId] = useState("");
  const [error, setError] = useState(false);

  const handleStart = () => {
    socket.emit("checkRoom", roomId, error => {
      console.log(error);
      if (error) {
        setError(error.error);
      } else {
        navigate(`/game/${roomId}`);
      }
    });
  };
  return (
    <ContainerApp>
      <S.StyledLink to="/">
        <BackButton />
      </S.StyledLink>
      <Center>
        <InputText
          label="Code"
          center
          placeholder="Put your code here"
          value={roomId}
          onChange={e => setRoomId(e.target.value)}
        />
        <S.Message>Put your code and start to play</S.Message>
        {error && <p>{error}</p>}
        <S.Actions>
          <Button type="primary" onClick={handleStart}>
            Join
          </Button>
        </S.Actions>
      </Center>
    </ContainerApp>
  );
}

export default JoinGame;

import React, { useEffect } from "react";
import ContainerApp from "components/container-app";
import cow from "assets/svg/big-cow.svg";
import bull from "assets/svg/big-bull.svg";
import * as S from "./lobby.styles";

function Lobby({ roomId, ready, setGameState }) {
  const [counter, setCounter] = React.useState(3);

  useEffect(() => {
    if (!ready) return;
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0) setGameState("playing");
  }, [counter, ready, setGameState]);

  const Counter = () => {
    return <S.TextCenter>{`The game will start in ${counter}`}</S.TextCenter>;
  };

  return (
    <ContainerApp>
      <S.Body>
        <S.Center>
          <S.Image src={cow} width="80" />
          <S.Image src={bull} width="80" />
          {ready ? (
            <Counter />
          ) : (
            <S.TextCenter>Waiting oponent...</S.TextCenter>
          )}
        </S.Center>
        <S.StyledButton type="secondary">
          Copy code room: <S.Code>{roomId}</S.Code>
        </S.StyledButton>
      </S.Body>
    </ContainerApp>
  );
}

export default Lobby;

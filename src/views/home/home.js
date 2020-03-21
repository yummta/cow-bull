import React from "react";
import Button from "ui/buttons/button";
import cow from "assets/svg/big-cow.svg";
import bull from "assets/svg/big-bull.svg";
import ContainerApp from "components/container-app";
import Link from "ui/link";
import * as S from "./styles";

function Home() {
  return (
    <ContainerApp>
      <S.Center>
        <S.Brand>
          <S.Image src={cow} width={108} />
          <S.Image src={bull} width={108} />
        </S.Brand>
        <S.Actions>
          <Link to="/new-game">
            <Button type={"primary"}>New game</Button>
          </Link>
          <Link to="/join-game">
            <Button type={"secondary"}>Join a game</Button>
          </Link>
        </S.Actions>
      </S.Center>
    </ContainerApp>
  );
}

export default Home;

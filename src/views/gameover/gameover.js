import React, { useState, useContext, useEffect } from "react";
import SocketContext from "../../contexts/SocketContext";
import ContainerApp from "components/container-app";
import Button from "ui/buttons/button";
import * as S from "./styles";

function GameOver({ guessList, moves, winner, oppData, number, media }) {
  const socket = useContext(SocketContext);
  const [showYours, setShowYours] = useState(true);

  const handleRematch = () => {
    socket.emit("rematch", {}, () => {});
  };

  const handleViewSwitch = () => {
    setShowYours(!showYours);
  };

  const MovesList = ({ list }) => {
    return (
      <>
        {list.map((item, index) => (
          <S.StyledMove
            key={index}
            number={item.guess}
            result={[item.result.cows, item.result.bulls]}
          />
        ))}
      </>
    );
  };

  const showMessage = () => {
    return winner ? `You resolved it on ${moves} moves` : "Your moves";
  };

  useEffect(() => {
    if (media) media.pause();
  }, [media]);

  return (
    <ContainerApp>
      <S.Grid>
        <S.Header>
          <S.Links>
            <Button type="tertiary" as="a" href="/">
              Home
            </Button>
            <Button type="tertiary" onClick={handleViewSwitch}>
              {showYours ? "Opponent Moves" : "My Moves"}
            </Button>
          </S.Links>
        </S.Header>
        <S.Body>
          <S.Resume>
            <S.Heading3>{winner ? "YOU WIN" : "YOU LOSE"}</S.Heading3>
            <S.StyledBigNumbers
              mode="dark"
              number={showYours ? oppData.number : number}
            />
            <p>{showYours ? showMessage() : "Opponent moves"}</p>
          </S.Resume>
          <S.Moves>
            <MovesList list={showYours ? guessList : oppData.guessList} />
          </S.Moves>
        </S.Body>
        <S.Footer>
          <Button type="primary" onClick={handleRematch}>
            Rematch
          </Button>
        </S.Footer>
      </S.Grid>
    </ContainerApp>
  );
}

export default GameOver;

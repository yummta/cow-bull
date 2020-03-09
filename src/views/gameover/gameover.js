import React, { useState, useContext } from "react";
import SocketContext from "../../contexts/SocketContext";
import ContainerApp from "components/container-app";
import Button from "ui/buttons/button";
import { Link } from "@reach/router";

import {
  Footer,
  Grid,
  Header,
  Body,
  Links,
  Moves,
  StyledMove,
  StyledBigNumbers,
  Heading3,
  Resume,
} from "./gameover.styles";

function GameOver({ guessList, moves, winner, oppData, number }) {
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
          <StyledMove
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

  return (
    <ContainerApp>
      <Grid>
        <Header>
          <Links>
            <Button type="tertiary" as="a" href="/">
              Home
            </Button>
            <Button type="tertiary" onClick={handleViewSwitch}>
              {showYours ? "Opponent Moves" : "My Moves"}
            </Button>
          </Links>
        </Header>
        <Body>
          <Resume>
            <Heading3>{winner ? "YOU WIN" : "YOU LOSE"}</Heading3>
            <StyledBigNumbers
              mode="dark"
              number={showYours ? oppData.number : number}
            />
            <p>{showYours ? showMessage() : "Opponent moves"}</p>
          </Resume>
          <Moves>
            <MovesList list={showYours ? guessList : oppData.guessList} />
          </Moves>
        </Body>
        <Footer>
          <Button type="primary" onClick={handleRematch}>
            Rematch
          </Button>
        </Footer>
      </Grid>
    </ContainerApp>
  );
}

export default GameOver;

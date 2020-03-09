import React, { useState, useEffect, useContext } from "react";
import SocketContext from "../../contexts/SocketContext";
import ContainerApp from "components/container-app";
import ProgressBar from "components/progress-bar";
import Move from "components/move/move";
import {
  Footer,
  ArroRightIcon,
  SendButton,
  StyledInputText,
  Grid,
  Header,
  Body,
  LiveMove,
  HeaderContent,
  Heading4,
  Moves,
  StyledMove,
  StyledBigNumbers,
} from "./match.styles";

function Match({
  progress = 30,
  roomId,
  current,
  setCurrent,
  setMoves,
  guessList,
  setGuessList,
  setWinner,
}) {
  const socket = useContext(SocketContext);
  const [guess, setGuess] = useState("");
  const [opponentMove, setOpponentMove] = useState({
    cows: "-",
    bulls: "-",
    guess: "----",
  });

  useEffect(() => {
    if (!socket) return;
    socket.on("guessResult", ({ cows, bulls, guess, id }) => {
      if (socket.id === id) {
        setGuessList(currentList => [
          ...currentList,
          { guess: guess, result: { cows, bulls } },
        ]);
        if (bulls === 4) {
          setWinner(true);
        }
      } else {
        setOpponentMove({ cows, bulls, guess });
      }
    });
  }, [socket]);

  const handleSubmit = () => {
    socket.emit("sendGuess", { roomId, id: socket.id, guess }, () => {
      setCurrent(false);
      setMoves(current => current + 1);
      setGuess("");
    });
  };
  return (
    <ContainerApp>
      <Grid>
        <Header>
          <ProgressBar progress={progress} />
          <HeaderContent>
            {current ? (
              <Heading4>Your move</Heading4>
            ) : (
              <LiveMove>
                <Heading4>Opponent move</Heading4>
                <Move
                  number={opponentMove.guess}
                  result={[opponentMove.cows, opponentMove.bulls]}
                  size="small"
                ></Move>
              </LiveMove>
            )}
          </HeaderContent>
        </Header>
        <Body>
          <StyledBigNumbers />
          <Moves>
            {guessList.map((guessItem, index) => (
              <StyledMove
                key={index}
                number={guessItem.guess}
                result={[guessItem.result.cows, guessItem.result.bulls]}
              />
            ))}
          </Moves>
        </Body>
        <Footer>
          <StyledInputText
            label="Move #"
            placeholder="#"
            value={guess}
            onChange={e => setGuess(e.target.value)}
          />
          <SendButton type="primary" onClick={handleSubmit} disabled={!current}>
            <ArroRightIcon />
          </SendButton>
        </Footer>
      </Grid>
    </ContainerApp>
  );
}

export default Match;

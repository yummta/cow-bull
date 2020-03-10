import React, { useState, useEffect, useContext, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import ContainerApp from "components/container-app";
import ProgressBar from "components/progress-bar";
import Move from "components/move/move";
import validateNumber from "../../lib/validateNumber";
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
  const [valid, setValid] = useState(false);
  const listMoves = useRef(null);

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

  useEffect(() => {
    listMoves.current.scrollTop = listMoves.current.scrollHeight;
  }, [guessList]);

  const handleChangeGuess = event => {
    const value = event.currentTarget.value;
    if (validateNumber(value)) {
      setGuess(value);
    }
  };

  useEffect(() => {
    const splitNumber = guess.split("");
    const cleanRepeat = [...new Set(splitNumber)];
    setValid(cleanRepeat.length === 4);
  }, [guess]);

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
          <Moves ref={listMoves}>
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
            onChange={handleChangeGuess}
          />
          <SendButton
            type="primary"
            onClick={handleSubmit}
            disabled={!current || !valid}
          >
            <ArroRightIcon />
          </SendButton>
        </Footer>
      </Grid>
    </ContainerApp>
  );
}

export default Match;

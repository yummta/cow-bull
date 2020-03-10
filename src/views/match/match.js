import React, { useState, useEffect, useContext, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import ContainerApp from "components/container-app";
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
  HeaderContent,
  Heading4,
  Moves,
  StyledMove,
  StyledBigNumbers,
  HighlightNumber,
} from "./match.styles";

function Match({
  roomId,
  current = false,
  setCurrent,
  setMoves,
  guessList = [],
  setGuessList,
  setWinner,
  number,
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

  const handleSubmit = event => {
    event.preventDefault();
    if (valid) {
      socket.emit("sendGuess", { roomId, id: socket.id, guess }, () => {
        setCurrent(false);
        setMoves(current => current + 1);
        setGuess("");
      });
    }
  };

  return (
    <ContainerApp>
      <Grid>
        <Header>
          <HeaderContent current={current}>
            <div>
              <Heading4>Secret number</Heading4>
              <HighlightNumber>
                <span>{number}</span>
              </HighlightNumber>
            </div>
            <div>
              <Heading4 align="right">Opponent last move</Heading4>
              <Move
                number={opponentMove.guess}
                result={[opponentMove.cows, opponentMove.bulls]}
                size="small"
              ></Move>
            </div>
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
        <Footer current={current} as="form" onSubmit={handleSubmit}>
          <StyledInputText
            label="Move #"
            placeholder="#"
            value={guess}
            onChange={handleChangeGuess}
          />
          <SendButton type="primary" disabled={!current || !valid}>
            <ArroRightIcon />
          </SendButton>
        </Footer>
      </Grid>
    </ContainerApp>
  );
}

export default Match;

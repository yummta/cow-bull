import React, { useState, useEffect, useContext, useRef } from "react";
import SocketContext from "../../contexts/SocketContext";
import ContainerApp from "components/container-app";
import Move from "components/move/move";
import validateNumber from "../../lib/validateNumber";
import * as S from "./styles";

function Match({
  roomId,
  current = false,
  setCurrent,
  setMoves,
  guessList = [],
  setGuessList,
  setWinner,
  number,
  media,
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

  const infiniteLoop = soundTrack => {
    if (soundTrack) {
      soundTrack.currentTime = 0;
      soundTrack.play();
    }
  };

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
  }, [setGuessList, setWinner, socket]);

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

  useEffect(() => {
    if (media) {
      media.play();
      media.addEventListener("ended", () => infiniteLoop(media));
    }
  }, [media]);

  return (
    <ContainerApp>
      <S.Grid>
        <S.Header>
          <S.HeaderContent current={current}>
            <div>
              <S.Heading4>Secret number</S.Heading4>
              <S.HighlightNumber>
                <span>{number}</span>
              </S.HighlightNumber>
            </div>
            <div>
              <S.Heading4 align="right">Opponent last move</S.Heading4>
              <Move
                number={opponentMove.guess}
                result={[opponentMove.cows, opponentMove.bulls]}
                size="small"
              ></Move>
            </div>
          </S.HeaderContent>
        </S.Header>
        <S.Body>
          <S.StyledBigNumbers />
          <S.Moves ref={listMoves}>
            {guessList.map((guessItem, index) => (
              <S.StyledMove
                key={index}
                number={guessItem.guess}
                result={[guessItem.result.cows, guessItem.result.bulls]}
              />
            ))}
          </S.Moves>
        </S.Body>
        <S.Footer current={current} as="form" onSubmit={handleSubmit}>
          <S.StyledInputText
            label="Move #"
            placeholder="#"
            value={guess}
            onChange={handleChangeGuess}
          />
          <S.SendButton type="primary" disabled={!current || !valid}>
            <S.ArrowRightIcon />
          </S.SendButton>
        </S.Footer>
      </S.Grid>
    </ContainerApp>
  );
}

export default Match;

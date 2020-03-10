import React, { useState, useEffect, useContext } from "react";
import SocketContext from "./contexts/SocketContext";
import { useParams } from "@reach/router";
import Pregame from "./views/pre-game/pre-game";
import Lobby from "./views/lobby/lobby";
import Match from "./views/match/match";
import GameOver from "./views/gameover/gameover";
import soundtrack from "assets/chamber-of-secrets-short.wav";

function Game() {
  const socket = useContext(SocketContext);
  const { roomId } = useParams();

  const [gameState, setGameState] = useState("pregame");
  const [number, setNumber] = useState("");
  const [oppNumber, setOppNumber] = useState("????");
  const [guessList, setGuessList] = useState([]);
  const [oppGuessList, SetOppGuessList] = useState([]);
  const [current, setCurrent] = useState(false);
  const [moves, setMoves] = useState(0);
  const [winner, setWinner] = useState(false);
  const [media] = useState(new Audio(soundtrack));

  useEffect(() => {
    if (!number || !roomId) return;
    socket.emit("join", { number, roomId }, error => console.log(error));
    setGameState("lobby");
  }, [number, socket, roomId]);

  useEffect(() => {
    if (!socket) return;
    socket.on("ready", ({ current }) => {
      if (current === socket.id) {
        setCurrent(true);
      }
      setGameState("playing");
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("gameover", () => {
      setGameState("gameover");
    });
  }, [socket]);

  useEffect(() => {
    if (gameState !== "gameover") return;
    socket.emit("sendData", { number, guessList, roomId }, () => {});
  }, [gameState]);

  useEffect(() => {
    if (!socket) return;
    socket.on("opponentData", ({ number, guessList }) => {
      setOppNumber(number);
      SetOppGuessList(guessList);
    });
  }, [socket]);

  useEffect(() => {
    if (!socket) return;
    socket.on("changeTurn", () => setCurrent(!current));
  }, []);

  return (
    <section>
      {gameState === "pregame" && <Pregame setParent={setNumber} />}
      {gameState === "lobby" && <Lobby roomId={roomId} />}
      {gameState === "playing" && (
        <Match
          roomId={roomId}
          current={current}
          setCurrent={setCurrent}
          setMoves={setMoves}
          guessList={guessList}
          setGuessList={setGuessList}
          setWinner={setWinner}
          number={number}
          media={media}
        />
      )}
      {gameState === "gameover" && (
        <GameOver
          moves={moves}
          guessList={guessList}
          winner={winner}
          oppData={{ number: oppNumber, guessList: oppGuessList }}
          number={number}
          media={media}
        />
      )}
    </section>
  );
}

export default Game;

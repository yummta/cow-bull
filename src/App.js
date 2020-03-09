import React, { useState, useEffect } from "react";
import { Router } from "@reach/router";
// views
import Library from "views/library";
import Home from "views/home/home";
import NewGame from "views/new-game/new-game";
import JoinGame from "views/join-game/join-game";
import Game from "./Game";
import SocketContext from "./contexts/SocketContext";
import io from "socket.io-client";

function App() {
  const ENDPOINT = "https://cow-bull-server.herokuapp.com/";
  const [socket, setSocket] = useState("");

  useEffect(() => {
    setSocket(() => io(ENDPOINT));
  }, []);

  useEffect(() => {
    if (!socket) return;

    return () => {
      socket.emit("disconnect");
      socket.off();
    };
  }, [ENDPOINT, socket]);

  return (
    <SocketContext.Provider value={socket}>
      <Router>
        <Library path="library" />
        <Home path="/" />
        <NewGame path="/new-game" />
        <JoinGame path="/join-game" />
        <Game path="/game/:roomId" />
      </Router>
    </SocketContext.Provider>
  );
}

export default App;

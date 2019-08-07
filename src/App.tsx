import React from "react";
import { KeeperFeatures } from "./components/KeeperFeatures/KeeperFeatures";
import "./App.css";
import { Jumbotron } from "react-bootstrap";

function App() {
  return (
    <>
      <Jumbotron>
        <h1>Keeper static page</h1>
      </Jumbotron>

      <KeeperFeatures />
    </>
  );
}

export default App;

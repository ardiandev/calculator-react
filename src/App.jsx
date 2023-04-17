import { useState } from "react";
import Calculator01 from "./calculator01/Calculator01";
import "./App.css";

function App() {
  return (
    <div className="app">
      <h1>Calculator Project</h1>
      <Calculator01 />
      <footer>
        <p>
          Designed and Coded by{" "}
          <a href="https://github.com/ardiandev">Ardian Pradana</a>
        </p>
        <p>
          Source Code{" "}
          <a href="https://github.com/ardiandev/calculator-react">Github </a>
        </p>
      </footer>
    </div>
  );
}

export default App;

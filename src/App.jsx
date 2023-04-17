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
          Designed and Coded by <a href="#">Ardian Pradana</a>
        </p>
        <p>
          Source Code <a href="#">Github </a>{" "}
        </p>
      </footer>
    </div>
  );
}

export default App;

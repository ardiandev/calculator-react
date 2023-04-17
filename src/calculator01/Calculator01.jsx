import { useState, useEffect } from "react";
import "./calculator01.css";

const buttons = [
  { id: "clear", value: "AC" },

  { id: "divide", value: "/" },
  { id: "multiply", value: "x" },
  { id: "seven", value: 7 },
  { id: "eight", value: 8 },
  { id: "nine", value: 9 },
  { id: "subtract", value: "-" },
  { id: "four", value: 4 },
  { id: "five", value: 5 },
  { id: "six", value: 6 },
  { id: "add", value: "+" },
  { id: "one", value: 1 },
  { id: "two", value: 2 },
  { id: "three", value: 3 },
  { id: "equals", value: "=" },
  { id: "zero", value: 0 },
  { id: "decimal", value: "." }
];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const operators = ["/", "+", "x", "-"];

const Button = ({ id, value, handleInput }) => {
  return (
    <button id={id} onClick={() => handleInput(value)}>
      {value}
    </button>
  );
};

const Keyboard = ({ handleInput }) => {
  return buttons.map(({ id, value }) => (
    <Button key={id} id={id} handleInput={handleInput} value={value} />
  ));
};

const Display = ({ input, output }) => {
  return (
    <div id="-container-display" className="display">
      <p id="output" className="output">
        {output}
      </p>
      <p id="display" className="input">
        {input}
      </p>
    </div>
  );
};
const Calculator01 = () => {
  const [input, setInput] = useState("0");
  const [output, setOutput] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    setOutput(data);
  }, [data]);

  const handleOutput = () => {
    setOutput(data);
  };

  // HANDLE CLEAR AC BTN
  const handleClear = () => {
    setInput("0");
    setData("");
  };

  // HANDLE NUMBER
  const handleNumber = value => {
    let cInput = input.slice();
    if (!data.length && value != "0") {
      setData(`${value}`);
      setInput(`${value}`);
    }
    if (data.length) {
      setData(`${data}${value}`);
    }
    if (data.length && !/[+|/|x]/.test(input)) {
      setInput(`${input}${value}`);
    }
    if ((data.length && /[-/x+]/gi.test(input)) || input.includes(operators)) {
      setInput(`${value}`);
    }

    if (data.includes("=")) {
      setData(`${value}`);
      setInput(`${value}`);
    }
  };

  // HANDLE OPERATOR
  const handleOperator = value => {
    if (data.length && !operators.includes(data[data.length - 1])) {
      setData(`${data}${value}`);
      setInput(`${value}`);
    } else if (data.length && operators.includes(data[data.length - 1])) {
      setData(() => {
        let a = data.slice();
        let b = a.slice(0, a.length - 1);
        return b + value;
      });
      setInput(`${value}`);
    }

    if (
      value === "-" &&
      operators.includes(data[data.length - 1]) &&
      !operators.includes(data[data.length - 2])
    ) {
      setData(`${data}${value}`);
    }

    if (/[+|/|x]/.test(data[data.length - 2]) && data[data.length - 1] == "-") {
      setData(`${data.slice(0, data.length - 2)}${value}`);
    }

    if (data.includes("=")) {
      let getCalc = data.split("=");
      setData(`${getCalc[1]}${value}`);
    }
  };

  // HANDLE DECIMAL
  const handleDecimal = () => {
    if (!data.length) {
      setData(`0.`);
      setInput(`0.`);
    } else if (data.length && !input.includes(".")) {
      setData(`${data}.`);
      setInput(`${input}.`);
    }
  };

  //HANDLE SUBMIT
  const handeSubmit = () => {
    let newNum = data.slice(0);
    let result = "";

    for (let x = 0; x < newNum.length; x++) {
      if (newNum.includes("x")) {
        result = newNum.replaceAll("x", "*");
      } else {
        result = newNum;
      }
    }

    if (
      /[x|+|/]$/.test(data[data.length - 1]) ||
      data[data.length - 1] == "-"
    ) {
      setData(`${data}`);
      setInput(`${input}`);
    }

    if (data.length && !data.includes("=")) {
      const calculated = `${eval(result)}`;
      setInput(calculated);
      setData(`${data} = ${calculated}`);
    }
  };

  //HANDLE INPUT
  const handleInput = value => {
    const number = numbers.find(num => num === value);
    const operator = operators.find(op => op === value);

    switch (value) {
      case "AC":
        handleClear();
        break;
      case number:
        handleNumber(value);
        break;
      case operator:
        handleOperator(value);
        break;
      case "=":
        handeSubmit();
        break;
      case ".":
        handleDecimal();
        break;
    }
  };

  return (
    <div className="calculator">
      <Display input={input} output={output} />
      <div className="keyboard-container">
        <Keyboard handleInput={handleInput} />
      </div>
    </div>
  );
};

export default Calculator01;

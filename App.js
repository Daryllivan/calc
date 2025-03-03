import './App.css';
import React, { useState } from "react";
import { evaluate } from "mathjs";

function App() {
  const [result, setResult] = useState(""); 
  const [isResultFinal, setIsResultFinal] = useState(false); // Tracks if result is final

  const handleClick = (e) => {
    const input = e.target.name;
    const lastChar = result.slice(-1);

    if (result === "Error") {
      setResult(input);
      setIsResultFinal(false);
      return;
    }

    // If the result is final and user clicks a number, reset the display
    if (isResultFinal && !isNaN(input)) {
      setResult(input);
      setIsResultFinal(false);
      return;
    }

    // Prevent starting with an operator
    if (result === "" && ["+", "*", "/"].includes(input)) {
      return;
    }

    // If last character is an operator and new input is an operator, replace it
    if (["+", "-", "*", "/"].includes(lastChar) && ["+", "-", "*", "/"].includes(input)) {
      setResult(result.slice(0, -1) + input);
      return;
    }

    // Append valid input
    setResult(result + input);
  };

  // Clear input
  const clear = () => {
    setResult("");
    setIsResultFinal(false);
  };

  // Delete last character
  const backSpace = () => {
    setResult(result.slice(0, -1));
  };

  // Calculate the result
  const calculate = () => {
    try {
      setResult(evaluate(result).toString());
      setIsResultFinal(true); // Mark result as final
    } catch (err) {
      setResult("Error");
      setIsResultFinal(true);
    }
  };

  return (
    <>
      <h1>CALCULATOR</h1>
      <div className="calculator-grid">
        <div className="output">
          <div className="input-field">{result}</div>
        </div>
        <button className="span-two" onClick={clear}>AC</button>
        <button onClick={backSpace}>Del</button>
        <button name="/" onClick={handleClick}>÷</button>
        <button name="7" onClick={handleClick}>7</button>
        <button name="8" onClick={handleClick}>8</button>
        <button name="9" onClick={handleClick}>9</button>
        <button name="*" onClick={handleClick}>*</button>
        <button name="4" onClick={handleClick}>4</button>
        <button name="5" onClick={handleClick}>5</button>
        <button name="6" onClick={handleClick}>6</button>
        <button name="+" onClick={handleClick}>+</button>
        <button name="1" onClick={handleClick}>1</button>
        <button name="2" onClick={handleClick}>2</button>
        <button name="3" onClick={handleClick}>3</button>
        <button name="-" onClick={handleClick}>-</button>
        <button name="." onClick={handleClick}>.</button>
        <button name="0" onClick={handleClick}>0</button>
        <button className="span-two" onClick={calculate}>=</button>
      </div>
    </>
  );
}

export default App;

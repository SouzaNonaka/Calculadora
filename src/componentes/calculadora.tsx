import { useState } from "react";
import { calculate, Operator } from "../logica/calculadoralogica";
import { Display } from "./Display";
import { Button } from "./Button";
import "../styles/calculator.css";

export function Calculator() {
  const [current, setCurrent] = useState("0");
  const [previous, setPrevious] = useState<string | null>(null);
  const [operator, setOperator] = useState<Operator | null>(null);

  function handleNumber(num: string) {
    setCurrent((prev) => (prev === "0" ? num : prev + num));
  }

  function handleOperator(op: Operator) {
    if (previous && operator) handleCalculate();

    setOperator(op);
    setPrevious(current);
    setCurrent("0");
  }

  function handleCalculate() {
    if (!previous || !operator) return;

    const result = calculate(previous, current, operator);
    setCurrent(result);
    setPrevious(null);
    setOperator(null);
  }

  function handleClear() {
    setCurrent("0");
    setPrevious(null);
    setOperator(null);
  }

  return (
    <div className="calculator">
      <Display value={current} />

      <div className="grid">
        <Button label="C" onClick={handleClear} />
        <Button label="÷" onClick={() => handleOperator("÷")} />

        <Button label="7" onClick={() => handleNumber("7")} />
        <Button label="8" onClick={() => handleNumber("8")} />
        <Button label="9" onClick={() => handleNumber("9")} />
        <Button label="×" onClick={() => handleOperator("×")} />

        <Button label="4" onClick={() => handleNumber("4")} />
        <Button label="5" onClick={() => handleNumber("5")} />
        <Button label="6" onClick={() => handleNumber("6")} />
        <Button label="-" onClick={() => handleOperator("-")} />

        <Button label="1" onClick={() => handleNumber("1")} />
        <Button label="2" onClick={() => handleNumber("2")} />
        <Button label="3" onClick={() => handleNumber("3")} />
        <Button label="+" onClick={() => handleOperator("+")} />

        <Button label="0" onClick={() => handleNumber("0")} />
        <Button label="=" onClick={handleCalculate} />
      </div>
    </div>
  );
}

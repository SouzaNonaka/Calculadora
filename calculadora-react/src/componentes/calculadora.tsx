import { useEffect, useState } from "react";
import { Display } from "./display";
import { Button } from "./button";
import "../styles/styles.css";

export function Calculator() {
  const [expression, setExpression] = useState("0");
  const [justCalculated, setJustCalculated] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">(() => {
    return (localStorage.getItem("theme") as "light" | "dark") || "light";
  });

  function isOperator(char: string) {
    return ["+", "-", "×", "÷"].includes(char);
  }

  function handleNumber(num: string) {
    if (justCalculated) {
      setExpression(num);
      setJustCalculated(false);
      return;
    }
    setExpression((prev) => (prev === "0" ? num : prev + num));
  }

  function handleOperator(op: string) {
    setJustCalculated(false);
    setExpression((prev) => {
      const lastChar = prev.slice(-1);
      if (isOperator(lastChar)) {
        return prev.slice(0, -1) + op;
      }
      return prev + op;
    });
  }

  function handleBackspace() {
    setExpression((prev) => {
      if (prev.length <= 1) return "0";
      return prev.slice(0, -1);
    });
  }

  function handleCalculate() {
    try {
      const normalized = expression.replace(/×/g, "*").replace(/÷/g, "/");
      const result = Function(`"use strict"; return (${normalized})`)();
      setExpression(String(result));
      setJustCalculated(true);
    } catch {
      setExpression("Erro");
    }
  }

  function handleClear() {
    setExpression("0");
    setJustCalculated(false);
  }

  function toggleTheme() {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  }

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const key = e.key;
      if (/^[0-9]$/.test(key)) handleNumber(key);
      if (key === "Backspace") {
        e.preventDefault();
        handleBackspace();
      }
      if (key === "+") handleOperator("+");
      if (key === "-") handleOperator("-");
      if (key === "*" || key === "x" || key === "X") handleOperator("×");
      if (key === "/") handleOperator("÷");
      if (key === "Enter" || key === "=") {
        e.preventDefault();
        handleCalculate();
      }
      if (key === "Escape") handleClear();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [expression]);

  return (
    <div className="calculator">
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "🌙" : "☀️"}
      </button>

      <Display value={expression} />

      <div className="grid">
        <Button
          label="÷"
          className="operator"
          onClick={() => handleOperator("÷")}
        />
        <Button label="7" onClick={() => handleNumber("7")} />
        <Button label="8" onClick={() => handleNumber("8")} />
        <Button label="9" onClick={() => handleNumber("9")} />

        <Button
          label="×"
          className="operator"
          onClick={() => handleOperator("×")}
        />
        <Button label="4" onClick={() => handleNumber("4")} />
        <Button label="5" onClick={() => handleNumber("5")} />
        <Button label="6" onClick={() => handleNumber("6")} />

        <Button
          label="-"
          className="operator"
          onClick={() => handleOperator("-")}
        />
        <Button label="1" onClick={() => handleNumber("1")} />
        <Button label="2" onClick={() => handleNumber("2")} />
        <Button label="3" onClick={() => handleNumber("3")} />

        <Button
          label="+"
          className="operator"
          onClick={() => handleOperator("+")}
        />
        <Button label="C" className="clear" onClick={handleClear} />
        <Button label="0" onClick={() => handleNumber("0")} />
        <Button label="⌫" className="backspace" onClick={handleBackspace} />

        <div style={{ gridColumn: "span 2" }}></div>
        <Button label="=" className="equal" onClick={handleCalculate} />
      </div>
    </div>
  );
}

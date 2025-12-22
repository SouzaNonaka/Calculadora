export type Operator = "+" | "-" | "×" | "÷";

export function calculate(a: string, b: string, operator: Operator): string {
  const x = Number(a);
  const y = Number(b);

  switch (operator) {
    case "+":
      return (x + y).toString();
    case "-":
      return (x - y).toString();
    case "×":
      return (x * y).toString();
    case "÷":
      return y !== 0 ? (x / y).toString() : "0";
    default:
      return "0";
  }
}

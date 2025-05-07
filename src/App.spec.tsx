import { render, screen } from "@testing-library/react";
import { describe, expect, test } from "@jest/globals"; // Importação necessária para Jest no TypeScript
import App from "./App";

describe("renderiza texto esperado", () => {
  test("verifica se 'hello world' aparece", () => {
    render(<App />);
    expect(screen.getByText(/hello world/i)).toBeInTheDocument();
  });
});

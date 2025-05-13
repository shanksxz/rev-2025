import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Counter from "./counter"

test("counter working", () => {
  render(<Counter />)
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("0");
  fireEvent.click(screen.getByRole("button"));
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("1");
})

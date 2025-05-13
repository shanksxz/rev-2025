import "@testing-library/jest-dom"
import { fireEvent, render, screen } from "@testing-library/react"
import Home from "./home"

function sum(a: number, b: number) {
  return a + b;
}

async function getResponse() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ value: "gg" })
    }, 1000);
  })
}

describe("Combining tests", () => {
  test("2 + 3 should be equal to 5", () => {
    expect(sum(2, 3)).toBe(5)
  })
  test("response shoudn't be abcd", async () => {
    const res = await getResponse();
    expect(res).not.toBe("abcd");
  })
})

describe("Testing Home Component", () => {

  beforeEach(() => {
    render(<Home />);
  })

  test("render a heading", () => {
    const txt = screen.getByText(/Home/i)
    expect(txt).toBeInTheDocument();
  })

  test("render a heading inside h1", () => {
    const txt = screen.getByRole("heading", { level: 1 })
    expect(txt).toBeInTheDocument();
  })
})


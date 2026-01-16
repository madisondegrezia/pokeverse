import { render, screen } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest"; // Import vi for mocking
import Header from "./Header";
import { CardContext } from "../contexts/CardContext";

describe("Header Component", () => {
  const renderWithContext = (contextValue) => {
    const defaultContextValue = {
      selectedCards: [],
      addCard: vi.fn(), 
      removeCard: vi.fn(),
    };

    return render(
      <CardContext.Provider value={{ ...defaultContextValue, ...contextValue }}>
        <Header />
      </CardContext.Provider>
    );
  };

  test("renders the Pokeverse title", () => {
    renderWithContext({ selectedCards: [] });
    const titleElement = screen.getByText(/Pokeverse/i);
    expect(titleElement).toBeInTheDocument();
  });

  test("does not render the Battle button when less than 2 cards are selected", () => {
    renderWithContext({ selectedCards: [] });
    const battleButton = screen.queryByText(/Battle/i);
    expect(battleButton).not.toBeInTheDocument();
  });

  test("renders the Battle button when 2 or more cards are selected", () => {
    renderWithContext({ selectedCards: [{ name: "Pikachu" }, { name: "Charizard" }] });
    const battleButton = screen.getByText(/Battle/i);
    expect(battleButton).toBeInTheDocument();
  });

  test("Battle button has correct styles", () => {
    renderWithContext({ selectedCards: [{ name: "Pikachu" }, { name: "Charizard" }] });
    const battleButton = screen.getByText(/Battle/i);
    expect(battleButton).toHaveStyle({
      backgroundColor: "rgb(202, 27, 27)", 
      color: "#FFFFFF", 
    });
  });
});

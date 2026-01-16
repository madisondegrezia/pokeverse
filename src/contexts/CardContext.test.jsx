import { useContext } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect } from "vitest";
import { CardContext, CardProvider } from "./CardContext";

// A helper component to test the context
const TestComponent = ({ uniqueCards = [] }) => {
  const { selectedCards, addCard, removeCard } = useContext(CardContext);

  return (
    <div>
      <div data-testid="selected-cards">{JSON.stringify(selectedCards)}</div>
      {uniqueCards.map((card) => (
        <button key={`add-${card.name}`} onClick={() => addCard(card)}>
          Add {card.name}
        </button>
      ))}
      {uniqueCards.map((card) => (
        <button key={`remove-${card.name}`} onClick={() => removeCard(card.name)}>
          Remove {card.name}
        </button>
      ))}
    </div>
  );
};

describe("CardContext", () => {
  test("initial state is an empty array", () => {
    render(
      <CardProvider>
        <TestComponent />
      </CardProvider>
    );

    const selectedCards = screen.getByTestId("selected-cards");
    expect(selectedCards.textContent).toBe("[]");
  });

  test("addCard adds a card to selectedCards", () => {
    render(
      <CardProvider>
        <TestComponent uniqueCards={[{ name: "Pikachu" }]} />
      </CardProvider>
    );

    const addButton = screen.getByText("Add Pikachu");
    const selectedCards = screen.getByTestId("selected-cards");

    // Click the add button
    fireEvent.click(addButton);

    // Check if Pikachu was added
    expect(selectedCards.textContent).toBe('[{"name":"Pikachu"}]');
  });

  test("addCard does not add duplicate cards", () => {
    render(
      <CardProvider>
        <TestComponent uniqueCards={[{ name: "Pikachu" }]} />
      </CardProvider>
    );

    const addButton = screen.getByText("Add Pikachu");
    const selectedCards = screen.getByTestId("selected-cards");

    // Add Pikachu twice
    fireEvent.click(addButton);
    fireEvent.click(addButton);

    // Check that Pikachu was only added once
    expect(selectedCards.textContent).toBe('[{"name":"Pikachu"}]');
  });

  test("addCard does not add more than 6 cards", () => {
    const uniqueCards = [
        { name: "Pikachu" },
        { name: "Charizard" },
        { name: "Bulbasaur" },
        { name: "Squirtle" },
        { name: "Jigglypuff" },
        { name: "Meowth" },
        { name: "Eevee" },
    ];

    render(
        <CardProvider>
        <TestComponent uniqueCards={uniqueCards} />
        </CardProvider>
    );

    const selectedCards = screen.getByTestId("selected-cards");

    // Add 7 unique cards
    uniqueCards.forEach((card, index) => {
        const addButton = screen.getByText(`Add ${card.name}`);
        fireEvent.click(addButton);

        // Check the number of cards in the array after each addition
        if (index < 6) {
        expect(JSON.parse(selectedCards.textContent).length).toBe(index + 1);
        }
    });

    // Check that only 6 cards were added
    expect(JSON.parse(selectedCards.textContent).length).toBe(6);
    });

  test("removeCard removes a card from selectedCards", () => {
    render(
      <CardProvider>
        <TestComponent uniqueCards={[{ name: "Pikachu" }]} />
      </CardProvider>
    );

    const addButton = screen.getByText("Add Pikachu");
    const removeButton = screen.getByText("Remove Pikachu");
    const selectedCards = screen.getByTestId("selected-cards");

    // Add Pikachu and then remove it
    addButton.click();
    removeButton.click();

    // Check that the selectedCards array is empty
    expect(selectedCards.textContent).toBe("[]");
  });

  test("removeCard does nothing if the card is not in selectedCards", () => {
    render(
      <CardProvider>
        <TestComponent uniqueCards={[{ name: "Pikachu" }]} />
      </CardProvider>
    );

    const removeButton = screen.getByText("Remove Pikachu");
    const selectedCards = screen.getByTestId("selected-cards");

    // Try to remove Pikachu when it's not in the array
    removeButton.click();

    // Check that the selectedCards array is still empty
    expect(selectedCards.textContent).toBe("[]");
  });
});
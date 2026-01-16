import { render, screen, fireEvent } from "@testing-library/react";
import { describe, test, expect, vi } from "vitest";
import SearchBar from "./SearchBar";

describe("SearchBar Component", () => {
  test("renders the search input with correct label", () => {
    render(<SearchBar searchTerm="" setSearchTerm={() => {}} />);
    const inputElement = screen.getByLabelText(/Search.../i); // Check for the label
    expect(inputElement).toBeInTheDocument();
  });

  test("calls setSearchTerm on input change", () => {
    const setSearchTermMock = vi.fn(); // Mock the setSearchTerm function
    render(<SearchBar searchTerm="" setSearchTerm={setSearchTermMock} />);
    const inputElement = screen.getByLabelText(/Search.../i);

    // Simulate typing in the input field
    fireEvent.change(inputElement, { target: { value: "Pikachu" } });

    // Check if the mock function was called with the correct value
    expect(setSearchTermMock).toHaveBeenCalledWith("Pikachu");
  });

  test("applies correct styles to the TextField", () => {
    render(<SearchBar searchTerm="" setSearchTerm={() => {}} />);
    // Material-UI applies the `sx` styles to the wrapper div of the TextField
    const textFieldWrapper = screen.getByRole("textbox").closest(".MuiFormControl-root");

    // Check if the wrapper has the correct width style
    expect(textFieldWrapper).toHaveStyle("width: 50%");
  });
});
import { createContext, useState } from "react";

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [selectedCards, setSelectedCards] = useState([]);

    const addCard = (card) => {
        if (selectedCards.length < 6 && !selectedCards.some(c => c.name === card.name)) {
            setSelectedCards([...selectedCards, card]);
        }
    };

    const removeCard = (cardName) => {
        setSelectedCards((prevCards) => prevCards.filter((card) => card.name !== cardName))
    }

    return (
        <CardContext.Provider value={{ selectedCards, addCard, removeCard }}>
            {children}
        </CardContext.Provider>
    );
};
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import jsonData from "../data/data.json";

export const useStore = create(
    persist(
        (set) => ({
            cards: jsonData, 
            
            addCard: (newCard) => 
                set((state) => ({ cards: [...state.cards, newCard] })), 

        }),
        {
            name: "invoice-storage",
        }
    )
);

import { create } from "zustand";
import { persist } from "zustand/middleware";
import jsonData from "../data/data.json";

export const useStore = create(
  persist(
    (set) => ({
      cards: jsonData,      

      addCard: (newCard) =>
        set((state) => ({
          cards: [...state.cards, newCard],
        })),

      deleteCard: (id) =>
        set((state) => ({
          cards: state.cards.filter((card) => card.id !== id),
        })),

      upCard: (id, update) =>
        set((state) => ({
          cards: state.cards.map((card) =>
            card.id === id ? { ...card, ...update } : card
          ),
        })),
    }),
    {
      name: "cardMalumotlar",
      getStorage: () => localStorage,
    }
  )
);

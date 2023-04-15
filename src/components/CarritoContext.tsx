import { createContext, useContext, useState } from 'react';

interface CarritoContextData {
  items: number[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
}

const CarritoContext = createContext<CarritoContextData>({
  items: [],
  addItem: () => {},
  removeItem: () => {},
});

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<number[]>([]);

  function addItem(id: number) {
    setItems((prevItems) => [...prevItems, id]);
  }

  function removeItem(id: number) {
    setItems((prevItems) => prevItems.filter((itemId) => itemId !== id));
  }

  const value: CarritoContextData = {
    items,
    addItem,
    removeItem,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

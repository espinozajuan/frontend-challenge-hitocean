import { createContext, useContext, useState } from 'react';
import { CarritoContextData, Pocion } from './types';

const CarritoContext = createContext<CarritoContextData>({
  items: [],
  gemas: 3,
  addItem: () => {},
  removeItem: () => {},
  resetCarrito: () => {},
});

export function useCarrito() {
  return useContext(CarritoContext);
}

export function CarritoProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<Pocion[]>([]);
  const [gemas, setGemas] = useState<number>(3);

  function addItem(id: number, precio: number, nombre: string, imagen: string) {
    setItems((prevItems) => [...prevItems, { id, precio, nombre, imagen }]);
    setGemas(gemas - precio);
  }

  function removeItem(id: number) {
    const itemToRemove = items.find((item) => item.id === id);
    if (itemToRemove) {
      setGemas(gemas + itemToRemove.precio);
      setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    }
  }

  function resetCarrito() {
    setItems([]);
    setGemas(3);
  }

  const value: CarritoContextData = {
    items,
    gemas,
    addItem,
    removeItem,
    resetCarrito,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

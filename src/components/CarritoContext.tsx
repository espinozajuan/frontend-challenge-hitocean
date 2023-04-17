import { createContext, useContext, useState } from 'react';

interface Pocion {
  id: number;
  precio: number;
  nombre: string;
  imagen: string;
}

interface CarritoContextData {
  items: Pocion[];
  gemas: number;
  addItem: (id: number, precio: number, nombre: string, imagen: string) => void;
  removeItem: (id: number) => void;
}

const CarritoContext = createContext<CarritoContextData>({
  items: [],
  gemas: 3,
  addItem: () => {},
  removeItem: () => {},
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

  const value: CarritoContextData = {
    items,
    gemas,
    addItem,
    removeItem,
  };

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  );
}

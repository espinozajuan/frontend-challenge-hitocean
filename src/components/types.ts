export interface CarritoComponentProps {
  toggleCarrito: () => void;
}

export interface Pocion {
  id: number;
  nombre: string;
  precio: number;
  categoria?: string;
  descripcion?: string;
  imagen: string;
}

export interface CarritoContextData {
  items: Pocion[];
  gemas: number;
  addItem: (id: number, precio: number, nombre: string, imagen: string) => void;
  removeItem: (id: number) => void;
  resetCarrito: () => void;
}

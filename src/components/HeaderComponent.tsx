import React from 'react';
import { useCarrito } from './CarritoContext';

interface HeaderComponentProps {
  toggleCarrito: () => void;
}

export const HeaderComponent: React.FC<HeaderComponentProps> = ({
  toggleCarrito,
}) => {
  const { items, gemas } = useCarrito(); // Obtén las gemas disponibles del contexto
  const cantidadItems = items.length;

  return (
    <div className='bg-stone-700 py-4 px-8 flex justify-between items-center sticky top-0 shadow-md z-10'>
      <h1 className='text-white text-2xl font-bold'>🧙‍♂️ Potion Shop</h1>
      <div className='flex gap-2 items-center'>
        <img src='./gem.png' />
        <span>{gemas} Gemas</span>
      </div>
      <button className='text-white hover:underline' onClick={toggleCarrito}>
        Ver Carrito ({cantidadItems})
      </button>
    </div>
  );
};

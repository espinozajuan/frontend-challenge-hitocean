import { useState } from 'react';
import { useCarrito } from './CarritoContext';

interface CarritoComponentProps {
  toggleCarrito: () => void;
}

export default function CarritoComponent({
  toggleCarrito,
}: CarritoComponentProps) {
  const { items, gemas, removeItem } = useCarrito();
  const [mensaje, setMensaje] = useState<string | null>(null);

  const realizarCompra = async () => {
    const response = await fetch('http://localhost:3001/compras', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        itemsId: items.map((item) => item.id),
      }),
    });

    if (response.ok) {
      setMensaje('Compra realizada con éxito');
    } else {
      setMensaje('Error al realizar la compra');
    }
  };

  if (mensaje) {
    return (
      <div>
        <h3 className='text-2xl font-bold mb-4'>{mensaje}</h3>
        <button
          className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded'
          onClick={toggleCarrito}
        >
          Volver
        </button>
      </div>
    );
  }

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Carrito</h3>
      <ul>
        {items.map((item, index) => (
          <li key={item.id} className='flex justify-between py-2 border-b'>
            <span>
              Poción {item.id} - {item.precio} gemas
            </span>
            <button
              className='text-red-500 hover:text-red-600'
              onClick={() => removeItem(item.id)}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
      <button
        className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mt-4 rounded'
        onClick={realizarCompra}
        disabled={items.length === 0}
      >
        Comprar
      </button>
      <button
        className='bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded ml-4'
        onClick={toggleCarrito}
      >
        Volver
      </button>
    </div>
  );
}

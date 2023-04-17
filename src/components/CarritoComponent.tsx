import { useState } from 'react';
import { useCarrito } from './CarritoContext';
import { CarritoComponentProps } from './types';

export default function CarritoComponent({
  toggleCarrito,
}: CarritoComponentProps) {
  const { items, removeItem, resetCarrito } = useCarrito();
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
      setMensaje('Compra realizada!');
      resetCarrito();
    } else {
      setMensaje('Error al realizar la compra');
    }
  };

  if (mensaje) {
    return (
      <div>
        <button
          className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-2'
          onClick={toggleCarrito}
        >
          Volver
        </button>
        <h3 className='text-2xl font-bold mb-4'>{mensaje}</h3>
        <button className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 w-full mb-4 rounded opacity-50 cursor-not-allowed'>
          Comprar
        </button>
      </div>
    );
  }

  return (
    <div>
      <button
        className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded mb-2'
        onClick={toggleCarrito}
      >
        Volver
      </button>
      <table className='table-auto w-full mb-4 bg-stone-700'>
        <tbody>
          {items.map((item, index) => (
            <tr key={item.id} className='border-b border-dashed border-white'>
              <td className='p-2 text-center'>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  className='w-10 h-10 object-cover rounded inline-block'
                />
              </td>
              <td className='p-2 text-white'>{item.nombre}</td>
              <td className='p-2 text-center'>
                <button
                  className='text-stone-500'
                  onClick={() => removeItem(item.id)}
                >
                  X
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 w-full mb-4 rounded'
        onClick={realizarCompra}
        disabled={items.length === 0}
      >
        Comprar
      </button>
    </div>
  );
}

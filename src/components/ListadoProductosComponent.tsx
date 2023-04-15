import { useEffect, useState } from 'react';
import { useCarrito } from './CarritoContext';

interface Producto {
  id: number;
  nombre: string;
  precio: number;
  categoria: string;
  descripcion: string;
  imagen: string;
}

export default function ListadoProductosComponent() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const { items, addItem } = useCarrito();

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  function agregarItemAlCarrito(id: number) {
    if (items.includes(id)) {
      alert('Ya has agregado este item al carrito');
      return;
    }

    if (items.length >= 3) {
      alert('No puedes agregar más items al carrito');
      return;
    }

    const categoriaActual = productos.find(
      (producto) => producto.id === id
    )?.categoria;
    const idsCategoriasActuales = items.map(
      (itemId) =>
        productos.find((producto) => producto.id === itemId)?.categoria
    );
    if (idsCategoriasActuales?.includes(categoriaActual)) {
      alert('Solo puedes agregar un item por categoría al carrito');
      return;
    }

    addItem(id);
  }

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Pociones</h3>
      <div className='grid grid-cols-2 gap-4'>
        {productos.map((producto) => (
          <div
            key={producto.id}
            className='bg-white shadow rounded-lg p-4 flex flex-col justify-between'
          >
            <div>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className='w-full h-48 object-cover'
              />
              <h4 className='text-xl font-bold mt-2'>{producto.nombre}</h4>
              <p className='text-gray-500'>{producto.descripcion}</p>
              <p className='text-gray-600 font-semibold mt-2'>
                Precio: {producto.precio}
              </p>
            </div>
            <div className='mt-4 flex justify-center'>
              <button
                className='bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded'
                onClick={() => agregarItemAlCarrito(producto.id)}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

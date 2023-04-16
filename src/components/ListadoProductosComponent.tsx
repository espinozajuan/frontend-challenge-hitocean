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
  const { items, addItem, gemas } = useCarrito();

  useEffect(() => {
    fetch('http://localhost:3001/productos')
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error(error));
  }, []);

  function agregarItemAlCarrito(id: number) {
    if (items.find((item) => item.id === id)) {
      alert('Ya has agregado este item al carrito');
      return;
    }

    if (items.length >= 3) {
      alert('No puedes agregar más items al carrito');
      return;
    }

    const productoActual = productos.find((producto) => producto.id === id);

    if (!productoActual) {
      return;
    }

    if (gemas < productoActual.precio) {
      alert('No tienes suficientes gemas para comprar esta poción');
      return;
    }

    const categoriaActual = productoActual.categoria;
    const categoriaYaEnCarrito = items.some(
      (item) =>
        productos.find((producto) => producto.id === item.id)?.categoria ===
        categoriaActual
    );

    if (categoriaYaEnCarrito) {
      alert('Solo puedes agregar un item por categoría al carrito');
      return;
    }

    addItem(id, productoActual.precio);
  }

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Pociones</h3>
      <div className='grid grid-cols-2 gap-4'>
        {productos.map((producto) => {
          const gemasText = producto.precio === 1 ? 'Gema' : 'Gemas';

          return (
            <div
              key={producto.id}
              className='bg-stone-700 shadow rounded-lg p-4 flex flex-col justify-between items-start relative h-64 hover:border-purple-600 border-transparent border-2'
            >
              <button className='bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded-full absolute top-2 right-4 text-xs'>
                {producto.precio} {gemasText}
              </button>
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className='w-16 h-16 object-cover mb-4 self-center mx-auto m-3'
              />
              <h4 className='text-lg font-bold'>{producto.nombre}</h4>
              <p className='text-gray-500 text-xs mb-2 w-full'>
                {producto.descripcion}
              </p>
              <button
                className='bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 w-full rounded-full'
                onClick={() => agregarItemAlCarrito(producto.id)}
              >
                Agregar
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

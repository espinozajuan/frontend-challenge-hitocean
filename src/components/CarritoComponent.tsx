import { useCarrito } from './CarritoContext';

export default function CarritoComponent() {
  const { items, gemas, removeItem } = useCarrito();

  return (
    <div>
      <h3 className='text-2xl font-bold mb-4'>Carrito</h3>
      <p>Gemas disponibles: {gemas}</p>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            Poción ID: {item.id} | Precio: {item.precio}{' '}
            <button onClick={() => removeItem(item.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

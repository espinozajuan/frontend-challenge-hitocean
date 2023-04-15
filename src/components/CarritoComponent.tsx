import { useCarrito } from './CarritoContext';

export default function CarritoComponent() {
  const { items, removeItem } = useCarrito();

  return (
    <div>
      <h3>Carrito</h3>
      {items.length === 0 ? (
        <p>No hay items en el carrito</p>
      ) : (
        <ul>
          {items.map((itemId) => (
            <li key={itemId}>
              Item {itemId}{' '}
              <button onClick={() => removeItem(itemId)}>Eliminar</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

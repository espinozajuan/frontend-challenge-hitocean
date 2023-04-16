import { useState } from 'react';
import { HeaderComponent } from './components/HeaderComponent';
import CarritoComponent from './components/CarritoComponent';
import ListadoProductosComponent from './components/ListadoProductosComponent';
import { CarritoProvider } from './components/CarritoContext';

function App() {
  const [showCarrito, setShowCarrito] = useState(false);

  const toggleCarrito = () => {
    setShowCarrito((prevShowCarrito) => !prevShowCarrito);
  };

  return (
    <CarritoProvider>
      <div
        className='min-h-full bg-fixed'
        style={{ backgroundImage: 'url(background.webp)' }}
      >
        <HeaderComponent toggleCarrito={toggleCarrito} />
        <div className='flex justify-center min-h-full'>
          <div className='max-w-lg w-full py-16'>
            {showCarrito ? (
              <CarritoComponent toggleCarrito={toggleCarrito} />
            ) : (
              <ListadoProductosComponent />
            )}
          </div>
        </div>
      </div>
    </CarritoProvider>
  );
}

export default App;

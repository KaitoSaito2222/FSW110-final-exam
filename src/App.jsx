import { useState } from 'react';
import ProductsPage from './ProductsPage';
import CartPage from './CartPage';

const App = () => {
  const [products, setProducts] = useState([
    { id: 1, name: 'Laptop', category: 'Electronics', price: 1200, quantity: 5, rating: 4.5, date: '2025-01-15' },
    { id: 2, name: 'Phone', category: 'Electronics', price: 800, quantity: 10, rating: 4.0, date: '2025-02-10' },
    { id: 3, name: 'Headphones', category: 'Audio', price: 150, quantity: 20, rating: 4.8, date: '2025-03-05' },
  ]);
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState('products');

  const addProduct = (product) => {
    setProducts([...products, { ...product, id: Date.now() }]);
  };

  const addToCart = (product) => {
    const existingItem = cart.find(item => item.id === product.id);
    if (existingItem) {
      setCart(cart.map(item => 
        item.id === product.id ? { ...item, cartQuantity: item.cartQuantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, cartQuantity: 1 }]);
    }
  };

  const removeFromCart = (productId) => {
    setCart(cart.filter(item => item.id !== productId));
  };

  const updateCartQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
    } else {
      setCart(cart.map(item => 
        item.id === productId ? { ...item, cartQuantity: newQuantity } : item
      ));
    }
  };

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>E-Commerce Store</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={() => setCurrentPage('products')} style={{ marginRight: '10px', padding: '10px' }}>
          Products
        </button>
        <button onClick={() => setCurrentPage('cart')} style={{ padding: '10px' }}>
          Cart ({cart.reduce((sum, item) => sum + item.cartQuantity, 0)})
        </button>
      </div>

      {currentPage === 'products' ? (
        <ProductsPage 
          products={products} 
          addProduct={addProduct}
          addToCart={addToCart}
          removeFromCart={removeFromCart}
          cart={cart}
        />
      ) : (
        <CartPage 
          cart={cart}
          removeFromCart={removeFromCart}
          updateCartQuantity={updateCartQuantity}
          goToProducts={() => setCurrentPage('products')}
        />
      )}
    </div>
  );
}

export default App;
import React from 'react';

const CartPage = ({ cart, removeFromCart, updateCartQuantity, goToProducts }) => {
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.cartQuantity), 0);

  const handleCheckout = () => {
    const summary = cart.map(item => 
      `${item.name} x${item.cartQuantity} = $${(item.price * item.cartQuantity).toFixed(2)}`
    ).join('\n');
    alert(`Order Summary:\n\n${summary}\n\nTotal: $${totalPrice.toFixed(2)}\n\nThank you for your order!`);
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty</p>
          <button onClick={goToProducts} style={{ padding: '10px', marginTop: '10px' }}>
            Go to Products
          </button>
        </div>
      ) : (
        <div>
          {cart.map(item => (
            <div key={item.id} style={{ border: '1px solid #ddd', padding: '15px', marginBottom: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3>{item.name}</h3>
                <p>Price: ${item.price}</p>
                <p>Category: {item.category}</p>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <button onClick={() => updateCartQuantity(item.id, item.cartQuantity - 1)} style={{ padding: '5px 10px' }}>-</button>
                <span>Quantity: {item.cartQuantity}</span>
                <button onClick={() => updateCartQuantity(item.id, item.cartQuantity + 1)} style={{ padding: '5px 10px' }}>+</button>
                <p style={{ margin: '0 10px', fontWeight: 'bold' }}>
                  Subtotal: ${(item.price * item.cartQuantity).toFixed(2)}
                </p>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  style={{ padding: '8px 12px', backgroundColor: 'red', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          
          <div style={{ marginTop: '20px', padding: '20px', border: '2px solid green', backgroundColor: '#f9f9f9' }}>
            <h2>Total: ${totalPrice.toFixed(2)}</h2>
            <button 
              onClick={handleCheckout}
              style={{ padding: '15px 30px', backgroundColor: 'green', color: 'white', border: 'none', cursor: 'pointer', fontSize: '16px', marginTop: '10px' }}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
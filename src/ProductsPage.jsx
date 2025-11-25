import React, { useState } from 'react';

const ProductsPage = ({ products, addProduct, addToCart, removeFromCart, cart }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    price: '',
    quantity: '',
    rating: '',
    date: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.category && formData.price && formData.quantity && formData.rating && formData.date) {
      addProduct({
        ...formData,
        price: Number(formData.price),
        quantity: Number(formData.quantity),
        rating: Number(formData.rating)
      });
      setFormData({ name: '', category: '', price: '', quantity: '', rating: '', date: '' });
    }
  };

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (!sortBy) return 0;
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    if (sortOrder === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const isInCart = (productId) => {
    return cart.some(item => item.id === productId);
  };

  return (
    <div>
      <h2>Products</h2>
      
      <div style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '20px' }}>
        <h3>Add New Product</h3>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input
            type="text"
            placeholder="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            style={{ padding: '5px' }}
          />
          <input
            type="text"
            placeholder="Category"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            style={{ padding: '5px' }}
          />
          <input
            type="number"
            placeholder="Price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            style={{ padding: '5px' }}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
            style={{ padding: '5px' }}
          />
          <input
            type="number"
            step="0.1"
            placeholder="Rating (0-5)"
            value={formData.rating}
            onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
            style={{ padding: '5px' }}
          />
          <input
            type="date"
            value={formData.date}
            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
            style={{ padding: '5px' }}
          />
          <button type="submit" style={{ padding: '5px 15px' }}>Add Product</button>
        </form>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ padding: '8px', width: '300px', marginRight: '10px' }}
        />
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label>Sort by: </label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={{ padding: '5px', marginRight: '10px' }}>
          <option value="">None</option>
          <option value="price">Price</option>
          <option value="quantity">Quantity</option>
          <option value="rating">Rating</option>
          <option value="date">Date</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)} style={{ padding: '5px' }}>
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '20px' }}>
        {sortedProducts.map(product => (
          <div key={product.id} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
            <h3>{product.name}</h3>
            <p>Category: {product.category}</p>
            <p>Price: ${product.price}</p>
            <p>Quantity: {product.quantity}</p>
            <p>Rating: {product.rating} ⭐</p>
            <p>Date: {product.date}</p>
            <div style={{ marginTop: '10px' }}>
              {isInCart(product.id) ? (
                <button 
                  onClick={() => removeFromCart(product.id)}
                  style={{ padding: '8px 12px', backgroundColor: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Remove from Cart
                </button>
              ) : (
                <button 
                  onClick={() => addToCart(product)}
                  style={{ padding: '8px 12px', backgroundColor: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}
                >
                  Add to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductsPage;
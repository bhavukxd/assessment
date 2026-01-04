import { useState, useEffect } from 'react';
import ProductList from './components/ProductList';
import Filters from './components/Filters';
import Cart from './components/Cart';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');

  useEffect(() => {
    fetch('https://dummyjson.com/products?limit=20')
      .then(res => res.json())
      .then(data => {
        setProducts(data.products);
        setFilteredProducts(data.products);
      });
  }, []);

  useEffect(() => {
    let filtered = products.filter(p =>
      p.title.toLowerCase().includes(search.toLowerCase()) &&
      (category === '' || p.category === category)
    );
    if (sort === 'low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sort === 'high') {
      filtered.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(filtered);
  }, [products, search, category, sort]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        if (existing.quantity < product.stock) {
          return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
        }
      } else {
        return [...prev, { id: product.id, quantity: 1, ...product }];
      }
      return prev;
    });
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id, quantity) => {
    if (quantity <= 0) {
      removeFromCart(id);
    } else {
      setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
    }
  };

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const clearFilters = () => {
    setSearch('');
    setCategory('');
    setSort('');
  };

  const categories = [...new Set(products.map(p => p.category))];

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="app">
      <header>
        <h1>Filpkart</h1>
        <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} totalItems={totalItems} totalPrice={totalPrice} />
      </header>
      <Filters search={search} setSearch={setSearch} category={category} setCategory={setCategory} sort={sort} setSort={setSort} categories={categories} clearFilters={clearFilters} />
      <ProductList products={filteredProducts} addToCart={addToCart} />
    </div>
  );
}

export default App;
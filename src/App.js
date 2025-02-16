import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useParams } from "react-router-dom";
import { Heart, ShoppingCart, Trash } from "lucide-react";

function ProductList({ addToCart, toggleFavorite, favorites }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data.slice(0, data.length - 2)); // Removing two products
      });
  }, []);

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="p-4 shadow-lg rounded-lg text-center border hover:scale-105 transition-transform">
          <img src={product.image} alt={product.title} className="w-full h-56 object-contain bg-transparent mb-2" />
          <div>
            <h2 className="text-lg font-bold">{product.title}</h2>
            <p className="text-gray-600">${product.price}</p>
            <div className="flex justify-between mt-2">
              <Link to={`/product/${product.id}`} className="text-blue-500 underline">View Details</Link>
              <button onClick={() => addToCart(product)} className="bg-blue-500 text-white px-3 py-1 rounded flex items-center">
                <ShoppingCart className="mr-2" size={16} /> Add to Cart
              </button>
              <button onClick={() => toggleFavorite(product)} className="bg-gray-200 p-1 rounded">
                <Heart className={favorites.some(p => p.id === product.id) ? "text-red-500" : "text-gray-400"} size={20} />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

function ProductDetails() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, [id]);

  if (!product) return <p>Loading...</p>;

  return (
    <div className="p-4 text-center">
      <img src={product.image} alt={product.title} className="w-64 h-64 object-contain bg-transparent mx-auto" />
      <h2 className="text-2xl font-bold mt-2">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
    </div>
  );
}

function Cart({ cart, removeFromCart }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((product) => (
        <div key={product.id} className="flex justify-between items-center border p-4 mb-2">
          <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-transparent" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <button onClick={() => removeFromCart(product)} className="text-red-500">
            <Trash size={20} />
          </button>
        </div>
      ))}
      {cart.length > 0 && <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Proceed to Checkout</button>}
    </div>
  );
}

function Favorites({ favorites, removeFromFavorites, moveToCart   }) {
  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      {favorites.length === 0 ? <p>Your favorites list is empty.</p> : favorites.map((product) => (
        <div key={product.id} className="flex justify-between items-center border p-4 mb-2">
          <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-transparent" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <button onClick={() => moveToCart(product)} className="bg-blue-500 text-white px-3 py-1 rounded">Buy Now</button>
          <button onClick={() => removeFromFavorites(product)} className="text-red-500">
            <Trash size={20} />
          </button>
        </div>
      ))}
    </div>
  );
}

export default function ECommerce() {
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const removeFromCart = (product) => {
    setCart((prevCart) => prevCart.filter((p) => p.id !== product.id));
  };

  const toggleFavorite = (product) => {
    setFavorites((prevFavorites) =>
      prevFavorites.some(p => p.id === product.id)
        ? prevFavorites.filter((p) => p.id !== product.id)
        : [...prevFavorites, product]
    );
  };

  const removeFromFavorites = (product) => {
    setFavorites((prevFavorites) => prevFavorites.filter((p) => p.id !== product.id));
  };

  const moveToCart = (product) => {
    removeFromFavorites(product);
    addToCart(product);
  };

  return (
    <Router>
      <div className="p-4 flex justify-between items-center bg-gray-100">
        <h1 className="text-xl font-bold">E-Commerce Store</h1>
        <div className="flex space-x-4">
          <Link to="/cart" className="relative">
            <ShoppingCart className="w-8 h-8 text-gray-700" />
            {cart.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {cart.length}
              </span>
            )}
          </Link>
          <Link to="/favorites" className="relative">
            <Heart className="w-8 h-8 text-gray-700" />
            {favorites.length > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs rounded-full px-2 py-1">
                {favorites.length}
              </span>
            )}
          </Link>
        </div>
      </div>
      <Routes>
        <Route path="/cart" element={<Cart cart={cart} removeFromCart={removeFromCart} />} />
        <Route path="/favorites" element={<Favorites favorites={favorites} removeFromFavorites={removeFromFavorites} moveToCart={moveToCart} />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/" element={<ProductList addToCart={addToCart} toggleFavorite={toggleFavorite} favorites={favorites} />} />
      </Routes>
    </Router>
  );
}

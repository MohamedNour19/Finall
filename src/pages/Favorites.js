import BackButton from "./BackButton";
import { useNavigate } from 'react-router-dom';

function Favorites({ favorites, removeFromFavorites, moveToCart }) {
  return (
    <div className="p-4">
      <BackButton /> {/* زر الرجوع هنا */}
      <h2 className="text-xl font-bold mb-4">Favorites</h2>
      {favorites.length === 0 ? <p>Your favorites list is empty.</p> : favorites.map((product) => (
        <div key={product.id} className="flex justify-between items-center border p-4 mb-2">
          <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-transparent" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <button onClick={() => moveToCart(product)} className="bg-blue-500 text-white px-3 py-1 rounded">Buy Now</button>
          <button onClick={() => removeFromFavorites(product)} className="text-red-500">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

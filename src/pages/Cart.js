import BackButton from "./BackButton";


function Cart({ cart, removeFromCart }) {
  return (
    <div className="p-4">
      <BackButton /> {/* زر الرجوع هنا */}
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {cart.length === 0 ? <p>Your cart is empty.</p> : cart.map((product) => (
        <div key={product.id} className="flex justify-between items-center border p-4 mb-2">
          <img src={product.image} alt={product.title} className="w-16 h-16 object-contain bg-transparent" />
          <p>{product.title}</p>
          <p>${product.price}</p>
          <button onClick={() => removeFromCart(product)} className="text-red-500">
            🗑️
          </button>
        </div>
      ))}
    </div>
  );
}

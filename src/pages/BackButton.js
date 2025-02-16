import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import BackButton from "./BackButton"; // استيراد الزر

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
      <BackButton /> {/* إضافة الزر هنا */}
      <img src={product.image} alt={product.title} className="w-64 h-64 object-contain bg-transparent mx-auto" />
      <h2 className="text-2xl font-bold mt-2">{product.title}</h2>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-lg font-bold mt-2">${product.price}</p>
    </div>
  );
}

export default ProductDetails;

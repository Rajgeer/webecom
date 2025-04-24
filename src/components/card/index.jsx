import React from 'react';
const ProductCard = ({ product, addToCart }) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-4 m-2">
      <img className="w-full h-48 object-cover" src={product.images[0]} alt={product.name} />
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{product.name}</div>
        <p className="text-gray-700 text-base">${product.price}</p>
      </div>
      <button 
        onClick={() => addToCart(product)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductCard;
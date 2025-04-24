import React from 'react';

const CartItem = ({ item, removeFromCart }) => {
  return (
    <div className="flex justify-between items-center p-2 border-b">
      <div>
        <h3 className="font-semibold">{item.name}</h3>
        <p>Quantity: {item.quantity}</p>
        <p>Price: ${item.price * item.quantity}</p>
      </div>
      <button
        onClick={() => removeFromCart(item.id)}
        className="text-red-500 hover:text-red-700"
      >
        Remove
      </button>
    </div>
  );
};

export default CartItem;
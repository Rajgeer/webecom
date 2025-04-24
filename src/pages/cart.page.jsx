import { useCart } from "../context/CartContext";

export default function CartPage() {
  const { cartItems } = useCart();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cartItems.map((item) => (
        <div key={item.id} className="border-b py-4">
          <h3>{item.title}</h3>
          <p>${item.price}</p>
        </div>
      ))}
      <div className="mt-4 text-xl font-bold">
        Total: ${cartItems.reduce((sum, item) => sum + item.price, 0)}
      </div>
    </div>
  );
}
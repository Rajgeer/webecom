// import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductDetail() {
//   const { id } = useParams();
  const { addToCart } = useCart();
  // Fetch product data using the ID (mock example)
  const product = { id: 1, title: "Product 1", price: 100 };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold">{product.title}</h1>
      <p className="text-xl mt-2">${product.price}</p>
      <button
        onClick={() => addToCart(product)}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Add to Cart
      </button>
    </div>
  );
}
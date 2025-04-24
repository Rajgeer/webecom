import React from 'react'
import ProductCard from '../components/card'
// import ProductImage from  '../assets/product-image-dummy.jpg'
import CartItem from '../components/cartItem'
import { useFetchProductsQuery,  } from '../app/apiSlice';
import { useAppDispatch, useAppSelector } from '../app/store';
import { addItemToCart, removeItemFromCart, selectCartItems,  } from '../features/cartSlice';
// const initialProducts = [
//   { id: 1, name: 'Product 1', price: 19.99, image: ProductImage },
//   { id: 2, name: 'Product 2', price: 29.99, image: ProductImage },
//   { id: 3, name: 'Product 3', price: 39.99, image: ProductImage },
// ];
function HomePage() {
  // const [cart, setCart] = React.useState([]);
  const {data} = useFetchProductsQuery();
  const dispatch = useAppDispatch();
  const cart = useAppSelector(selectCartItems);
  // const totalPrice = useAppSelector(selectTotalPrice)
  // const addToCart = (product) => {
  //   const existingItem = cart.find(item => item.id === product.id);
  //   if (existingItem) {
  //     setCart(cart.map(item =>
  //       item.id === product.id 
  //         ? { ...item, quantity: item.quantity + 1 } 
  //         : item
  //     ));
  //   } else {
  //     setCart([...cart, { ...product, quantity: 1 }]);
  //   }
  // };

  // const removeFromCart = (productId) => {
  //   setCart(cart.filter(item => item.id !== productId));
  // };

  // const calculateTotal = () => {
  //   return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  // };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-8">Our Products</h1>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Products Grid */}
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.products?.map(product => (
            <ProductCard 
              key={product._id} 
              product={product} 
              addToCart={() =>dispatch(addItemToCart(product))} 
            />
          ))}
        </div>

        {/* Cart and Bill Section */}
        <div className="md:w-1/3 bg-gray-100 p-4 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
          
          {cart.length === 0 ? (
            <p className="text-gray-500">Your cart is empty</p>
          ) : (
            <>
              <div className="space-y-4 mb-8">
                {cart.map(item => (
                  <CartItem 
                    key={item.id} 
                    item={item} 
                    removeFromCart={() =>dispatch(removeItemFromCart(item.id))} 
                  />
                ))}
              </div>

              <div className="border-t pt-4">
                <div className="flex justify-between text-xl font-bold">
                  <span>Total:</span>
                  {/* <span>${dispatch(calculateTotalPrice).toFixed(2)}</span> */}
                </div>
                <button className="w-full bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
export default HomePage
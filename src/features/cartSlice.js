import { createSlice } from "@reduxjs/toolkit";
// Helper function to load cart from localStorage
const loadCartFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("cart");
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    console.log({ err });
    return undefined;
  }
};
export const saveCartToLocalStorage = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("cart", serializedState);
  } catch {
    // ignore errors
  }
};
const initialState = loadCartFromLocalStorage() || {
  items: [],
  totalQuantity: 0,
  totalAmount: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItemToCart(state, action) {
      const newItem = action.payload;
      const existingItem = state.items.find((item) => item.id === newItem._id);

      if (!existingItem) {
        state.items.push({
          id: newItem._id,
          name: newItem.name,
          price: newItem.price,
          quantity: 1,
          totalPrice: newItem.price,
          image: newItem.image,
        });
      } else {
        existingItem.quantity++;
        existingItem.totalPrice += newItem.price;
      }

      state.totalQuantity++;
      state.totalAmount += newItem.price;
    },

    removeItemFromCart(state, action) {
      const id = action.payload;
      const existingItem = state.items.find((item) => item.id === id);

      if (existingItem.quantity === 1) {
        state.items = state.items.filter((item) => item.id !== id);
      } else {
        existingItem.quantity--;
        existingItem.totalPrice -= existingItem.price;
      }

      state.totalQuantity--;
      state.totalAmount -= existingItem.price;
    },

    clearCart(state) {
      state.items = [];
      state.totalQuantity = 0;
      state.totalAmount = 0;
    },
  },
});

export const {
  addItemToCart,
  removeItemFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;

export const selectCartItems = state => state.cart.items;
export const selectTotalQuantity = state => state.cart.totalQuantity;
export const selectTotalAmount = state => state.cart.totalAmount;
export const selectItemQuantity = (state, productId) => {
  const item = state.cart.items.find(item => item.id === productId);
  return item ? item.quantity : 0;
};
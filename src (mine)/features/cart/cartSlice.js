import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  pizzaObjects: [],
};
const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {
      const index = state.pizzaObjects.findIndex(
        (obj) => obj.id === action.payload.id,
      );
      if (index !== -1) return;
      state.pizzaObjects.push(action.payload);
    },

    increaseQuantity(state, action) {
      state.pizzaObjects.map((item) => {
        if (item.id === action.payload || item.name === action.payload) {
          item.quantity += 1;
          item.totalPrice = Number(item.unitPrice * item.quantity);
        }
      });
    },
    decreaseQuantity(state, action) {
      state.pizzaObjects.map((item) => {
        if (item.id === action.payload || item.name === action.payload) {
          item.quantity -= 1;
          item.totalPrice = Number(item.unitPrice * item.quantity);
          if (item.quantity === 0) {
            const index = state.pizzaObjects.findIndex(
              (obj) => obj.id === action.payload,
            );
            if (index !== -1) {
              state.pizzaObjects.splice(index, 1);
            }
          }
        }
      });
    },
    deleteFromCart(state, action) {
      const index = state.pizzaObjects.findIndex(
        (obj) => obj.id === action.payload,
      );
      if (index !== -1) {
        state.pizzaObjects.splice(index, 1);
      }
    },
    deleteFromFinalCart(state, action) {
      const index = state.pizzaObjects.findIndex(
        (obj) => obj.name === action.payload,
      );
      if (index !== -1) {
        state.pizzaObjects.splice(index, 1);
      }
    },
    deleteCart(state) {
      state.pizzaObjects = [];
    },
  },
});

// export const {} = cartSlice.actions;
export const {
  addToCart,
  increaseQuantity,
  deleteFromCart,
  isItemInCart,
  decreaseQuantity,
  deleteCart,
  deleteFromFinalCart,
  getTotal,
} = cartSlice.actions;
export default cartSlice.reducer;

export const getCart = (state) => state.cart.pizzaObjects;

export const getTotalCartQuantity = (state) =>
  state.cart.pizzaObjects.reduce((sum, item) => sum + item.quantity, 0);

export const getTotalCartPrice = (state) =>
  state.cart.pizzaObjects.reduce((sum, item) => sum + item.totalPrice, 0);

export const makeOrderPriority = (state) =>
  state.cart.pizzaObjects.reduce((sum, item) => sum + item.totalPrice, 0);

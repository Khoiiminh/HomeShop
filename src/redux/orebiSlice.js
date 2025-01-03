import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: [],
  products: [],
  subtotal: 0,
  shippingCharge: 0
};

const calculateSubtotal = (products) => {
  return products.reduce((total, item) => total + item.price * item.quantity, 0);
};

// Modified to ensure we're getting the correct shipping charge
const calculateShippingCharge = (subtotal) => {
  if (subtotal === 0) return 0;  // If cart is empty, no shipping charge
  if (subtotal <= 200) return 30;
  if (subtotal <= 400) return 25;
  return 20;
};

// Helper function to update totals
const updateTotals = (state) => {
  state.subtotal = calculateSubtotal(state.products);
  state.shippingCharge = calculateShippingCharge(state.subtotal);
};

export const orebiSlice = createSlice({
  name: "orebi",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity += action.payload.quantity;
      } else {
        state.products.push(action.payload);
      }
      updateTotals(state);
    },

    increaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item) {
        item.quantity++;
        updateTotals(state);
      }
    },

    drecreaseQuantity: (state, action) => {
      const item = state.products.find(
        (item) => item._id === action.payload._id
      );
      if (item.quantity === 1) {
        item.quantity = 1;
      } else {
        item.quantity--;
        updateTotals(state);
      }
    },

    deleteItem: (state, action) => {
      state.products = state.products.filter(
        (item) => item._id !== action.payload
      );
      updateTotals(state);
    },

    resetCart: (state) => {
      state.products = [];
      state.subtotal = 0;
      state.shippingCharge = 0;
    }
  },
});

// Selector to get all cart totals
export const selectCartTotals = (state) => ({
  subtotal: state.orebiReducer.subtotal,
  shippingCharge: state.orebiReducer.shippingCharge,
  total: state.orebiReducer.subtotal + state.orebiReducer.shippingCharge
});

export const {
  addToCart,
  increaseQuantity,
  drecreaseQuantity,
  deleteItem,
  resetCart
} = orebiSlice.actions;

export default orebiSlice.reducer;
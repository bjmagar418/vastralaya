import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

import authApi from "./features/auth/authApi";
import authReducer from './features/auth/authSlice';
import wishReducer from './features/wish/wishSlice'


 const store = configureStore({
  reducer: {
    cart: cartReducer,
     wish:wishReducer,
    //authApi.reducerPath]: authApi.reducer,
   auth: authReducer,
    // [productsApi.reducerPath]: productsApi.reducer,
    // [reviewApi.reducerPath]: reviewApi.reducer,
    // [statsApi.reducerPath]: statsApi.reducer,
  // [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,

      // productsApi.middleware,
      // reviewApi.middleware,
      // statsApi.middleware,
      // orderApi.middleware,
    ),
})

export default store;
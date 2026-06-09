import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
<<<<<<< HEAD
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
=======


export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [reviewApi.reducerPath]: reviewApi.reducer,
    [statsApi.reducerPath]: statsApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
<<<<<<< HEAD
      // productsApi.middleware,
      // reviewApi.middleware,
      // statsApi.middleware,
      // orderApi.middleware,
    ),
});


export default store;
=======
      productsApi.middleware,
      reviewApi.middleware,
      statsApi.middleware,
      orderApi.middleware,
    ),
});
>>>>>>> 708d87618764c867cd80ab9372f2c008ae93bd88

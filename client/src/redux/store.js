import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";

import authApi from "./features/auth/authApi";
import authReducer from './features/auth/authSlice';
import wishReducer from './features/wish/wishSlice'
import productsApi from "./features/products/productsApi";
import reviewApi from "./features/reviews/reviewsApi";
import statsApi  from "./features/stats/statsApi";
import orderApi from "./features/orders/orderApi"

 const store = configureStore({
   reducer: {
     cart: cartReducer,
     wish: wishReducer,
     auth: authReducer,
     [authApi.reducerPath]: authApi.reducer,
     [productsApi.reducerPath]: productsApi.reducer,
     [reviewApi.reducerPath]: reviewApi.reducer,
      [statsApi.reducerPath]: statsApi.reducer,
     [orderApi.reducerPath]: orderApi.reducer,
   },
   middleware: (getDefaultMiddleware) =>
     getDefaultMiddleware().concat(
       authApi.middleware,
      productsApi.middleware,
       reviewApi.middleware,
       statsApi.middleware,
       orderApi.middleware,
     ),
 });

export default store;
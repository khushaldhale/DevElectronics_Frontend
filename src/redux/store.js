import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import itemSlice from "./slices/itemSlice";
import shopSlice from "./slices/shopSlice";
import billSlice from "./slices/billSlice";
import categorySlice from "./slices/categorySlice";



export const store = configureStore(
	{
		reducer: {
			auth: authSlice,
			item: itemSlice,
			shop: shopSlice,
			bill: billSlice,
			category: categorySlice
		}
	}
)
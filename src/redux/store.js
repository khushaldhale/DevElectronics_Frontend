import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/authSlice";
import itemSlice from "./slices/itemSlice";



export const store = configureStore(
	{
		reducer: {
			auth: authSlice,
			item: itemSlice
		}
	}
)
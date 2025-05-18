import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const getShop = createAsyncThunk("getShop", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/shops`, {
			method: "GET",
			credentials: "include"
		})

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}

		return await response.json()
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

const initialState = {
	isLoading: null,
	isError: null,
	shopDetails: {}
}
export const shopSlice = createSlice(
	{
		name: 'shop',
		initialState,
		extraReducers: (builder) => {

			builder.addCase(getShop.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getShop.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.shopDetails = action?.payload?.data
				})
				.addCase(getShop.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default shopSlice.reducer; 
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";




export const createBill = createAsyncThunk("createBill", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bills`,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data),
				credentials: "include"
			}
		)

		if (!response.ok) {
			return rejectWithValue(await response.json())
		}
		return await response.json()
	}
	catch (error) {
		return rejectWithValue(error)
	}
})

export const getAllBills = createAsyncThunk("getAllBills", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/bills`,
			{
				method: "GET",
				credentials: "include"
			}
		)

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
	bills: []
}

export const billSlice = createSlice(
	{
		name: "bill",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(createBill.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createBill.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;

				})
				.addCase(createBill.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(getAllBills.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getAllBills.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.bills = action?.payload?.data
				})
				.addCase(getAllBills.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default billSlice.reducer
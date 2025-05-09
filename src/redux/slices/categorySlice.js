import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const createCategory = createAsyncThunk("createCategory", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data),
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

export const getAllCategories = createAsyncThunk("getAllCategories", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories`, {
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

export const deleteCategory = createAsyncThunk("deleteCategory", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories/${data._id}`, {
			method: "DELETE",
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

export const getItemsByCategory = createAsyncThunk("getItemsByCategory", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/categories/${data._id}`, {
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
	categories: [],
	particularCatItems: []
}

export const categorySlice = createSlice(
	{
		name: "category",
		initialState,
		extraReducers: (builder) => {
			builder.addCase(createCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createCategory.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
				})
				.addCase(createCategory.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})




			builder.addCase(getAllCategories.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getAllCategories.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.categories = action?.payload?.data
				})
				.addCase(getAllCategories.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(deleteCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteCategory.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.categories = state.categories.filter((category) => {
						if (category._id !== action?.payload?.data?._id) {
							return true
						}
					})
				})
				.addCase(deleteCategory.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})





			builder.addCase(getItemsByCategory.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getItemsByCategory.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.particularCatItems = action?.payload?.data?.items;
				})
				.addCase(getItemsByCategory.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)
export default categorySlice.reducer
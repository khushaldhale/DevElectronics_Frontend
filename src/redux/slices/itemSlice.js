import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";



export const getAllItems = createAsyncThunk("getAllItems", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items`, {
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

export const createItem = createAsyncThunk("createItem", async (data, { rejectWithValue }) => {
	try {
		const isFormData = data instanceof FormData;

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items`, {
			method: "POST",
			credentials: "include",
			headers: isFormData
				? undefined // Let browser set Content-Type with proper multipart boundary
				: {
					"Content-Type": "application/json"
				},
			body: isFormData ? data : JSON.stringify(data)
		});

		if (!response.ok) {
			return rejectWithValue(await response.json());
		}

		return await response.json();
	} catch (error) {
		return rejectWithValue(error);
	}
});

export const deleteItem = createAsyncThunk("deleteItem", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${data._id}`, {
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

export const updateItem = createAsyncThunk("updateItem", async (data, { rejectWithValue }) => {
	try {

		const isFormData = data instanceof FormData;

		let id = isFormData && data.get("_id");

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${isFormData ? id : data._id}`, {
			method: "PUT",
			credentials: "include",
			headers: isFormData
				? undefined // Let browser set Content-Type with proper multipart boundary
				: {
					"Content-Type": "application/json"
				},
			body: isFormData ? data : JSON.stringify(data)

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

export const particularItem = createAsyncThunk("particularItem", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/${data._id}`, {
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

export const getSuggestions = createAsyncThunk("getSuggestions", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/items/search`, {
			method: "POST",
			credentials: "include",
			headers: {
				"Content-Type": "application/json"
			},
			body: JSON.stringify(data)
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
	items: [],
	particularItem: {},
	suggestions: []
}

export const itemSlice = createSlice(
	{
		name: "item",
		initialState,
		reducers: {
			removeSuggestions: (state) => {
				state.suggestions = []
			}
		},
		extraReducers: (builder) => {

			builder.addCase(getAllItems.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getAllItems.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.items = action?.payload?.data
				})
				.addCase(getAllItems.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(createItem.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createItem.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.items = [...state.items, action?.payload?.data]
				})
				.addCase(createItem.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(deleteItem.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteItem.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.items = state.items.filter((item) => {
						if (action?.payload?.data?._id !== item._id) {
							return true;
						}
					})
				})
				.addCase(deleteItem.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(updateItem.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(updateItem.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;

					state.items = state.items.map((item) => {
						if (action?.payload?.data?._id == item._id) {
							return action.payload.data
						} else {
							return item
						}
					})
				})
				.addCase(updateItem.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})




			builder.addCase(particularItem.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(particularItem.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.particularItem = action?.payload?.data;
				})
				.addCase(particularItem.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			//  loading has to ignore, othwerwise  having unwanted loading component rendering 
			builder.addCase(getSuggestions.pending, (state) => {
				// state.isLoading = true;
				state.isError = false;
			})
				.addCase(getSuggestions.fulfilled, (state, action) => {
					// state.isLoading = false;
					state.isError = false;
					state.suggestions = action?.payload?.data;
					console.log("data from api : ", action?.payload?.data)
				})
				.addCase(getSuggestions.rejected, (state, action) => {
					// state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export const { removeSuggestions } = itemSlice.actions

export default itemSlice.reducer
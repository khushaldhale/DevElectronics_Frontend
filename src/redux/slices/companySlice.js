import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const getAllCompanies = createAsyncThunk("getAllCompanies", async (data, { rejectWithValue }) => {
	try {
		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/companies/${data.category_id}`, {
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



export const deleteCompany = createAsyncThunk("deleteCompany", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/companies/${data.company_id}`, {
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



export const createCompany = createAsyncThunk("createCompany", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/companies`, {
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





const initialState = {
	isLoading: null,
	isError: null,
	companies: []
}


export const companySlice = createSlice(
	{
		name: "company",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(getAllCompanies.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(getAllCompanies.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.companies = action.payload.data;

				})
				.addCase(getAllCompanies.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(deleteCompany.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(deleteCompany.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.companies = state.companies.filter((company) => {
						return company._id !== action.payload.data._id;
					})
				})
				.addCase(deleteCompany.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})



			builder.addCase(createCompany.pending, (state, action) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(createCompany.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.companies = [...state.companies, action.payload.data]
				})
				.addCase(createCompany.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})

		}
	}
)

export default companySlice.reducer
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";


export const login = createAsyncThunk("login", async (data, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/login`, {
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


export const logout = createAsyncThunk("logout", async (_, { rejectWithValue }) => {
	try {

		const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/auth/logout`, {
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
	userInfo: localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {},
	isLoggedIn: localStorage.getItem("isLoggedIn") ? localStorage.getItem("isLoggedIn") === "true" : false
}


export const authSlice = createSlice(
	{
		name: "auth",
		initialState,
		extraReducers: (builder) => {

			builder.addCase(login.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(login.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;

					console.log(" action is  : ", action.payload)
					let data = {
						fname: action.payload.data.fname,
						lname: action.payload.data.lname,
						accountType: action.payload.data.accountType
					}

					state.isLoggedIn = true;
					state.userInfo = data;
					localStorage.setItem("userInfo", JSON.stringify(data))
					localStorage.setItem("isLoggedIn", true)

				})
				.addCase(login.rejected, (state, action) => {
					state.isError = true;
					state.isLoading = false;
				})


			builder.addCase(logout.pending, (state) => {
				state.isLoading = true;
				state.isError = false;
			})
				.addCase(logout.fulfilled, (state, action) => {
					state.isLoading = false;
					state.isError = false;
					state.userInfo = {};
					state.isLoggedIn = false;
					localStorage.removeItem("userInfo");
					localStorage.removeItem("isLoggedIn")
					console.log("logged out : ", action.payload)
				})
				.addCase(logout.rejected, (state, action) => {
					state.isLoading = false;
					state.isError = true;
				})
		}
	}
)

export default authSlice.reducer; 
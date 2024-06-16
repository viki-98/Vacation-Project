import { createSlice } from '@reduxjs/toolkit'
import { autoLogin, login, registration } from '../../services/AuthService'
import { removeTokens, setTokens } from '../../utils/utils'

interface IUserState {
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
		roleId: number
	} | null
	error: string | null
	isFetching: boolean
}

const initialState: IUserState = {
	user: null,
	error: null,
	isFetching: false,
}

export const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {
		logout: state => {
			state.isFetching = true
			state.user = null
			state.error = null
			removeTokens()
			state.isFetching = false
		},
		clearError: state => {
			state.error = null
		},
	},
	extraReducers: builder => {
		builder
			.addCase(registration.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(registration.fulfilled, (state, action) => {
				state.isFetching = false
				state.user = action.payload.user
				setTokens(action.payload.access_token, action.payload.refresh_token)
				state.error = null
			})
			.addCase(registration.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(login.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(login.fulfilled, (state, action) => {
				state.isFetching = false
				state.user = action.payload.user
				setTokens(action.payload.access_token, action.payload.refresh_token)
				state.error = null
			})
			.addCase(login.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(autoLogin.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(autoLogin.fulfilled, (state, action) => {
				state.isFetching = false
				state.user = action.payload.user
				state.error = null
			})
			.addCase(autoLogin.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
	},
})

export const { logout, clearError } = userSlice.actions

export default userSlice.reducer

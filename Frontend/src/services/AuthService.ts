import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface IAuthorizationResponse {
	access_token: string
	refresh_token: string
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
		roleId: number
	}
}

interface IAutoLoginResponse {
	user: {
		userId: number
		firstName: string
		lastName: string
		email: string
		roleId: number
	}
}

interface ILoginCredentials {
	email: string
	password: string
}

interface IRegistrationCredentials {
	firstName: string
	lastName: string
	email: string
	password: string
}

export const registration = createAsyncThunk<
	IAuthorizationResponse,
	IRegistrationCredentials
>('user/registration', async (credentials, { rejectWithValue }) => {
	try {
		const response = await api.post<IAuthorizationResponse>(
			'/registration',
			credentials
		)
		return response.data
	} catch (err) {
		return rejectWithValue(err.response.data)
	}
})

export const login = createAsyncThunk<
	IAuthorizationResponse,
	ILoginCredentials
>('user/login', async (credentials, { rejectWithValue }) => {
	try {
		const response = await api.post<IAuthorizationResponse>(
			'/login',
			credentials
		)
		return response.data
	} catch (err) {
		return rejectWithValue(err.response.data)
	}
})

export const autoLogin = createAsyncThunk<IAutoLoginResponse>(
	'user/auto-login',
	async (_, { rejectWithValue }) => {
		try {
			const response = await api.get<IAutoLoginResponse>('/auto-login')
			return response.data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

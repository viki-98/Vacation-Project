import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface IAddNewVacationCredentials {
	destination: string
	description: string
	startDate: string
	endDate: string
	price: number
	file: File[]
}

interface IUpdateVacationCredentials extends IAddNewVacationCredentials {
	id: string
}

interface IVacation {
	vacationId: number
	destination: string
	description: string
	startDate: Date
	endDate: Date
	price: number
	imageName?: string | null | undefined
	Followers: number[]
}

interface IGetAllVacationsResponse {
	vacationsArray: IVacation[]
	page: number
	pageSize: number
	totalCount: number
	totalPages: number
}

interface IGetAllVacationsParams {
	page: number
	pageSize: number
	sortBy?: string
	sortOrder?: string
}

export const addNewVacation = createAsyncThunk<
	void,
	IAddNewVacationCredentials & { file: File[] },
	{
		rejectValue: unknown
	}
>(
	'vacations/addNewVacation',
	async ({ file, ...credentials }, { rejectWithValue }) => {
		try {
			const formData = new FormData()

			Object.entries(credentials).forEach(([key, value]) => {
				formData.append(key, value)
			})

			formData.append('file', file[0])

			const response = await api.post<void>('/vacations/new', formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

			return response.data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const getAllVacations = createAsyncThunk<
	IGetAllVacationsResponse,
	IGetAllVacationsParams,
	{ rejectValue: unknown }
>('vacations/getAllVacations', async (params, { rejectWithValue }) => {
	try {
		const response = await api.get<IGetAllVacationsResponse>('/vacations', {
			params,
		})

		const transformedResponse: IGetAllVacationsResponse = {
			...response.data,
			vacationsArray: response.data.vacationsArray.map(vacation => ({
				...vacation,
				startDate: new Date(vacation.startDate),
				endDate: new Date(vacation.endDate),
			})),
		}

		return transformedResponse
	} catch (err) {
		return rejectWithValue(err.response.data)
	}
})

export const deleteVacation = createAsyncThunk<void, number>(
	'vacations/deleteVacation',
	async (id, { rejectWithValue }) => {
		try {
			await api.delete<void>(`/vacations/${id}`)
		} catch (error) {
			return rejectWithValue(err.response.data)
		}
	}
)

export const updateVacation = createAsyncThunk<
	void,
	IUpdateVacationCredentials & { file: File[] },
	{
		rejectValue: unknown
	}
>(
	'vacations/updateVacation',
	async ({ file, id, ...credentials }, { rejectWithValue }) => {
		try {
			const formData = new FormData()

			Object.entries(credentials).forEach(([key, value]) => {
				formData.append(key, value)
			})

			formData.append('file', file[0])

			const response = await api.put<void>(`/vacations/${id}`, formData, {
				headers: { 'Content-Type': 'multipart/form-data' },
			})

			return response.data
		} catch (err) {
			return rejectWithValue(err.response.data)
		}
	}
)

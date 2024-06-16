import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface IChartParams {
	displayNumber: number
}

interface IChartVacation {
	vacationId: number
	destination: string
	Followers: number[]
}

interface IGetAllVacationsForChartResponse {
	vacationsArray: IChartVacation[]
	totalCount: number
}

export const fetchVacationsForChart = createAsyncThunk<
	IGetAllVacationsForChartResponse,
	IChartParams,
	{
		rejectValue: unknown
	}
>(
	'chart/fetchVacationsForChart',
	async (params: IChartParams, { rejectWithValue }) => {
		try {
			const response = await api.get<IGetAllVacationsForChartResponse>(
				'/chart',
				{
					params,
				}
			)
			return response.data
		} catch (error) {
			return rejectWithValue({ error: 'Failed to fetch vacations for chart' })
		}
	}
)

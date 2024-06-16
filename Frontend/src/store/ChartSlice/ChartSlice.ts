import { createSlice } from '@reduxjs/toolkit'
import { fetchVacationsForChart } from '../../services/ChartService'

interface IChartVacation {
	vacationId: number
	destination: string
	Followers: number[]
}

interface ChartState {
	vacations: IChartVacation[]
	totalVacations: number
	displayNumber: number
	isFetching: boolean
	error: string | null
}

const initialState: ChartState = {
	vacations: [],
	totalVacations: 0,
	displayNumber: 5,
	isFetching: false,
	error: null,
}

const chartSlice = createSlice({
	name: 'chart',
	initialState,
	reducers: {
		setDisplayPortion(state, action) {
			state.displayNumber = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(fetchVacationsForChart.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(fetchVacationsForChart.fulfilled, (state, action) => {
				state.vacations = action.payload.vacationsArray.map(
					(vacation: IChartVacation) => ({
						vacationId: vacation.vacationId,
						destination: vacation.destination,
						Followers: vacation.Followers,
					})
				)
				state.totalVacations = action.payload.totalCount
				state.isFetching = false
				state.error = null
			})
			.addCase(fetchVacationsForChart.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
	},
})

export const { setDisplayPortion } = chartSlice.actions
export default chartSlice.reducer

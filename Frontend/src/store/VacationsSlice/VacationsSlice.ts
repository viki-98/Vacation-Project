import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import {
	addNewVacation,
	deleteVacation,
	getAllVacations,
	updateVacation,
} from '../../services/VacationsService'
import {
	followVacation,
	unFollowVacation,
} from '../../services/FollowersService'

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

interface IVacationsState {
	vacations: IVacation[]
	isFetching: boolean
	error: string | null
	page: number
	pageSize: number
	totalCount: number
	totalPages: number
	sortBy: string
	sortOrder: string
}

const initialState: IVacationsState = {
	vacations: [],
	isFetching: false,
	error: null,
	page: 1,
	pageSize: 8,
	totalCount: 0,
	totalPages: 1,
	sortBy: 'startDate',
	sortOrder: 'asc',
}

const vacationSlice = createSlice({
	name: 'vacations',
	initialState,
	reducers: {
		setPage(state, action: PayloadAction<number>) {
			state.page = action.payload
		},
		setSortOrder(state, action) {
			state.sortOrder = action.payload
		},
		setSortBy(state, action) {
			state.sortBy = action.payload
		},
	},
	extraReducers: builder => {
		builder
			.addCase(addNewVacation.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(addNewVacation.fulfilled, state => {
				state.isFetching = false
				state.error = null
			})
			.addCase(addNewVacation.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(getAllVacations.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(getAllVacations.fulfilled, (state, action) => {
				state.isFetching = false
				state.vacations = action.payload.vacationsArray.map(vacation => ({
					...vacation,
					startDate: new Date(vacation.startDate),
					endDate: new Date(vacation.endDate),
				}))
				state.page = action.payload.page
				state.pageSize = action.payload.pageSize
				state.totalCount = action.payload.totalCount
				state.totalPages = action.payload.totalPages
				state.error = null
			})
			.addCase(getAllVacations.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(deleteVacation.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(deleteVacation.fulfilled, (state, action) => {
				state.isFetching = false
				state.error = null
				state.vacations = state.vacations.filter(
					vacation => vacation.vacationId !== action.meta.arg
				)
				state.totalCount = state.totalCount - 1
			})
			.addCase(deleteVacation.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(updateVacation.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(updateVacation.fulfilled, state => {
				state.isFetching = false
				state.error = null
			})
			.addCase(updateVacation.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(followVacation.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(followVacation.fulfilled, state => {
				state.isFetching = false
				state.error = null
			})
			.addCase(followVacation.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
			.addCase(unFollowVacation.pending, state => {
				state.isFetching = true
				state.error = null
			})
			.addCase(unFollowVacation.fulfilled, state => {
				state.isFetching = false
				state.error = null
			})
			.addCase(unFollowVacation.rejected, (state, action) => {
				state.isFetching = false
				state.error = action.payload as string
			})
	},
})

export const { setPage, setSortBy, setSortOrder } = vacationSlice.actions

export default vacationSlice.reducer

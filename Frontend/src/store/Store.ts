import { configureStore } from '@reduxjs/toolkit'
import AuthReducer from './AuthSlice/AuthSlice'
import VacationsReducer from './VacationsSlice/VacationsSlice'
import ChartReducer from './ChartSlice/ChartSlice'

export const store = configureStore({
	reducer: {
		auth: AuthReducer,
		vacations: VacationsReducer,
		chart: ChartReducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware({ serializableCheck: false }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

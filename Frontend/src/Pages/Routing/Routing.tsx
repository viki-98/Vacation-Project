import { FC } from 'react'
import { Route, Routes } from 'react-router-dom'
import { AddVacationPage } from '../AddVacationPage/AddVacationPage'
import { HomePage } from '../HomePage/HomePage'
import { NotFoundPage } from '../NotFoundPage/NotFoundPage'
import { VacationsPage } from '../Vacations/VacationsPage'
import { EditVacationPage } from '../EditVacationPage/EditVacationPage'
import { ChartPage } from '../ChartPage/ChartPage'
import ProtectedRoute from '../../components/AdminRoute/AdminRoute'

export const Routing: FC = () => {
	return (
		<Routes>
			<Route index path='/' element={<HomePage />} />
			<Route path='/vacations' element={<VacationsPage />} />

			<Route
				path='/vacation/new'
				element={<ProtectedRoute>{<AddVacationPage />}</ProtectedRoute>}
			/>
			<Route
				path='/vacation/edit/:id'
				element={<ProtectedRoute>{<EditVacationPage />}</ProtectedRoute>}
			/>
			<Route
				path='/vacation/charts'
				element={<ProtectedRoute>{<ChartPage />}</ProtectedRoute>}
			/>

			<Route path='*' element={<NotFoundPage />} />
		</Routes>
	)
}

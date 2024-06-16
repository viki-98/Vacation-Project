import React from 'react'
import s from './EditVacationPage.module.scss'
import { AdminVacationForm } from '../../components/AdminVacationForm/AdminVacationForm'
import { useParams } from 'react-router-dom'
import { useAppSelector } from '../../hooks/TypedAppSelector'

export const EditVacationPage = () => {
	const { id } = useParams<{ id: string | undefined }>()
	const vacationData = useAppSelector(state => {
		const vacation = state.vacations.vacations.find(
			vacation => vacation.vacationId === +id
		)
		return vacation || null
	})

	const initialValues = vacationData
		? {
				destination: vacationData.destination,
				description: vacationData.description,
				startDate: vacationData.startDate.toISOString().split('T')[0],
				endDate: vacationData.endDate.toISOString().split('T')[0],
				price: vacationData.price,
				file: vacationData.imageName,
		  }
		: undefined

	return (
		<div className={s.vacationPageWrapper}>
			<AdminVacationForm
				initialValues={initialValues}
				notifyMessage={'Your vacation successfully updated'}
				isEdit={true}
				vacationId={id}
			/>
		</div>
	)
}

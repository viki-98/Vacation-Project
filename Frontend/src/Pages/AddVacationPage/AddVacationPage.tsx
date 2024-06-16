import { FC } from 'react'
import s from './AddVacationPage.module.scss'
import { AdminVacationForm } from '../../components/AdminVacationForm/AdminVacationForm'

export const AddVacationPage: FC = () => {
	return (
		<div className={s.vacationPageWrapper}>
			<AdminVacationForm notifyMessage={'Your vacation successfully created'} />
		</div>
	)
}

import { FC, useState } from 'react'
import HomePageBg from '../../assets/HomePageBackground.jpg'
import { Loader } from '../../components/Loader/Loader'
import LoginForm from '../../components/Login/Login'
import RegistrationForm from '../../components/Registration/Registration'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import s from './HomePage.module.scss'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { clearError } from '../../store/AuthSlice/AuthSlice'

export const HomePage: FC = () => {
	const [authType, setAuthType] = useState('login')
	const { isFetching } = useAppSelector(state => state.auth)
	const dispatch = useAppDispatch()

	return (
		<>
			{isFetching ? (
				<Loader />
			) : (
				<div className={s.homepage}>
					<div className={s.imageContainer}>
						<img src={HomePageBg} alt='Description' />
					</div>
					<div className={s.content}>
						<h1>Welcome to my vacations app!</h1>
						<div className={s.buttons}>
							<button
								className={`${s.auth_type_btn} ${
									authType === 'login' ? s.active : ''
								}`}
								onClick={() => {
									setAuthType('login')
									dispatch(clearError())
								}}
							>
								Login
							</button>
							<button
								onClick={() => {
									setAuthType('registration')
									dispatch(clearError())
								}}
								className={`${s.auth_type_btn} ${
									authType === 'registration' ? s.active : ''
								}`}
							>
								Registration
							</button>
						</div>
						{authType === 'login' ? <LoginForm /> : <RegistrationForm />}
					</div>
				</div>
			)}
		</>
	)
}

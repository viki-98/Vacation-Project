import { FC, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import { registration } from '../../services/AuthService'
import { onErrorNotify, onSuccessNotify } from '../../services/NotifyService'
import { Button } from '../Button/Button'
import s from './Registration.module.scss'

interface IRegistrationFormValues {
	firstName: string
	lastName: string
	email: string
	password: string
}

const RegistrationForm: FC = () => {
	const dispatch = useAppDispatch()
	const navigate = useNavigate()
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<IRegistrationFormValues>({ mode: 'onChange' })

	const { user, error } = useAppSelector(state => state.auth)

	const onSubmit = async (formData: IRegistrationFormValues) => {
		await dispatch(registration(formData))
	}

	useEffect(() => {
		if (user) {
			onSuccessNotify(`Welcome ${user.firstName}!`, 'Authorization success')
			navigate('/vacations')
		} else if (error) {
			onErrorNotify(error, 'Error')
		}
	}, [user, error, navigate])

	return (
		<form className={s.registrationForm} onSubmit={handleSubmit(onSubmit)}>
			<input
				className={`${s.loginInput} ${errors.firstName ? s.input_error : ''}`}
				type='text'
				{...register('firstName', { required: 'firstName is required' })}
				placeholder='FirstName'
			/>
			{/* {errors.firstName && (
				<span className={s.inputErrorMsg}>{errors.firstName.message}</span>
			)} */}
			<input
				className={`${s.loginInput} ${errors.lastName ? s.input_error : ''}`}
				type='text'
				{...register('lastName', { required: 'lastName is required' })}
				placeholder='LastName'
			/>
			{/* {errors.lastName && (
				<span className={s.inputErrorMsg}>{errors.lastName.message}</span>
			)} */}
			<input
				className={`${s.loginInput} ${errors.email ? s.input_error : ''}`}
				type='email'
				{...register('email', {
					required: 'Email is required',
					pattern: {
						value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
						message: 'Invalid email address',
					},
				})}
				placeholder='Enter email'
			/>
			{/* {errors.email && (
				<span className={s.inputErrorMsg}>{errors.email.message}</span>
			)} */}
			<input
				className={`${s.loginInput} ${errors.password ? s.input_error : ''}`}
				type='password'
				{...register('password', {
					required: 'Password is required',
					minLength: {
						value: 6,
						message: 'The password must be at least 6 characters long',
					},
				})}
				placeholder='Enter password'
			/>
			{/* {errors.password && (
				<span className={s.inputErrorMsg}>{errors.password.message}</span>
			)} */}
			<Button type='submit'>Registration</Button>
		</form>
	)
}

export default RegistrationForm

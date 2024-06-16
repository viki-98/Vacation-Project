import { ChangeEvent, FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { useForm } from 'react-hook-form'
import { Button } from '../Button/Button'
import s from './AdminVacationForm.module.scss'
import { addNewVacation, updateVacation } from '../../services/VacationsService'
import { useNavigate } from 'react-router-dom'
import { onErrorNotify, onSuccessNotify } from '../../services/NotifyService'
import defaultAvatarImg from '../../assets/defaultAvatarImg.png'
import { unwrapResult } from '@reduxjs/toolkit'

interface IAddNewVacationFormValues {
	destination: string
	description: string
	startDate: string
	endDate: string
	price: number
	file: File[]
}

interface IAdminVacationFormProps {
	notifyMessage: string
	initialValues?: Partial<IAddNewVacationFormValues>
	isEdit?: boolean
	vacationId?: string
}

export const AdminVacationForm: FC<IAdminVacationFormProps> = ({
	notifyMessage,
	initialValues,
	isEdit,
	vacationId,
}) => {
	const [preview, setPreview] = useState<string | ArrayBuffer | null>(
		defaultAvatarImg
	)
	const [inputCharCount, setCharCount] = useState({
		destination: 0,
		description: 0,
	})
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors },
	} = useForm<IAddNewVacationFormValues>({ mode: 'onChange' })

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target

		setCharCount(prevCharCount => ({
			...prevCharCount,
			[name]: value.length,
		}))
	}

	const onFormSubmit = async (formData: IAddNewVacationFormValues) => {
		try {
			let resultAction
			if (isEdit && vacationId) {
				resultAction = await dispatch(
					updateVacation({ id: vacationId, ...formData })
				)
			} else {
				resultAction = await dispatch(addNewVacation({ ...formData }))
			}

			unwrapResult(resultAction)

			onSuccessNotify(notifyMessage, 'Success')
			navigate('/vacations')
		} catch (err) {
			console.log(err)
			onErrorNotify(err, 'Error')
		}
	}

	const handleFilePreview = (e: ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0]

		if (!file) {
			return
		}

		const urlImage = URL.createObjectURL(file)
		setPreview(urlImage)
	}

	useEffect(() => {
		if (isEdit && !initialValues) {
			navigate('*');
		}

		if (initialValues) {
			setValue('destination', initialValues.destination || '')
			setCharCount(prevCharCount => ({
				...prevCharCount,
				destination: (initialValues?.destination || '').length,
			}))
			setValue('description', initialValues.description || '')
			setCharCount(prevCharCount => ({
				...prevCharCount,
				description: (initialValues?.description || '').length,
			}))
			setValue('startDate', initialValues.startDate || '')
			setValue('endDate', initialValues.endDate || '')
			setValue('price', initialValues.price || 0)
			if (initialValues.file && initialValues.file[0]) {
				const urlImage = `http://localhost:5000/uploads/${initialValues.file}`
				setPreview(urlImage)
			}
		}
	}, [initialValues, setValue])

	return (
		<form className={s.vacationForm} onSubmit={handleSubmit(onFormSubmit)}>
			<div className={s.inputWrapper}>
				<input
					className={`${s.vacationInput} ${
						errors.destination ? s.input_error : ''
					} ${s.destCounter}`}
					type='text'
					{...register('destination', {
						required: 'destination is required',
						maxLength: 50,
						onChange: onInputChange,
					})}
					placeholder='Destination'
				/>
				<span>{inputCharCount.destination} / 50</span>
			</div>
			{/* {errors.destination && (
				<span className={s.inputErrorMsg}>{errors.destination.message}</span>
			)} */}

			<div className={s.inputWrapper}>
				<input
					className={`${s.vacationInput} ${
						errors.description ? s.input_error : ''
					} ${s.descrCounter}`}
					type='text'
					{...register('description', {
						required: 'description is required',
						maxLength: 180,
						onChange: onInputChange,
					})}
					placeholder='Description'
				/>
				<span>{inputCharCount.description} / 180</span>
			</div>
			{/* {errors.description && (
				<span className={s.inputErrorMsg}>{errors.description.message}</span>
			)} */}

			<input
				className={`${s.vacationInput} ${
					errors.startDate ? s.input_error : ''
				}`}
				type='date'
				{...register('startDate', { required: 'startDate is required' })}
				placeholder='Start Date'
			/>
			{/* {errors.startDate && (
				<span className={s.inputErrorMsg}>{errors.startDate.message}</span>
			)} */}

			<input
				className={`${s.vacationInput} ${errors.endDate ? s.input_error : ''}`}
				type='date'
				{...register('endDate', { required: 'endDate is required' })}
				placeholder='End Date'
			/>
			{/* {errors.endDate && (
				<span className={s.inputErrorMsg}>{errors.endDate.message}</span>
			)} */}

			<input
				className={`${s.vacationInput} ${errors.price ? s.input_error : ''}`}
				type='number'
				{...register('price', {
					required: 'price is required',
					valueAsNumber: true,
				})}
				placeholder='Price'
			/>
			{/* {errors.price && (
				<span className={s.inputErrorMsg}>{errors.price.message}</span>
			)} */}

			<div className={s.fileInputWrapper}>
				<div className={s.fileUpload}>
					<label>
						<input
							type='file'
							{...register('file', {
								onChange(event) {
									handleFilePreview(event)
								},
							})}
						/>
						<span>Select Image</span>
					</label>
				</div>
				<div className={s.imgPreview}>
					<img src={preview} alt='' />
				</div>
			</div>
			{/* {errors.file && (
				<span className={s.inputErrorMsg}>{errors.file.message}</span>
			)} */}
			<Button type='submit'>Save</Button>
		</form>
	)
}

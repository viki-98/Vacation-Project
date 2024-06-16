import {FC, useEffect, useState} from 'react'
import {useForm} from 'react-hook-form'
import {useNavigate} from 'react-router-dom'
import {useAppDispatch} from '../../hooks/TypedAppDispatch'
import {useAppSelector} from '../../hooks/TypedAppSelector'
import {login} from '../../services/AuthService'
import {onErrorNotify, onSuccessNotify} from '../../services/NotifyService'
import {Button} from '../Button/Button'
import s from './Login.module.scss'

interface ILoginFormValues {
    email: string
    password: string
}

const LoginForm: FC = () => {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: {errors},
    } = useForm<ILoginFormValues>({mode: 'onChange'})

    const {user, error} = useAppSelector(state => state.auth)

    const onSubmit = async (formData: ILoginFormValues) => {
        await dispatch(login(formData))
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
        <form className={s.loginForm} onSubmit={handleSubmit(onSubmit)}>
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

            <Button type='submit'>Login</Button>
        </form>
    )
}

export default LoginForm

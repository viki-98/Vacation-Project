import { useCallback, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { autoLogin } from '../services/AuthService'
import { getTokensFromStorage } from '../utils/utils'
import { useAppDispatch } from './TypedAppDispatch'
import { useAppSelector } from './TypedAppSelector'

function useVerifyLoggedIn() {
	const navigate = useNavigate()
	const dispatch = useAppDispatch()
	const { user } = useAppSelector(state => state.auth)

	const handleAutoLogin = useCallback(() => {
		const { accessToken, refreshToken } = getTokensFromStorage()
		if (!accessToken && !refreshToken) {
			navigate('/')
		} else if (!user) {
			dispatch(autoLogin())
		}
	}, [dispatch, navigate])

	useEffect(() => {
		handleAutoLogin()
	}, [handleAutoLogin])

	return useAppSelector(state => state.auth.user)
}

export default useVerifyLoggedIn

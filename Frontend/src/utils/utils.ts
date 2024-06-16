const setTokens = (access_token: string, refresh_token: string) => {
	removeTokens()
	localStorage.setItem('accessToken', access_token)
	document.cookie = `refreshToken=${refresh_token}; path=/`
}

const removeTokens = () => {
	localStorage.removeItem('accessToken')
	document.cookie =
		'refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
}

const getTokensFromStorage = () => {
	const accessToken = localStorage.getItem('accessToken')
	const refreshToken = document.cookie
		.split(';')
		.find(c => c.trim().startsWith('refreshToken='))
		?.split('=')[1]
	return { accessToken, refreshToken }
}

export { getTokensFromStorage, removeTokens, setTokens }

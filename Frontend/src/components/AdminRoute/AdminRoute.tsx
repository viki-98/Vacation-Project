import React, { FC } from 'react'
import useVerifyAdmin from '../../hooks/useVerifyAdmin'
import { Loader } from '../Loader/Loader'
import { NotFoundPage } from '../../Pages/NotFoundPage/NotFoundPage'

const ProtectedRoute: FC<{ children: React.ReactElement }> = ({ children }) => {
	const { isAdmin, isFetching } = useVerifyAdmin()

	if (isFetching) {
		return <Loader />
	}

	return isAdmin ? children : <NotFoundPage />
}

export default ProtectedRoute

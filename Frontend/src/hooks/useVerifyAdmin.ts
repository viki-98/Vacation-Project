import { useAppSelector } from './TypedAppSelector'

const useVerifyAdmin = () => {
	const { user, isFetching } = useAppSelector(state => state.auth)

	const isAdmin = user?.roleId === 1

	return { isAdmin, isFetching }
}

export default useVerifyAdmin

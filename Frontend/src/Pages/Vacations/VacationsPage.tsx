import { FC, useEffect } from 'react'
import { VacationCard } from '../../components/VacationCard/VacationCard'
import s from './VacationsPage.module.scss'
import { Pagination } from '../../components/Pagination/Pagination'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import { getAllVacations } from '../../services/VacationsService'
import {
	setPage,
	setSortBy,
	setSortOrder,
} from '../../store/VacationsSlice/VacationsSlice'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { onErrorNotify } from '../../services/NotifyService'

export const VacationsPage: FC = () => {
	const dispatch = useAppDispatch()
	const { vacations, page, pageSize, totalPages, sortBy, sortOrder } =
		useAppSelector(state => state.vacations)
	const { user } = useAppSelector(state => state.auth)

	const sortByOptions = [
		{ value: 'price', title: 'Sort by Price' },
		{ value: 'startDate', title: 'Sort by Start Date' },
		{ value: 'endDate', title: 'Sort by End Date' },
	]

	const sortOrderOptions = [
		{ value: 'asc', title: '↑' },
		{ value: 'desc', title: '↓' },
	]

	useEffect(() => {
		dispatch(getAllVacations({ page, pageSize, sortBy, sortOrder }))
	}, [dispatch, page, sortBy, sortOrder])

	const handlePageChange = (newPage: number) => {
		dispatch(setPage(newPage))
	}

	const handleDeleteLastVacation = () => {
		if (vacations.length === 1 && page > 1) {
			dispatch(setPage(page - 1))
		}
		dispatch(getAllVacations({ page, pageSize, sortBy, sortOrder }))
	}

	const handleLoadFollowersFromTheServer = async () => {
		try {
			await dispatch(getAllVacations({ page, pageSize, sortBy, sortOrder }))
		} catch (error) {
			onErrorNotify(error.message, 'An error has occurred')
		}
	}

	const handleSortChange = (sortField: string) => {
		dispatch(setSortBy(sortField))
	}

	const handleOrderChange = (order: 'asc' | 'desc') => {
		dispatch(setSortOrder(order))
	}

	// if (isFetching) {
	// 	return <Loader />
	// }

	return (
		<>
			<div className={s.sortBar}>
				{sortByOptions.map(option => {
					return (
						<div
							key={option.value}
							className={`${s.sortOption} ${
								sortBy === option.value ? s.active : ''
							}`}
							onClick={() => handleSortChange(option.value)}
						>
							{option.title}
						</div>
					)
				})}
				{sortOrderOptions.map(option => {
					return (
						<div
							key={option.value}
							className={`${s.sortOption} ${
								sortOrder === option.value ? s.active : ''
							}`}
							onClick={() => handleOrderChange(option.value)}
						>
							{option.title}
						</div>
					)
				})}
			</div>

			{vacations.length === 0 ? (
				<div className={s.EmptyVacationPage}>
					There are no available vacations
				</div>
			) : (
				<div className={s.vacationPageWrapper}>
					{vacations &&
						vacations.map(vacation => (
							<VacationCard
								key={vacation.vacationId}
								onDelete={handleDeleteLastVacation}
								vacation={vacation}
								userId={user?.userId}
								onLoadFollowers={handleLoadFollowersFromTheServer}
							/>
						))}
				</div>
			)}

			<Pagination
				page={page}
				handlePageChange={handlePageChange}
				totalPages={totalPages}
			/>
		</>
	)
}

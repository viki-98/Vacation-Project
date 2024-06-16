import React, { FC } from 'react'
import s from './Pagination.module.scss'

interface IPaginationProps {
	page: number
	handlePageChange: (newPage: number) => void
	totalPages: number
}

export const Pagination: FC<IPaginationProps> = ({
	page,
	totalPages,
	handlePageChange,
}) => {
	const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1)
	return (
		<>
			{totalPages > 1 ? (
				<div className={s.paginationWrapper}>
					<button
						className={s.paginationBtn}
						onClick={() => handlePageChange(page - 1)}
						disabled={page === 1}
					>
						&lt;
					</button>
					{pageNumbers.map(pageNumber => (
						<button
							className={s.paginationBtn}
							key={pageNumber}
							onClick={() => handlePageChange(pageNumber)}
							disabled={pageNumber === page}
						>
							{pageNumber}
						</button>
					))}
					<button
						className={s.paginationBtn}
						onClick={() => handlePageChange(page + 1)}
						disabled={page === totalPages}
					>
						&gt;
					</button>
				</div>
			) : (
				<></>
			)}
		</>
	)
}

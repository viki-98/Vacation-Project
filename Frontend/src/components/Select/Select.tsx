import React, { FC } from 'react'
import s from './Select.module.scss'

interface ISelectProps {
	options: { value: number | string; title: string }[]
	value: number | string
	onChange: (value: number | string) => void
}

export const Select: FC<ISelectProps> = ({ options, value, onChange }) => {
	const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedValue =
			e.target.value === 'All' ? 'All' : parseInt(e.target.value, 10)
		onChange(selectedValue)
	}

	return (
		<div className={s.controls}>
			<select className={s.styledSelect} value={value} onChange={handleChange}>
				{options.map(option => (
					<option key={option.value} value={option.value}>
						{option.title}
					</option>
				))}
			</select>
		</div>
	)
}

import { FC, useEffect, useState } from 'react'
import s from './ChartPage.module.scss'
import { Bar } from 'react-chartjs-2'
import {
	ChartData,
	Chart,
	LinearScale,
	CategoryScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from 'chart.js'
import { useAppSelector } from '../../hooks/TypedAppSelector'
import { useAppDispatch } from '../../hooks/TypedAppDispatch'
import { fetchVacationsForChart } from '../../services/ChartService'
import { Select } from '../../components/Select/Select'

Chart.register(LinearScale, CategoryScale, BarElement, Title, Tooltip, Legend)

export const ChartPage: FC = () => {
	const dispatch = useAppDispatch()
	const { vacations, totalVacations } = useAppSelector(state => state.chart)
	const [chartData, setChartData] = useState<ChartData<
		'bar',
		(number | null)[],
		string
	> | null>(null)
	const [displayNumber, setDisplayPortion] = useState<number | string>(5)
	const Portions = [
		{ value: 5, title: '5' },
		{ value: 10, title: '10' },
		{ value: 'All', title: 'All' },
	]

	useEffect(() => {
		const fetchData = () => {
			const portion =
				displayNumber === 'All' ? totalVacations : Number(displayNumber)
			dispatch(fetchVacationsForChart({ displayNumber: portion }))
		}

		fetchData()

		const interval = setInterval(() => {
			fetchData()
		}, 10000)

		return () => clearInterval(interval)
	}, [dispatch, displayNumber, totalVacations])

	useEffect(() => {
		if (vacations.length > 0) {
			const chartData: ChartData<'bar', (number | null)[], string> = {
				labels: vacations.map(vacation => vacation.destination),
				datasets: [
					{
						label: 'Number of Followers',
						data: vacations.map(vacation => vacation.Followers.length),
						backgroundColor: 'rgba(75, 192, 192, 0.6)',
						borderColor: 'rgba(75, 192, 192, 1)',
						borderWidth: 1,
					},
				],
			}
			setChartData(chartData)
		}
	}, [vacations])

	return (
		<div className={s.chartContainer}>
			<div className={s.chart}>
				{chartData && (
					<Bar
						data={chartData}
						options={{
							responsive: true,
							scales: {
								y: {
									type: 'linear',
									beginAtZero: true,
									title: { text: 'Number of Followers', display: true },
								},
								x: {
									title: { text: 'Destination', display: true },
								},
							},
						}}
					/>
				)}
			</div>
			<div className={s.controls}>
				<div>Number of vacations</div>
				<Select
					options={Portions}
					value={displayNumber}
					onChange={setDisplayPortion}
				/>
				<div>Total vacations: {totalVacations}</div>
			</div>
		</div>
	)
}

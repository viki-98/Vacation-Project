import { FC, useEffect, useRef, useState } from 'react'
import { CSVLink } from 'react-csv'
import { fetchFollowersCsv } from '../../services/CsvService'
import s from './Csv.module.scss'

interface ICSVState {
	destination: string
	vacationId: number
	followersCount: number
}

export const Csv: FC = () => {
	const [csvData, setCSVData] = useState<ICSVState[]>([])
	const [dataReady, setDataReady] = useState(false)
	const csvLinkRef = useRef<CSVLink>(null)

	const handleClick = async () => {
		try {
			const newData = await fetchFollowersCsv()
			setCSVData(newData)
			setDataReady(true)
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		if (dataReady && csvLinkRef.current) {
			csvLinkRef.current.link.click()
			setDataReady(false)
		}
	}, [dataReady])

	const headers = [
		{ label: 'Destination', key: 'destination' },
		{ label: 'Followers', key: 'followersCount' },
	]

	return (
		<>
			<button className={s.link} onClick={handleClick}>
				Csv
			</button>
			{csvData.length > 0 && (
				<CSVLink
					className={s.CsvLink}
					data={csvData}
					headers={headers}
					filename={'Vacation Followers.csv'}
					ref={csvLinkRef}
				></CSVLink>
			)}
		</>
	)
}

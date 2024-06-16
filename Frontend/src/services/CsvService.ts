import api from '../api/axios'

interface ICSVState {
	destination: string
	vacationId: number
	followersCount: number
}

export const fetchFollowersCsv = async (): Promise<ICSVState[]> => {
	try {
		const response = await api.get<ICSVState[]>('/csv')
		return response.data
	} catch (error) {
		throw new Error('Failed to fetch followers CSV')
	}
}

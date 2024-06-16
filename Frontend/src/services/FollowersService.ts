import { createAsyncThunk } from '@reduxjs/toolkit'
import api from '../api/axios'

interface FollowerPayload {
	userId: number | undefined
	vacationId: number
}

export const followVacation = createAsyncThunk<
	void,
	FollowerPayload,
	{
		rejectValue: unknown
	}
>('vacations/followVacation', async (followerData, { rejectWithValue }) => {
	try {
		const response = await api.post('vacations/follow', followerData)
		return response.data
	} catch (err) {
		return rejectWithValue(err.response.data)
	}
})

export const unFollowVacation = createAsyncThunk<
	void,
	FollowerPayload,
	{
		rejectValue: unknown
	}
>('vacations/unFollowVacation', async (followerData, { rejectWithValue }) => {
	try {
		const response = await api.post('vacations/unfollow', followerData)
		return response.data
	} catch (error) {
		return rejectWithValue({ error: 'Failed to unlike vacation' })
	}
})

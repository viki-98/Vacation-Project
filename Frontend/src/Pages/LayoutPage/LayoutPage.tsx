import { FC } from 'react'
import { Header } from '../../components/Header/Header'
import useVerifyLoggedIn from '../../hooks/useVerifyLoggedIn'
import { Routing } from '../Routing/Routing'

export const Layout: FC = () => {
	useVerifyLoggedIn()
	return (
		<div>
			<Header />
			<main>
				<Routing />
			</main>
		</div>
	)
}

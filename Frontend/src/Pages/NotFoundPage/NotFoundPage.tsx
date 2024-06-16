import { FC } from 'react'
import { Link } from 'react-router-dom'
import bgImg from '../../assets/notFoundImg.png'
import { Button } from '../../components/Button/Button'
import s from './NotFoundPage.module.scss'

export const NotFoundPage: FC = () => {
	return (
		<>
			<div className={s.container}>
				<div className={s.imageContainer}>
					<img src={bgImg} alt='notFoundPageImg' />
				</div>
				<div className={s.titleGroup}>
					<div className={s.title}>Page Not Found:(</div>
					<Button type='button'>
						<Link className={s.btn} to='/vacations'>
							Move to vacations page
						</Link>
					</Button>
				</div>
			</div>
		</>
	)
}

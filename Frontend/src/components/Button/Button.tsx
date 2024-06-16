import s from './Button.module.scss'

interface IButton {
	children: React.ReactNode
	onClick?: () => void
	type?: 'button' | 'submit' | 'reset'
	className?: string
}

export const Button = ({
	children,
	onClick,
	type = 'button',
	className,
}: IButton) => {
	return (
		<button
			className={`${s.gradientButton} ${className}`}
			onClick={onClick}
			type={type}
		>
			{children}
		</button>
	)
}

import { toast } from '@/components/ui/use-toast'
import { CheckCircle, Info, XOctagon } from 'lucide-react'

interface ToastMessageProps {
	message: string
	type?: 'success' | 'error' | 'default'
}

const ToastMessage: React.FC<ToastMessageProps> = ({
	message,
	type = 'default',
}) => {
	const iconColor =
		type === 'success'
			? 'text-light_theme_green dark:text-dark_theme_green'
			: type === 'default'
				? 'text-light_theme_yellow dark:text-dark_theme_yellow'
				: 'text-light_theme_red dark:text-dark_theme_red'

	return (
		<div className='w-auto rounded-md flex p-1 justify-start items-center'>
			{type === 'success' ? (
				<>
					<CheckCircle className={`text-2xl ${iconColor}`} />
				</>
			) : type === 'default' ? (
				<>
					<Info className={`text-2xl ${iconColor}`} />
				</>
			) : (
				<>
					<XOctagon className={`text-2xl ${iconColor}`} />
				</>
			)}
			<p className='ml-4 text-light_theme_font_lighter dark:text-dark_theme_font_lighter w-auto text-wrap'>
				{message || '-'}
			</p>
		</div>
	)
}

export const showToast = (
	message: string,
	type: 'success' | 'error' | 'default' = 'default',
) => {
	toast({
		className: 'border-light_theme_border dark:border-dark_theme_border bg-light_theme_table dark:bg-dark_theme_table',
		description: (
			<ToastMessage
				message={message}
				type={type}
			/>
		),
	})
}

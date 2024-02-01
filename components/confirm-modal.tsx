'use client';

import { Icons } from './icons';
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from './ui/alert-dialog';

interface ConfirmModalProps {
	children: React.ReactNode;
	onConfirm: () => void;
	disabled?: boolean;
	header: string;
	description?: string;
}

export const ConfirmModal = ({
	children,
	onConfirm,
	disabled,
	header,
	description,
}: ConfirmModalProps) => {
	const handleConfirm = () => {
		onConfirm();
	};
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<AlertDialogTitle>{header}</AlertDialogTitle>
					<AlertDialogDescription>{description}</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogCancel>Cancel</AlertDialogCancel>
					<AlertDialogAction disabled={disabled} onClick={handleConfirm}>
						{disabled && (
							<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
						)}
						Confirm
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
};

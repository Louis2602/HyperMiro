'use client';

import { FormEventHandler, useEffect, useState } from 'react';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogClose,
	DialogFooter,
	DialogTitle,
	DialogHeader,
} from '../ui/dialog';
import { useRenameModal } from '@/store/user-rename-modal';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { api } from '@/convex/_generated/api';
import { toast } from 'sonner';
import { Icons } from '../icons';

export const RenameModal = () => {
	const { mutate: renameBoard, pending } = useApiMutation(api.board.update);
	const { isOpen, onClose, initialValues } = useRenameModal();
	const [title, setTitle] = useState(initialValues.title);

	useEffect(() => {
		setTitle(initialValues.title);
	}, [initialValues.title]);

	const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault();

		renameBoard({
			id: initialValues.id,
			title,
		})
			.then(() => {
				toast.success('Board renamed');
				onClose();
			})
			.catch((err) => toast.error(`Failed to rename board: ${err}`));
	};

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Edit board title</DialogTitle>
				</DialogHeader>
				<DialogDescription>Enter a new title for this board</DialogDescription>
				<form onSubmit={onSubmit} className='space-y-4'>
					<Input
						disabled={pending}
						required
						maxLength={60}
						onChange={(e) => setTitle(e.target.value)}
						placeholder='Board title'
					/>
					<DialogFooter>
						<DialogClose>
							<Button type='button' variant='outline'>
								Cancel
							</Button>
						</DialogClose>
						<Button disabled={pending} type='submit'>
							{pending && (
								<Icons.spinner className='mr-2 h-4 w-4 animate-spin' />
							)}
							Save
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

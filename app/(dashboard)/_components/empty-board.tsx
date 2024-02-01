'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useMutation } from 'convex/react';
import { api } from '@/convex/_generated/api';
import { useOrganization } from '@clerk/nextjs';
import { useApiMutation } from '@/hooks/use-api-mutation';
import { Icons } from '@/components/icons';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';

export const EmptyBoard = () => {
	const router = useRouter();
	const { organization } = useOrganization();
	const { mutate: createBoard, pending } = useApiMutation(api.board.create);

	const handleCreateBoard = () => {
		if (!organization) return;
		createBoard({
			orgId: organization.id,
			title: 'Untitled',
		})
			.then((id) => {
				toast.success('Board created');
				router.push(`/board/${id}`);
			})
			.catch(() => toast.error('Failed to create board'));
	};
	return (
		<div className='h-full flex flex-col items-center justify-center'>
			<Image src='/note.svg' height={110} width={110} alt='Empty' />
			<h2 className='text-2xl font-semibold mt-6'>Create your first board!</h2>
			<p className='text-muted-foreground text-sm mt-2'>
				Start by creating a board for your organization
			</p>
			<div className='mt-6' onClick={handleCreateBoard}>
				<Button disabled={pending} size='lg'>
					{pending && <Icons.spinner className='mr-2 h-4 w-4 animate-spin' />}
					Create board
				</Button>
			</div>
		</div>
	);
};

import React, {useCallback, useRef} from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import {Button, DialogActions, DialogContent, DialogContentText, TextField} from '@mui/material';
import type {IFormPage} from '@/types/IFormPage';


type TProps = Readonly<{
	formPage: IFormPage
	onClose: (newName: string) => void;
	showDialog: boolean;
}>;


export default function NavButtonMenuRenameDialog (props: TProps) {
	const {
		formPage,
		onClose,
		showDialog,
	} = props;

	const refForm = useRef<HTMLFormElement>(null);

	// Something in e7d84489 broke regular "submit" and onSubmit, but onClick also works
	// e.g., <form onSubmit={handleSubmit}>
	// const handleSubmit = useCallback((event: React.FormEvent<HTMLFormElement>) => {
	// 	event.stopPropagation();
	// 	event.preventDefault();
	// 	const formData = new FormData(event.currentTarget as HTMLFormElement);
	// 	const formJson = Object.fromEntries((formData).entries());
	// 	onClose(formJson.name as string);
	// }, []);

	const renamePage = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
		event.preventDefault();
		if (refForm.current) {
			const formData = new FormData(refForm.current);
			const formJson = Object.fromEntries((formData).entries());
			onClose(formJson.name as string);
		} else {
			onClose('');
		}
	}, [refForm]);

	return (
		<Dialog open={showDialog} onClose={onClose}>
			<DialogTitle>Rename "{formPage?.name ?? ''}"</DialogTitle>
			<DialogContent sx={{ paddingBottom: 0 }}>
				<DialogContentText>
					Please enter a unique name for this form page.
				</DialogContentText>
				<form ref={refForm}>
					{/* autoFocus doesn't seem to work 😖 */}
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="name"
						label="New page name"
						type="text"
						fullWidth
						variant="filled"
						defaultValue={formPage?.name ?? ''}
					/>
					<DialogActions>
						<Button onClick={() => onClose('')}>Cancel</Button>
						<Button onClick={renamePage} type="submit">Rename</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
}

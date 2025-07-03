import React from 'react';
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

	const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		const formData = new FormData(event.currentTarget);
		const formJson = Object.fromEntries((formData).entries());
		onClose(formJson.name as string);
	};

	return (
		<Dialog open={showDialog} onClose={onClose}>
			<DialogTitle>Rename "{formPage?.name ?? ''}"</DialogTitle>
			<DialogContent sx={{ paddingBottom: 0 }}>
				<DialogContentText>
					Please enter a unique name for this form page.
				</DialogContentText>
				<form onSubmit={handleSubmit}>
					<TextField
						autoFocus
						required
						margin="dense"
						id="name"
						name="name"
						label="Page Name"
						type="text"
						fullWidth
						variant="standard"
					/>
					<DialogActions>
						<Button onClick={() => onClose('')}>Cancel</Button>
						<Button type="submit">Rename</Button>
					</DialogActions>
				</form>
			</DialogContent>
		</Dialog>
	);
}

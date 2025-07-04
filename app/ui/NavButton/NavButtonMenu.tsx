import React, {Context, useContext, useState} from 'react';
import {FormContext, IFormContext} from '@/context/FormContext';
import Divider from '@mui/material/Divider';
import IconNavMenuFlag from '@/ui/NavButton/IconNavMenuFlag';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NavButtonMenuItem from '@/ui/NavButton/NavButtonMenuItem';
import NavButtonMenuRenameDialog from '@/ui/NavButton/NavButtonMenuRenameDialog';
import type {IFormPage} from '@/types/IFormPage';

import styled from '@emotion/styled';
import MuiIconContentPaste from '@mui/icons-material/ContentPaste';
import MuiIconDeleteOutline from '@mui/icons-material/DeleteOutline';
import MuiIconDriveFileRenameOutline from '@mui/icons-material/DriveFileRenameOutline';
import MuiIconFileCopyOutlined from '@mui/icons-material/FileCopyOutlined';
import MuiIconMoreVert from '@mui/icons-material/MoreVert';

type TProps = Readonly<{
	formPage: IFormPage;
}>;


const StyledListHeader = styled(ListSubheader)({
	backgroundImage: 'var(--Paper-overlay)',
});

export default function NavButtonMenu (props: TProps) {
	const {
		formPage,
	} = props;

	const formContext = useContext(FormContext as Context<IFormContext>);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const [dialogIsOpen, setDialogIsOpen] = useState(false);
	const menuIsOpen = Boolean(anchorEl);

	const handleRenameDialogClose = (newName: string) => {
		setDialogIsOpen(false);

		if (newName) {
			const pageIndex = formContext.getPageIndexByID(formPage.id);

			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formContext.formPages));
			modifiedPages[pageIndex].name = newName;
			formContext.updatePages(modifiedPages);
		} else {
			console.warn('Invalid name:', newName);
		}
	};

	const handleMenuClose = () => {
		setAnchorEl(null);
	};

	const actionDelete = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext.deletePage(formPage);
		handleMenuClose();
	}

	const actionDuplicate = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext.addPage(formPage, formPage);
		handleMenuClose();
	}

	const actionRename = (event: React.MouseEvent) => {
		event.stopPropagation();
		setDialogIsOpen(true);
		handleMenuClose();
	}

	const actionSetAsFirst = () => {
		const pageIndex = formContext.getPageIndexByID(formPage.id);

		// Create a copy, since splice edits in place
		const modifiedPages = JSON.parse(JSON.stringify(formContext.formPages));

		modifiedPages.splice(pageIndex, 1);
		modifiedPages.splice(1, 0, formPage);
		formContext.updatePages(modifiedPages);
	}

	const menuOpen = (event: React.MouseEvent) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget as HTMLElement);
	};

	return (
		<>
			<MuiIconMoreVert className="hs-tooltip [--trigger:click] inline-block" onClick={menuOpen} />

			<NavButtonMenuRenameDialog
				formPage={formPage}
				onClose={handleRenameDialogClose}
				showDialog={dialogIsOpen}
			/>

			<Menu
				sx={{ width: 320, maxWidth: '100%' }}
				open={menuIsOpen}
				anchorEl={anchorEl}
				onClose={handleMenuClose}
			>
				<MenuList>
					<StyledListHeader>Settings</StyledListHeader>

					<Divider />

					<NavButtonMenuItem
						onClick={actionSetAsFirst}
						icon={IconNavMenuFlag}
						label="Set as first page"
					/>

					<NavButtonMenuItem
						onClick={actionRename}
						icon={MuiIconDriveFileRenameOutline}
						label="Rename"
					/>

					{/* I'm not sure what "copy" does without paste, so for now, it is the same as Duplicate */}
					<NavButtonMenuItem
						onClick={actionDuplicate}
						icon={MuiIconContentPaste}
						label="Copy"
					/>

					<NavButtonMenuItem
						onClick={actionDuplicate}
						icon={MuiIconFileCopyOutlined}
						label="Duplicate"
					/>

					<Divider />

					<MenuItem onClick={actionDelete}>
						<ListItemIcon>
							<MuiIconDeleteOutline fontSize="small" className="text-red-600" />
						</ListItemIcon>
						<ListItemText className="text-red-600">Delete</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

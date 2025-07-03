import React, {Context, useContext, useState} from 'react';
import Divider from '@mui/material/Divider';
import IconNavMenuFlag from '@/ui/NavButton/IconNavMenuFlag';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NavButtonMenuItem from '@/ui/NavButton/NavButtonMenuItem';
import type {IFormPage} from '@/types/IFormPage';
import {FormPageContext, type IFormPageContext} from '@/context/FormPageContext';

import styled from '@emotion/styled';
import MuiIconContentPaste from '@mui/icons-material/ContentPaste';
import MuiIconDeleteOutline from '@mui/icons-material/DeleteOutline';
import MuiIconDriveFileRenameOutline from '@mui/icons-material/DriveFileRenameOutline';
import MuiIconFileCopyOutlined from '@mui/icons-material/FileCopyOutlined';
import MuiIconMoreVert from '@mui/icons-material/MoreVert';

type TProps = Readonly<{
	item: IFormPage;
}>;


const StyledListHeader = styled(ListSubheader)({
	backgroundImage: 'var(--Paper-overlay)',
});

export default function NavButtonMenu (props: TProps) {
	const {
		item,
	} = props;

	const formContext = useContext(FormPageContext as Context<IFormPageContext>);
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const actionDuplicate = (item: IFormPage) => {
		formContext.addPage(item.id, item);
	}

	const actionRename = (item: IFormPage, newName: string = 'New name') => {
		const pageIndex = formContext.getPageIndex(item.id);

		// Create a copy, since splice edits in place
		const modifiedPages = JSON.parse(JSON.stringify(formContext.formPages));
		modifiedPages[pageIndex].name = newName; // TODO: allow input
		formContext.updatePages(modifiedPages);
	}

	const actionSetAsFirst = (item: IFormPage) => {
		const pageIndex = formContext.getPageIndex(item.id);

		// Create a copy, since splice edits in place
		const modifiedPages = JSON.parse(JSON.stringify(formContext.formPages));

		modifiedPages.splice(pageIndex, 1);
		modifiedPages.splice(1, 0, item);
		formContext.updatePages(modifiedPages);
	}

	const handleClose = (event: React.MouseEvent) => {
		setAnchorEl(null);
	};

	const menuOpen = (event: React.MouseEvent) => {
		event.stopPropagation();
		setAnchorEl(event.currentTarget as HTMLElement);
	};

	return (
		<>
			<MuiIconMoreVert className="hs-tooltip [--trigger:click] inline-block" onClick={menuOpen} />

			<Menu
				sx={{ width: 320, maxWidth: '100%' }}
				open={isOpen}
				anchorEl={anchorEl}
				onClose={handleClose}
			>
				<MenuList>
					<StyledListHeader>Settings</StyledListHeader>

					<Divider />

					<NavButtonMenuItem
						onClick={() => actionSetAsFirst(item)}
						icon={IconNavMenuFlag}
						label="Set as first page"
					/>

					<NavButtonMenuItem
						onClick={() => actionRename(item)}
						icon={MuiIconDriveFileRenameOutline}
						label="Rename"
					/>

					{/* I'm not sure what "copy" does without paste, so for now, it is the same as Duplicate */}
					<NavButtonMenuItem
						onClick={() => actionDuplicate(item)}
						icon={MuiIconContentPaste}
						label="Copy"
					/>

					<NavButtonMenuItem
						onClick={() => actionDuplicate(item)}
						icon={MuiIconFileCopyOutlined}
						label="Duplicate"
					/>

					<Divider />

					<MenuItem onClick={() => {formContext.deletePage(item.id)}}>
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

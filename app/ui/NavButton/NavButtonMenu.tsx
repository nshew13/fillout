import React, {useState} from 'react';
import Divider from '@mui/material/Divider';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import NavButtonMenuItem from '@/ui/NavButton/NavButtonMenuItem';
import {FormPageMenuItems, type TFormPageMenuItemKey} from '@/ui/NavButton/NavButtonMenu.constants';

import styled from '@emotion/styled';
import DeleteOutline from '@mui/icons-material/DeleteOutline';
import MoreVert from '@mui/icons-material/MoreVert';


const StyledListHeader = styled(ListSubheader)({
	backgroundImage: 'var(--Paper-overlay)',
});


export default function NavButtonMenu () {
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
	const isOpen = Boolean(anchorEl);

	const menuOpen = (event: React.MouseEvent) => {
		event.stopPropagation();
		console.log('show menu');
		setAnchorEl(event.currentTarget as HTMLElement);
	};

	const handleClose = (event: React.MouseEvent, key?: TFormPageMenuItemKey) => {
		console.log('TODO: action for', key);
		setAnchorEl(null);
	};

	// TODO: Sort by order prop, but for now, we'll let it use object key order
	const menuItemKeys = Object.keys(FormPageMenuItems);

	return (
		<>
			<MoreVert className="hs-tooltip [--trigger:click] inline-block" onClick={menuOpen} />

			<Menu
				sx={{ width: 320, maxWidth: '100%' }}
				open={isOpen}
				anchorEl={anchorEl}
				onClose={(event: React.MouseEvent) => handleClose(event)}
			>
				<MenuList>
					<StyledListHeader>Settings</StyledListHeader>

					<Divider />

					{menuItemKeys.map((key) => {
						const item = FormPageMenuItems[key as TFormPageMenuItemKey];

						return (
							<NavButtonMenuItem
								closeMenu={(event: React.MouseEvent) => handleClose(event, key as TFormPageMenuItemKey)}
								icon={item.icon}
								label={item.label}
							/>
						);
					})}

					<Divider />

					<MenuItem>
						<ListItemIcon>
							<DeleteOutline fontSize="small" className="text-red-600" />
						</ListItemIcon>
						<ListItemText className="text-red-600">Delete</ListItemText>
					</MenuItem>
				</MenuList>
			</Menu>
		</>
	);
}

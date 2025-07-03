import React, {type ComponentType} from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';
import {type TFormPageMenuItemKey} from '@/ui/NavButton/NavButtonMenu.constants';


type TProps = Readonly<{
	closeMenu: (event: React.MouseEvent, key?: TFormPageMenuItemKey) => void;
	icon: ComponentType;
	label: string;
}>;

export default function NavButtonMenuItem (props: TProps) {
	const {
		closeMenu,
		icon,
		label,
	} = props;

	const IconElement = icon;

	return (
		<MenuItem onClick={closeMenu}>
			<ListItemIcon>
				{<IconElement />}
			</ListItemIcon>
			<ListItemText>{label}</ListItemText>
		</MenuItem>
	);
}

import React, {type ComponentType} from 'react';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuItem from '@mui/material/MenuItem';


type TProps = Readonly<{
	icon: ComponentType;
	label: string;
	onClick: (event: React.MouseEvent) => void;
}>;

export default function NavButtonMenuItem (props: TProps) {
	const {
		icon,
		label,
		onClick,
	} = props;

	const IconElement = icon;

	return (
		<MenuItem onClick={onClick}>
			<ListItemIcon>
				{<IconElement />}
			</ListItemIcon>
			<ListItemText>{label}</ListItemText>
		</MenuItem>
	);
}

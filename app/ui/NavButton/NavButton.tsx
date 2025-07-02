import React from 'react';
import {Button} from '@mui/material';
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';

type TProps = Readonly<{
	label: string;
	icon: React.ElementType;
}>;

export default function NavButton(props: TProps) {
	const {
		label,
		icon,
	} = props;

	const iconElement = React.createElement(icon, {});

	return (
		<div className="p-2 overflow-ellipsis">
			<Button variant="outlined" startIcon={iconElement}>{label}</Button>
			<NavButtonMenu />
		</div>
	);
}

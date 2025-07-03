import React from 'react';
import {Button} from '@mui/material';
import {FormNavIconMap, type TFormNavIcon} from './FormNav.constants';
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';
import {type IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	isSelected: boolean;
	item: IFormPage;
	onClick: (event: React.MouseEvent) => void;
}>;

export default function FormNavBarItem (props: TProps) {
	const {
		isSelected,
		item,
		onClick,
	} = props;

	if (!item) {
		console.warn('No item specified for FormNavBarItem', props);
		return null;
	}

	const iconElement = React.createElement(FormNavIconMap[item.icon as TFormNavIcon], {});

	return (
		<Button
			color={isSelected ? 'primary' : 'secondary'}
			startIcon={iconElement}
			variant="outlined"
			onClick={onClick}
		>
			<span className="overflow-ellipsis whitespace-nowrap">
				{item.name}
			</span>
			{ isSelected && <span className="ml-2"><NavButtonMenu item={item} /></span> }
		</Button>
	);
}

import React from 'react';
import {Button} from '@mui/material';
import {FormNavIconMap, type TFormNavIcon} from './FormNav.constants';
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';
import {type IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	isSelected: boolean;
	formPage: IFormPage;
	onClick: (event: React.MouseEvent) => void;
}>;

export default function FormNavBarItem (props: TProps) {
	const {
		isSelected,
		formPage,
		onClick,
	} = props;

	if (!formPage) {
		console.warn('No form page specified for FormNavBarItem', props);
		return null;
	}

	const iconElement = React.createElement(FormNavIconMap[formPage.icon as TFormNavIcon], {});
	const pageIsEditable = formPage?.editable !== false;

	return (
		<Button
			className="group"
			color={isSelected ? 'primary' : 'secondary'}
			startIcon={iconElement}
			variant="outlined"
			onClick={onClick}
		>
			<span className="overflow-ellipsis whitespace-nowrap">
				{formPage.name}
			</span>
			{
				pageIsEditable &&
				<span className={`ml-2 ${isSelected ? '' : 'hidden group-hover:inline'}`}>
					<NavButtonMenu formPage={formPage} />
				</span>
			}
		</Button>
	);
}

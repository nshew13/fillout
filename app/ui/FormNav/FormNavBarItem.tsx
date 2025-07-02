import React, {Context, useContext} from 'react';
import {Button} from '@mui/material';
import {FormNavIconMap, type TFormNavIcon} from './FormNav.constants';
import {FormPageContext, IFormPageContext} from '@/context/FormPageContext';
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';
import {type INavItem} from '@/types/INavItem';

type TProps = Readonly<{
	item: INavItem;
}>;

export default function FormNavBarItem(props: TProps) {
	const {
		item,
	} = props;

	if (!item) {
		console.warn('No item specified for FormNavBarItem', props);
		return null;
	}

	const formContext = useContext(FormPageContext as Context<IFormPageContext>);
	const iconElement = React.createElement(FormNavIconMap[item.icon as TFormNavIcon], {});

	const selectPage = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext?.updateNavItem(item)
	};

	return (
		<div className="p-2 overflow-ellipsis">
			<Button
				variant="outlined"
				color={item.name === formContext?.navItem?.name ? 'primary' : 'secondary'}
				startIcon={iconElement}
				onClick={selectPage}
			>
				{item.name}
			</Button>
			<NavButtonMenu />
		</div>
	);
}

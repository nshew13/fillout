import React, {Context, useContext} from 'react';
import {Button} from '@mui/material';
import {FormNavIconMap, type TFormNavIcon} from './FormNav.constants';
import {FormPageContext, IFormPageContext} from '@/context/FormPageContext';
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';
import {type IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	item: IFormPage;
}>;

export default function FormNavBarItem (props: TProps) {
	const {
		item,
	} = props;

	if (!item) {
		console.warn('No item specified for FormNavBarItem', props);
		return null;
	}

	const formContext = useContext(FormPageContext as Context<IFormPageContext>);
	const iconElement = React.createElement(FormNavIconMap[item.icon as TFormNavIcon], {});
	const isActiveItem =  item.id === formContext?.activeNavItemID;

	const selectPage = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext?.updateActivePage(item.id)
	};

	return (
		<Button
			color={isActiveItem ? 'primary' : 'secondary'}
			startIcon={iconElement}
			variant="outlined"
			onClick={selectPage}
		>
			<span className="overflow-ellipsis">
				{item.name}
			</span>
			{ isActiveItem && <span className="ml-2"><NavButtonMenu item={item} /></span> }
		</Button>
	);
}

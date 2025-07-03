import React, {type Context, useContext} from 'react';
import {ReactSortable} from 'react-sortablejs';
import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';
import FragmentSortable from '@/ui/FragmentSortable';
import NavButtonSpacer from '@/ui/NavButton/NavButtonSpacer';
import {FormPageContext, IFormPageContext} from '@/context/FormPageContext';
import {type IFormPage} from '@/types/IFormPage';


export default function FormNavBar() {
	const formContext = useContext(FormPageContext as Context<IFormPageContext>);
	const pages = formContext?.formPages ?? [];

	const reorderPages = (reorderedPages: IFormPage[]) => {
		formContext.updatePages(reorderedPages);
	};

	const selectPage = (event: React.MouseEvent, item: IFormPage) => {
		event.stopPropagation();
		formContext?.updateActivePage(item.id)
	};

	return (
		<div className="flex justify-self-start max-w-8/10 overflow-x-auto pb-4">
			<ReactSortable list={pages} setList={reorderPages} className="flex justify-self-start">
				{pages.map((item) => (
					<FragmentSortable key={item.id}>
						<FormNavBarItem
							isSelected={item.id === formContext?.activeNavItemID}
							item={item}
							onClick={(event) => selectPage(event, item)}
						/>
						<NavButtonSpacer afterID={item.id} />
					</FragmentSortable>
				))}
			</ReactSortable>
		</div>
	);
};

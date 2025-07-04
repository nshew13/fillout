import React, {type Context, useContext} from 'react';
import {ReactSortable} from 'react-sortablejs';
import {FormContext, type IFormContext} from '@/context/FormContext';
import {FormNavContext, type IFormNavContext} from '@/context/FormNavContext';
import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';
import FragmentSortable from '@/ui/FragmentSortable';
import NavButtonSpacer from '@/ui/NavButton/NavButtonSpacer';
import {type IFormPage} from '@/types/IFormPage';


export default function FormNavBar() {
	const formNavContext = useContext(FormNavContext as Context<IFormNavContext>);
	const formContext = useContext(FormContext as Context<IFormContext>);
	const pages = formContext.formPages ?? [];

	const reorderPages = (reorderedPages: IFormPage[]) => {
		formContext.updatePages(reorderedPages);
	};

	const pageAdd = (event: React.MouseEvent, formPage: IFormPage) => {
		event.stopPropagation();
		formContext.addPage(formPage);
	};

	const pageSelect = (event: React.MouseEvent, formPage: IFormPage) => {
		event.stopPropagation();
		formNavContext.updateActivePage(formPage);
	};

	return (
		<div className="flex justify-self-start max-w-8/10 overflow-x-auto pb-4">
			<ReactSortable list={pages} setList={reorderPages} className="flex justify-self-start">
				{pages.map((formPage, index) => (
					<FragmentSortable key={formPage.id}>
						<FormNavBarItem
							formPage={formPage}
							isSelected={formPage?.id === formNavContext?.activeNavItemID}
							onClick={(event) => pageSelect(event, formPage)}
						/>
						{ index < pages.length - 1 && <NavButtonSpacer afterPage={formPage} /> }
					</FragmentSortable>
				))}
			</ReactSortable>
			{/* use div to prevent crushing by flex */}
			<div className="flex justify-self-start">
				{/* add page at length - 2 to insert before Ending */}
				<FormNavBarItem
					className="active"
					formPage={{id: -1, name: 'Add page', icon: 'plus', editable: false}}
					isSelected={false}
					onClick={(event) => pageAdd(event, pages[pages.length - 2])}
				/>
			</div>
		</div>
	);
};

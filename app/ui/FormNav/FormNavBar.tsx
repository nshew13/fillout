import {type Context, useContext} from 'react';
import {ReactSortable} from 'react-sortablejs';
import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';
import FragmentSortable from '@/ui/FragmentSortable';
import NavButtonSpacer from '@/ui/NavButton/NavButtonSpacer';
import {FormPageContext, IFormPageContext} from '@/context/FormPageContext';
import {type IFormPage} from '@/types/IFormPage';


export default function FormNavBar() {
	const formContext = useContext(FormPageContext as Context<IFormPageContext>);

	const reorderPages = (reorderedPages: IFormPage[]) => {
		formContext.updatePages(reorderedPages);
	};

	const pages = formContext?.formPages ?? [];

	return (
		<div className="flex justify-self-start">
			<ReactSortable list={pages} setList={reorderPages} className="flex justify-self-start">
				{pages.map((item) => (
					<FragmentSortable key={item.id}>
						<FormNavBarItem item={item} />
						<NavButtonSpacer afterID={item.id} />
					</FragmentSortable>
				))}
			</ReactSortable>
		</div>
	);
};

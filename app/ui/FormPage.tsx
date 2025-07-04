import {type Context, useContext} from 'react';
import {FormContext, type IFormContext} from '@/context/FormContext';
import {FormNavContext, type IFormNavContext} from '@/context/FormNavContext';

export default function FormPage () {
	const formNavContext = useContext(FormNavContext as Context<IFormNavContext>);
	const formContext = useContext(FormContext as Context<IFormContext>);

	const activePageIndex = formContext.getPageIndexByID(formNavContext.activeNavItemID);
	const activePage = formContext.formPages[activePageIndex];

	return (
		<main className="flex-[1_0_0] justify-center items-center m-8 p-4 shadow-md rounded-md w-2/3 text-center text-xl font-bold outline outline-gray-300">
			{activePage?.name ?? 'Oops'}
		</main>
	);
}

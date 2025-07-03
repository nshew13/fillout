import {type Context, useContext} from 'react';
import {FormPageContext, IFormPageContext} from '@/context/FormPageContext';

export default function FormPage () {
	const formContext = useContext(FormPageContext as Context<IFormPageContext>);
	const activePageIndex = formContext.getActivePage();

	return (
		<main className="flex-[1_0_0] justify-center items-center m-8 p-4 shadow-md rounded-md w-2/3 text-center text-xl font-bold outline outline-gray-300">
			{activePageIndex?.name ?? 'Oops'}
		</main>
	);
}

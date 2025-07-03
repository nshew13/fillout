import React, {createContext, useMemo, useState} from 'react';
import {type INavItem} from '@/types/INavItem';

export interface IFormPageContext {
	activeNavItemID: INavItem['id'];
	formPages: INavItem[];
	addPage: (afterID: INavItem['id']) => void;
	deletePage: (id: INavItem['id']) => void;
	updateActivePage: (id: INavItem['id']) => void;
	updatePages: (pages: INavItem[]) => void;
}

type TProps = Readonly<{
	children: React.ReactNode;
}>;

export const FormPageContext = createContext<unknown>(null);

const RE_PAGE_AUTO_NAME = /^Page (\d+)$/;

export function FormPageProvider(props: TProps) {
	const [formPages, setFormPages] = useState<IFormPageContext['formPages']>([
		{id: 0, name: 'Info', icon: 'info'},
		{id: 1, name: 'Page 1', icon: 'page'},
		{id: 2, name: 'Page 2', icon: 'page'},
		{id: 3, name: 'Ending', icon: 'check'},
	]);
	const [activeNavItemID, setActiveNavItemID] = useState<IFormPageContext['activeNavItemID']>(0);

	// holds the last "Page #" for inserting a new page
	const lastAutoName = useMemo(
		() => {
			console.log('calculating lastAutoName');
			let highestAutoNumber = 0;

			formPages.forEach((page: INavItem) => {
				if (page?.name) {
					const matches = RE_PAGE_AUTO_NAME.exec(page.name);
					if(matches) {
						highestAutoNumber = Math.max(parseInt(matches[1]));
					}
				}
			});

			return `Page ${highestAutoNumber + 1}`;
		},
		[formPages],
	);

	const updateActivePage = (id: IFormPageContext['activeNavItemID']) => {
		console.log(`setActiveNavItemID(${id})`);
		setActiveNavItemID(id);
	};

	const addPage = (afterID: INavItem['id']) => {
		// find ID's index
		const afterIndex = formPages.findIndex((page) => page.id === afterID);
		if (afterIndex !== -1) {
			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formPages));
			modifiedPages.splice(afterIndex + 1, 0, {
				id: formPages.length, // FIXME: This won't work if/after deleting pages
				name: lastAutoName,
				icon: 'page',
			} as INavItem);

			setFormPages(modifiedPages);
		} else {
			throw new Error(`Page with ID ${afterID} does not exist`);
		}
	};

	const deletePage = (id: INavItem['id']) => {
		// find ID's index
		const pageIndex = formPages.findIndex((page) => page.id === id);

		// only allow removal of "Pages"
		if (
			pageIndex > 0 && // disallow removal of "Info"
			pageIndex < formPages.length - 1 // disallow removal of "Ending"
		) {
			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formPages));
			modifiedPages.splice(pageIndex, 1);

			setFormPages(modifiedPages);
		}
	};

	const updatePages = (pages: IFormPageContext['formPages']) => {
		// TODO: check that name is unique
		setFormPages(pages);
	};

	const contextValue = useMemo(
		() => ({
			activeNavItemID,
			formPages,
			addPage,
			deletePage,
			updateActivePage,
			updatePages,
		}),
		[activeNavItemID, formPages],
	);

	return (
		<FormPageContext value={contextValue}>
			{props.children}
		</FormPageContext>
	);
}

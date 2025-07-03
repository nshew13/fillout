import React, {createContext, useMemo, useState} from 'react';
import {type IFormPage} from '@/types/IFormPage';

export interface IFormPageContext {
	// data
	activeNavItemID: IFormPage['id'];
	formPages: IFormPage[];

	// methods
	addPage: (afterPage: IFormPage, newPage?: IFormPage) => void;
	deletePage: (page: IFormPage) => void;
	getActivePage: () => IFormPage;
	getPageIndexByID: (id: IFormPage['id']) => number;
	updateActivePage: (page: IFormPage) => void;
	updatePages: (pages: IFormPage[]) => void;
}

type TProps = Readonly<{
	children: React.ReactNode;
}>;

export const FormPageContext = createContext<unknown>(null);

const RE_PAGE_AUTO_NAME = /^Page (\d+)$/;

export function FormPageProvider(props: TProps) {
	const [formPages, setFormPages] = useState<IFormPageContext['formPages']>([
		{id: 0, name: 'Info', icon: 'info', editable: false},
		{id: 1, name: 'Page 1', icon: 'page'},
		{id: 2, name: 'Page 2', icon: 'page'},
		{id: 3, name: 'Ending', icon: 'check', editable: false},
	]);
	const [activeNavItemID, setActiveNavItemID] = useState<IFormPageContext['activeNavItemID']>(0);

	const getPageIndexByID = (id: IFormPage['id']) => {
		return formPages.findIndex((page) => page.id === id);
	}

	const getActivePage = () => {
		return formPages[getPageIndexByID(activeNavItemID)];
	}

	/**
	 * holds the last "Page #" for inserting a new page
	 *
	 * This finds the max number in use, which means that if a page has
	 * been renamed, a new page might reuse a number.
	 */
	const lastAutoName = useMemo(
		() => {
			let highestAutoNumber = 0;

			formPages.forEach((page: IFormPage) => {
				if (page?.name) {
					const matches = RE_PAGE_AUTO_NAME.exec(page.name);
					if(matches) {
						highestAutoNumber = Math.max(parseInt(matches[1], 10), highestAutoNumber);
					}
				}
			});

			return `Page ${highestAutoNumber + 1}`;
		},
		[formPages],
	);

	const pageIsEditable = (formPage: IFormPage) => formPage?.editable !== false;

	const addPage = (afterPage: IFormPage, newPage?: IFormPage) => {
		const afterIndex = getPageIndexByID(afterPage.id);

		if (afterIndex !== -1) {
			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formPages));

			if (typeof newPage !== 'undefined') {
				/*
				 * Update the name and ID. Without form page content,
				 * this is no different from a "blank" page.
				 */
				newPage = JSON.parse(JSON.stringify(newPage)) as IFormPage;
				newPage.name = lastAutoName;
				newPage.id = formPages.length; // FIXME: This won't work if/after deleting pages
			} else {
				newPage = {
					id: formPages.length, // FIXME: This won't work if/after deleting pages
					name: lastAutoName,
					icon: 'page',
				};
			}

			modifiedPages.splice(afterIndex + 1, 0, newPage);
			setFormPages(modifiedPages);
		} else {
			throw new Error(`Page with ID ${afterPage} does not exist`);
		}
	};

	const deletePage = (formPage: IFormPage) => {
		const pageIndex = getPageIndexByID(formPage.id);

		if (pageIndex !== -1 && pageIsEditable(formPage)) {
			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formPages));
			modifiedPages.splice(pageIndex, 1);

			setFormPages(modifiedPages);
		}
	};

	const updateActivePage = (page: IFormPage) => {
		setActiveNavItemID(page.id);
	};

	const updatePages = (pages: IFormPageContext['formPages']) => {
		// TODO: basic validation, such as unique ID and name
		setFormPages(pages);
	};

	const contextValue = useMemo(
		() => ({
			activeNavItemID,
			formPages,
			addPage,
			deletePage,
			getActivePage,
			getPageIndexByID,
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

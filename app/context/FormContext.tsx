import React, {type Context, createContext, useCallback, useContext, useMemo, useState} from 'react';
import type {IFormPage} from '@/types/IFormPage';
import {FormNavContext, type IFormNavContext} from '@/context/FormNavContext';

export interface IFormContext {
	// data
	formPages: IFormPage[];

	// methods
	addPage: (afterPage: IFormPage, newPage?: IFormPage) => void;
	deletePage: (page: IFormPage) => void;
	getPageIndexByID: (id: IFormPage['id']) => number;
	updatePages: (pages: IFormPage[]) => void;
}

type TProps = Readonly<{
	children: React.ReactNode;
}>;

export const FormContext = createContext<IFormContext | null>(null);

const RE_PAGE_AUTO_NAME = /^Page (\d+)$/;

export function FormProvider (props: TProps) {
	const formNavContext = useContext(FormNavContext as Context<IFormNavContext>);

	const [formPages, setFormPages] = useState<IFormContext['formPages']>([
		{id: 0, name: 'Info',   icon: 'info', editable: false},
		{id: 1, name: 'Details', icon: 'page'},
		{id: 2, name: 'Other', icon: 'page'},
		{id: 3, name: 'Ending', icon: 'check', editable: false},
	]);

	const getPageIndexByID = useCallback((id: IFormPage['id']) => {
		return formPages.findIndex((page) => page.id === id);
	}, [formPages]);

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

	const pageIsEditable = useCallback((formPage: IFormPage) => formPage?.editable !== false, []);

	const addPage = useCallback((afterPage: IFormPage, newPage?: IFormPage) => {
		const afterIndex = getPageIndexByID(afterPage.id);

		if (afterIndex !== -1) {
			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formPages));

			let insertPage: IFormPage;
			if (typeof newPage !== 'undefined') {
				/*
				 * Update the name and ID. Without form page content,
				 * this is no different from a "blank" page.
				 */
				insertPage = {
					...newPage,
					id: formPages.length, // FIXME: This won't work if/after deleting pages
					name: lastAutoName,
				};
			} else {
				insertPage = {
					icon: 'page',
					id: formPages.length, // FIXME: This won't work if/after deleting pages
					name: lastAutoName,
				};
			}

			modifiedPages.splice(afterIndex + 1, 0, insertPage);
			setFormPages(modifiedPages);

			// set new page as active
			formNavContext.updateActivePage(insertPage);
		} else {
			throw new Error(`Page with ID ${afterPage} does not exist`);
		}
	}, []);

	const deletePage = useCallback((formPage: IFormPage) => {
		const pageIndex = getPageIndexByID(formPage.id);

		if (pageIndex !== -1 && pageIsEditable(formPage)) {
			// Create a copy, since splice edits in place
			const modifiedPages = JSON.parse(JSON.stringify(formPages));
			modifiedPages.splice(pageIndex, 1);

			// set previous page as active
			// grab previous page before editing
			const prevPage = formPages[pageIndex - 1];
			formNavContext.updateActivePage(prevPage);

			setFormPages(modifiedPages);
		}
	}, []);

	const updatePages = useCallback((pages: IFormContext['formPages']) => {
		// TODO: basic validation, such as unique ID and name
		setFormPages(pages);
	}, []);

	const contextValue = useMemo(
		() => ({
			formPages,
			addPage,
			deletePage,
			getPageIndexByID,
			updatePages,
		}),
		[formPages],
	);

	return (
		<FormContext value={contextValue}>
			{props.children}
		</FormContext>
	);
}

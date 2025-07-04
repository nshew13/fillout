import React, {type Context, useCallback, useContext, useState} from 'react';
import {FormContext, type IFormContext} from '@/context/FormContext';
import {FormNavContext, type IFormNavContext} from '@/context/FormNavContext';
import {DndContext, PointerSensor, useSensor, useSensors} from '@dnd-kit/core';
import {restrictToParentElement} from '@dnd-kit/modifiers';
import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';
import NavButtonSpacer from '@/ui/NavButton/NavButtonSpacer';
import type {IFormPage} from '@/types/IFormPage';
import type {DragEndEvent} from '@dnd-kit/core/dist/types';

const RE_INSERT_AFTER = /^(\d+)-droppable$/;

export default function FormNavBar() {
	const formNavContext = useContext(FormNavContext as Context<IFormNavContext>);
	const formContext = useContext(FormContext as Context<IFormContext>);
	const [isDragging, setIsDragging] = useState(false);
	const pages = formContext.formPages ?? [];


	// explicitly declare sensor with minimal movement distance to also allow click
	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 25, // px
			},
		}),
	);

	const pageAdd = useCallback((event: React.MouseEvent, formPage: IFormPage) => {
		event.stopPropagation();
		if (!isDragging) {
			formContext.addPage(formPage);
		}
	}, []);

	const pageMove = useCallback((event: DragEndEvent) => {
		if (event?.active?.id && event?.over?.id) {
			const matches = RE_INSERT_AFTER.exec(event.over.id.toString());
			if (matches) {
				setIsDragging(false);
				const movedID = event.active.id as string; // shortcut
				/*
				 * N.B.: We could get this page later, as the element removed
				 * by splice, but before we splice, let's see if it's even
				 * editable. (The splice can be thrown away, but why go
				 * through the expense?)
				 */
				const movedPage = formContext.getPageByID(movedID);

				// don't move if not editable
				if (!movedPage || !formContext.pageIsEditable(movedPage)) {
					return;
				}

				const moveIndex = formContext.getPageIndexByID(movedID);
				const insertAfterID = matches[1]; // shortcut
				const insertAfterIndex = formContext.getPageIndexByID(insertAfterID);

				// Create a copy, since splice edits in place
				const modifiedPages = JSON.parse(JSON.stringify(formContext.formPages));
				modifiedPages.splice(moveIndex, 1);
				modifiedPages.splice(insertAfterIndex, 0, movedPage);
				formContext.updatePages(modifiedPages);

				formNavContext.updateActivePage(movedPage);
			}
		}
	}, [formContext.formPages]);

	const pageSelect = useCallback((event: React.MouseEvent, formPage: IFormPage) => {
		event.stopPropagation();
		event.preventDefault();
		if (!isDragging) {
			formNavContext.updateActivePage(formPage);
		}
	}, []);

	return (
		<div className="flex justify-self-start max-w-8/10 overflow-x-auto pb-4">
			{/* use div to prevent crushing by flex */}
			<div className="flex justify-self-start">
				<DndContext
					modifiers={[restrictToParentElement]}
					onDragEnd={pageMove}
					sensors={sensors}
				>
					{pages.map((formPage, index) => (
						<React.Fragment key={formPage.id}>
							<FormNavBarItem
								formPage={formPage}
								isSelected={formPage?.id === formNavContext?.activeNavItemID}
								onClick={(event) => pageSelect(event, formPage)}
							/>
							{
								index < pages.length - 1 &&
								<NavButtonSpacer afterPage={formPage} />
							}
						</React.Fragment>
					))}
				</DndContext>
			</div>

			{/* spacer */}
			<div className="w-5"></div>

			{/* use div to prevent crushing by flex */}
			<div className="flex justify-self-start">
				{/* add page at length - 2 to insert before Ending */}
				<FormNavBarItem
					className="active"
					formPage={{id: '-1', name: 'Add page', icon: 'plus', editable: false}}
					isSelected={false}
					onClick={(event) => pageAdd(event, pages[pages.length - 2])}
				/>
			</div>
		</div>
	);
};

import React, {Context, useCallback, useContext, useEffect, useState} from 'react';
import styled from '@emotion/styled';
import {FormContext, type IFormContext} from '@/context/FormContext';
import {useDroppable} from '@dnd-kit/core';
import MuiIconAdd from '@mui/icons-material/Add';
import MuiIconSwapHoriz from '@mui/icons-material/SwapHoriz';
import type {IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	afterPage: IFormPage;
	movingPageID: IFormPage['id'] | null;
}>;

const StyledNavButtonContainer = styled.div<{highlight?: boolean}>`
	${props => (props.highlight ? 'border: 2px solid #f59d0e' : '')};
`

export default function NavButtonSpacer (props: TProps) {
	const {
		afterPage,
		movingPageID,
	} = props;

	const formContext = useContext(FormContext as Context<IFormContext>);
	const [enableDrop, setEnableDrop] = useState<boolean>(true);
	const {isOver, setNodeRef} = useDroppable({
		// `id` must follow format of RE_INSERT_AFTER
		id: `${afterPage.id}-droppable`,
	});

	useEffect(() => {
		const afterPageIndex = formContext.getPageIndexByID(afterPage.id);
		const beforePage = formContext.formPages?.[afterPageIndex + 1];

		// If movingPageID matches either side, the spacer is adjacent. Disable drop.
		if (movingPageID === afterPage.id || movingPageID === beforePage.id) {
			setEnableDrop(false);
		} else {
			setEnableDrop(true);
		}
	}, [movingPageID, formContext.formPages]);

	const addPage = useCallback((event: React.MouseEvent) => {
		event.stopPropagation();
		formContext.addPage(props.afterPage);
	}, [formContext.formPages]);

	const iconProps = {
		sx: {fontSize: '16px'},
		className: 'p-0 m-0 text-black',
	};

	const showDropHighlight = isOver && enableDrop;

	/*
	 * During a move, we don't want to show an icon if this is an
	 * adjacent spacer. Otherwise, we show MuiIconSwapHoriz.
	 *
	 * When not moving, all spacers should show MuiIconAdd.
	 */
	let icon = <></>;
	if(isOver) {
		if(enableDrop) {
			icon = <MuiIconSwapHoriz {...iconProps} />;
		}
	} else {
		icon = <MuiIconAdd {...iconProps} onClick={addPage} />;
	}

	return (
		<StyledNavButtonContainer
			ref={setNodeRef}
			className="relative h-[35px] w-[40px] hover:w-[70px] group flex flex-col justify-center items-center"
			highlight={showDropHighlight}
		>
			<div className="absolute h-0 w-full border-b-2 border-dashed border-gray-300"></div>
			<div className={
				'z-1 p-0 m-0 w-min h-min aspect-square flex flex-col justify-center items-center rounded-full bg-white outline-2 outline-gray-300 cursor-pointer' +
				(showDropHighlight ? '' : ' invisible group-hover:visible')
			}>
				{icon}
			</div>
		</StyledNavButtonContainer>
	);
}

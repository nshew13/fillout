import React from 'react';
import {Button, type ButtonProps} from '@mui/material';
import {FormNavIconMap, type TFormNavIcon} from './FormNav.constants';
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';
import {alpha} from '@mui/material/styles';
import styled from '@emotion/styled';
import {useDraggable} from '@dnd-kit/core';
import type {IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	className?: string;
	formPage: IFormPage;
	isDragging: boolean;
	isSelected: boolean;
	onClick: (event: React.MouseEvent) => void;
}>;


const buttonDefaultBase = '#9da4b2';
const NavButtonDefault = styled(Button)<ButtonProps>(({ theme }) => ({
	backgroundColor: alpha(buttonDefaultBase, 0.15),
	color: '#677289',
	textTransform: 'none',
	fontWeight: 'medium',
	fontSize: '14px',
	borderRadius: '8px',
	padding: '0 10px',
	width: 'min-content',
	touchAction: 'none',
	zIndex: '0',

	'&:hover': {
		backgroundColor: alpha(buttonDefaultBase, 0.35),
	},

	'&.active': {
		backgroundColor: 'white',
		color: '#f59d0e', /* color of icon */
		border: '1px solid rgba(0,0,0,0.2)',
		filter: 'drop-shadow(1px 1px 1px rgba(0,0,0,0.2))',

		'.label': {
			color: '#1a1a1a', /* color of label  */
		},

		'.menu': {
			color: buttonDefaultBase, /* color of menu ellipsis */
		},
	},

	'&.dragging': {
		opacity: '0.9',
		cursor: 'grab',
		zIndex: '100'
	},
	'&.dragging.not-draggable': {
		border: '3px solid red',
		cursor: 'not-allowed'
	},
}));


export default function FormNavBarItem (props: TProps) {
	const {
		className,
		formPage,
		isDragging,
		isSelected,
		onClick,
	} = props;

	if (!formPage) {
		console.warn('No form page specified for FormNavBarItem', props);
		return null;
	}

	const {attributes, listeners, setNodeRef, transform} = useDraggable({
		id: formPage.id,
	});

	const style = transform ? {
		transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
	} : undefined;


	const iconElement = React.createElement(FormNavIconMap[formPage.icon as TFormNavIcon], {});
	const pageIsEditable = formPage?.editable !== false;

	return (
		<NavButtonDefault
			ref={setNodeRef}
			style={style}
			{...attributes}
			className={
				'group' +
				(isDragging ? ' dragging' : '') +
				(isSelected ? ' active' : '') +
				(className ? ` ${className}` : '') +
				(pageIsEditable && isDragging ? '' : ' not-draggable')
			}
			startIcon={iconElement}
			onClick={onClick}
			{...listeners}
		>
			<span className="label overflow-ellipsis whitespace-nowrap">
				{formPage.name}
			</span>
			{
				pageIsEditable &&
				/* show menu ellipsis on hover or while selected */
				<span className={`menu ml-2 ${isSelected ? '' : 'hidden group-hover:inline'}`}>
					<NavButtonMenu formPage={formPage} />
				</span>
			}
		</NavButtonDefault>
	);
}

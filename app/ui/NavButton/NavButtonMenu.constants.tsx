import IconNavMenuFlag from '@/ui/NavButton/IconNavMenuFlag';
import CircleCheckOutline from '@mui/icons-material/CheckCircleOutline';
import ContentPaste from '@mui/icons-material/ContentPaste';
import FileCopyOutlined from '@mui/icons-material/FileCopyOutlined';
import {type ComponentType} from 'react';


interface IFormPageMenuItem {
	icon: ComponentType;
	label: string;
	order: number;
}

export type TFormPageMenuItemKey =
	| 'COPY'
	| 'DUPLICATE'
	| 'FIRST'
	| 'RENAME'
;

type TFormPageMenuItems = Record<TFormPageMenuItemKey, IFormPageMenuItem>;

export const FormPageMenuItems: TFormPageMenuItems = {
	FIRST: {
		order: 1,
		label: 'Set as first page',
		icon: IconNavMenuFlag,
	},
	RENAME: {
		order: 2,
		label: 'Rename',
		icon: CircleCheckOutline,
	},
	COPY: {
		order: 3,
		label: 'Copy',
		icon: ContentPaste,
	},
	DUPLICATE: {
		order: 4,
		label: 'Duplicate',
		icon: FileCopyOutlined,
	},
};


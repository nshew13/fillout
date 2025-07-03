import {ItemInterface} from 'react-sortablejs';
import {TFormNavIcon} from '@/ui/FormNav/FormNav.constants';

export interface IFormPage extends ItemInterface {
	editable?: boolean;
	icon?: TFormNavIcon;
	id: number;
	name: string;

	/*
	 * Obviously, we need the form page content.
	 */
}

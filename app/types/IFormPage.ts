import {TFormNavIcon} from '@/ui/FormNav/FormNav.constants';

export interface IFormPage {
	editable?: boolean;
	icon?: TFormNavIcon;
	id: string; // more reliable comparison than big ints
	name: string;

	/*
	 * Obviously, we need the form page content.
	 */
}

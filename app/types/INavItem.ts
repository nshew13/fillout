import {ItemInterface} from 'react-sortablejs';
import {TFormNavIcon} from '@/ui/FormNav/FormNav.constants';

export interface INavItem extends ItemInterface {
	icon?: TFormNavIcon;
	id: number;
	name: string;
}

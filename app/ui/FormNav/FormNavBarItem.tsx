import NavButton from '@/ui/NavButton/NavButton';
import {FormNavIconMap, type TFormNavIcon} from './FormNav.constants';

type TProps = Readonly<{
	icon?: TFormNavIcon;
	name: string;
}>;

export default function FormNavBarItem(props: TProps) {
	const {
		icon = 'page',
		name,
	} = props;

	return (
		<NavButton label={name} icon={FormNavIconMap[icon as TFormNavIcon]} />
	);
}

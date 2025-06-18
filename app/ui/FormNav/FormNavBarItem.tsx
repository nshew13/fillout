import ButtonWithMenu from '@/ui/ButtonWithMenu';
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
		<ButtonWithMenu label={name} icon={FormNavIconMap[icon as TFormNavIcon]} />
	);
}

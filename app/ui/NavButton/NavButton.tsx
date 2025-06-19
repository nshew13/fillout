import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import NavButtonMenu from '@/ui/NavButton/NavButtonMenu';
import {type IconProp} from '@fortawesome/fontawesome-svg-core';

type TProps = Readonly<{
	label: string;
	icon: IconProp;
}>;

export default function NavButton(props: TProps) {
	const {
		label,
		icon,
	} = props;

	return (
		<div
			className="p-2 overflow-ellipsis border rounded group"
		>
			<div className="cursor-pointer inline">
				<FontAwesomeIcon icon={icon} />
				<span className="ml-1">{label}</span>
			</div>
			<NavButtonMenu />
		</div>
	);
}

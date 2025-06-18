import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {type IconProp} from '@fortawesome/fontawesome-svg-core';
import { faEllipsisVertical  } from '@fortawesome/free-solid-svg-icons'

type TProps = Readonly<{
	label: string;
	icon: IconProp;
}>;

export default function ButtonWithMenu({
	label,
	icon,
}: TProps) {
	return (
		<div
			className="p-2 overflow-ellipsis border rounded group"
		>
			<div className="cursor-pointer inline">
				<FontAwesomeIcon icon={icon} />
				<span className="ml-1">{label}</span>
			</div>
			<div className="cursor-pointer inline ml-3 mr-1 px-1 invisible group-hover:visible">
				<FontAwesomeIcon icon={faEllipsisVertical} />
			</div>
		</div>
	);
}

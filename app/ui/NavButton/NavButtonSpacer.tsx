import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSquarePlus} from '@fortawesome/free-regular-svg-icons';

type TProps = Readonly<{}>;

export default function NavButtonSpacer(props: TProps) {
	const addPage = () => {
		console.log('TODO: add page');
	};

	return (
		<div className="h-[100%] w-[40px] group">
			<div className="h-[50%] border-b-2 border-dashed border-gray-300"></div>
			{/* 13px = (container's 40px - 15px icon width) / 2  */}
			<FontAwesomeIcon
				className="bg-white w-[15px] invisible group-hover:visible cursor-pointer translate-x-[13px] translate-y-[-15px]"
				icon={faSquarePlus}
				onClick={addPage}
			/>
		</div>
	);
}

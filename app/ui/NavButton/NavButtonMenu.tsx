import {useState} from 'react';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEllipsisVertical} from '@fortawesome/free-solid-svg-icons';

export default function NavButtonMenu() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	return (
		<div className="hs-tooltip [--trigger:click] inline-block" onClick={(e) => e.stopPropagation()}>
			<div className="hs-tooltip-toggle block text-center">
				<div
					className="cursor-pointer inline ml-3 mr-1 px-1 invisible group-hover:visible"
					onClick={(e) => {
						console.log('toggle menu');
						setIsOpen(!isOpen);
						e.stopPropagation();
					}}
				>
					<FontAwesomeIcon icon={faEllipsisVertical} />
				</div>

				<div
					className="hs-tooltip-content hs-tooltip-shown:opacity-100 hs-tooltip-shown:visible opacity-0 transition-opacity inline-block absolute invisible z-10 py-3 px-4 bg-white border border-gray-200 text-sm text-gray-600 rounded-lg shadow-md dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400"
					role="tooltip"
				>
					Show me
				</div>
			</div>
		</div>
	);
}

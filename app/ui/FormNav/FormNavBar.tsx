import {useState} from 'react';
import {ReactSortable} from 'react-sortablejs';
import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';
import FragmentSortable from '@/ui/FragmentSortable';
import NavButtonSpacer from '@/ui/NavButton/NavButtonSpacer';
import type {INavItem} from '@/types/INavItem';


export default function FormNavBar() {
	const [state, setState] = useState<INavItem[]>([
		// `filtered` and `draggable` aren't working, so just hard-code the end pieces
		// {id: 0, name: 'Info', icon: 'info', filtered: true},
		{id: 1, name: 'Page 1', icon: 'page'},
		{id: 2, name: 'Page 2', icon: 'page'},
		// {id: 4, name: 'Ending', icon: 'check', filtered: true},
	]);

	const navItemInfo: INavItem = {id: 0, name: 'Info', icon: 'info', filtered: true};
	const navItemEnd: INavItem = {id: state.length, name: 'Ending', icon: 'check', filtered: true};


	return (
		<div className="flex justify-self-start">
			<FormNavBarItem item={navItemInfo} />
			<NavButtonSpacer />
			<ReactSortable list={state} setList={setState} className="flex justify-self-start">
				{state.map((item) => (
					<FragmentSortable key={item.id}>
						<FormNavBarItem item={item} />
						<NavButtonSpacer />
					</FragmentSortable>
				))}
			</ReactSortable>
			<FormNavBarItem item={navItemEnd} />
		</div>
	);
};

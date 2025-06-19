'use client';

import {useState} from 'react';
import {ItemInterface, ReactSortable} from 'react-sortablejs';
import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';
import FragmentSortable from '@/ui/FragmentSortable';
import NavButtonSpacer from '@/ui/NavButton/NavButtonSpacer';
import type {TFormNavIcon} from '@/ui/FormNav/FormNav.constants';

interface INavItem extends ItemInterface {
	name: string;
	icon?: TFormNavIcon;
}


type TProps = Readonly<{}>;

export default function FormNavBar(props: TProps) {
	const [state, setState] = useState<INavItem[]>([
		// `filtered` and `draggable` aren't working, so just hard-code the end pieces
		// {id: 0, name: 'Info', icon: 'info', filtered: true},
		{id: 1, name: 'Page 1', icon: 'page'},
		{id: 2, name: 'Page 2', icon: 'page'},
		// {id: 4, name: 'Ending', icon: 'check', filtered: true},
	]);

	return (
		<div className="flex justify-self-start">
			<FormNavBarItem name="Info" icon="info" />
			<NavButtonSpacer />
			<ReactSortable list={state} setList={setState} className="flex justify-self-start">
				{state.map((item) => (
					<FragmentSortable key={item.id}>
						<FormNavBarItem name={item.name} icon={item?.icon ?? 'page'} />
						<NavButtonSpacer />
					</FragmentSortable>
				))}
			</ReactSortable>
			<FormNavBarItem name="Ending" icon="check" />
		</div>
	);
};

import React, {createContext, useMemo, useState} from 'react';
import {type INavItem} from '@/types/INavItem';

export interface IFormPageContext {
	navItem: INavItem;
	updateNavItem: (item: INavItem) => void;
}

type TProps = Readonly<{
	children: React.ReactNode;
}>;

export const FormPageContext = createContext<unknown>(null);

export function FormPageProvider(props: TProps) {
	const [activeNavItem, setActiveNavItem] = useState<INavItem>({id: 0, name: 'Info', icon: 'info', filtered: true});


	const updatePage = (item: INavItem) => {
		setActiveNavItem(item);
	};

	const contextValue = useMemo(
		() => ({
				navItem: activeNavItem,
				updateNavItem: updatePage,
			}),
		[activeNavItem],
	);

	return (
		<FormPageContext value={contextValue}>
			{props.children}
		</FormPageContext>
	);
}

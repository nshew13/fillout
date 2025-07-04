import React, {createContext, useCallback, useMemo, useState} from 'react';
import {type IFormPage} from '@/types/IFormPage';

export interface IFormNavContext {
	// data
	activeNavItemID: IFormPage['id'];

	// methods
	updateActivePage: (page: IFormPage) => void;
}

type TProps = Readonly<{
	children: React.ReactNode;
}>;

export const FormNavContext = createContext<IFormNavContext | null>(null);

export function FormNavProvider (props: TProps) {
	const [activeNavItemID, setActiveNavItemID] = useState<IFormNavContext['activeNavItemID']>(0);

	const updateActivePage = useCallback((page: IFormPage) => {
		setActiveNavItemID(page.id);
	}, []);

	const contextValue = useMemo(
		() => ({
			activeNavItemID,
			updateActivePage,
		}),
		[activeNavItemID],
	);

	return (
		<FormNavContext value={contextValue}>
			{props.children}
		</FormNavContext>
	);
}

import AddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import React, {Context, useContext} from 'react';
import {FormPageContext, type IFormPageContext} from '@/context/FormPageContext';
import {type INavItem} from '@/types/INavItem';

type TProps = Readonly<{
	afterID: INavItem['id'];
}>;

export default function NavButtonSpacer (props: TProps) {
	const formContext = useContext(FormPageContext as Context<IFormPageContext>);

	const addPage = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext?.addPage(props.afterID);
	};

	return (
		<div className="h-[100%] w-[40px] group">
			<div className="h-[50%] border-b-2 border-dashed border-gray-300"></div>
			{/* 13px = (container's 40px - 15px icon width) / 2  */}
			<AddBoxOutlined
				className="bg-white w-[15px] invisible group-hover:visible cursor-pointer translate-x-[13px] translate-y-[-15px]"
				onClick={addPage}
			/>
		</div>
	);
}

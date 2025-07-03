import React, {Context, useContext} from 'react';
import {FormPageContext, type IFormPageContext} from '@/context/FormPageContext';
import MuiIconAddBoxOutlined from '@mui/icons-material/AddBoxOutlined';
import {type IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	afterPage: IFormPage;
}>;

export default function NavButtonSpacer (props: TProps) {
	const formContext = useContext(FormPageContext as Context<IFormPageContext>);

	const addPage = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext.addPage(props.afterPage);
	};

	return (
		<div className="h-[35px] w-[40px] group">
			<div className="h-[50%] border-b-2 border-dashed border-gray-300"></div>
			{/* horizontal offset of 8px = (<container's 40px width> - <24px icon width>) / 2 */}
			<MuiIconAddBoxOutlined
				className="bg-white invisible group-hover:visible cursor-pointer translate-x-[8px] translate-y-[-16px] text-gray-300"
				onClick={addPage}
			/>
		</div>
	);
}

import React, {Context, useContext} from 'react';
import {FormContext, type IFormContext} from '@/context/FormContext';
import MuiIconAdd from '@mui/icons-material/Add';
import {type IFormPage} from '@/types/IFormPage';

type TProps = Readonly<{
	afterPage: IFormPage;
}>;

export default function NavButtonSpacer (props: TProps) {
	const formContext = useContext(FormContext as Context<IFormContext>);

	const addPage = (event: React.MouseEvent) => {
		event.stopPropagation();
		formContext.addPage(props.afterPage);
	};

	return (
		<div className="relative h-[35px] w-[40px] hover:w-[70px] group flex flex-col justify-center items-center">
			<div className="absolute h-0 w-full border-b-2 border-dashed border-gray-300"></div>
			<div className="z-1 p-0 m-0 w-min h-min aspect-square flex flex-col justify-center items-center rounded-full bg-white outline-2 outline-gray-300 invisible group-hover:visible cursor-pointer">
				<MuiIconAdd sx={{fontSize: '16px'}} className="p-0 m-0 text-black" onClick={addPage} />
			</div>
		</div>
	);
}

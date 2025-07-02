'use client';

import {FormPageProvider} from '@/context/FormPageContext';
import FormNavBar from '@/ui/FormNav/FormNavBar';
import FormPage from '@/ui/FormPage';

export default function Home() {
	return (
		<FormPageProvider>
			<FormPage />
			<FormNavBar />
		</FormPageProvider>
	);
}

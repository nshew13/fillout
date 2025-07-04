'use client';

import {FormNavProvider} from '@/context/FormNavContext';
import {FormProvider} from '@/context/FormContext';
import FormNavBar from '@/ui/FormNav/FormNavBar';
import FormPage from '@/ui/FormPage';

export default function Home() {
	return (
		<FormNavProvider>
			<FormProvider>
				<FormPage />
				<FormNavBar />
			</FormProvider>
		</FormNavProvider>
	);
}

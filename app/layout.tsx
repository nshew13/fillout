import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import PrelineScriptWrapper from '@/ui/PrelineScriptWrapper';

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
});

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
});

export const metadata: Metadata = {
	title: 'Fillout',
	description: 'front-end take-home for Nicholas Shewmaker',
};

type TProps = Readonly<{
	children: React.ReactNode;
}>;

export default function FormBuilderLayout({
	children,
}: TProps) {
	return (
		<html lang="en">
		<body
			className={`${geistSans.variable} ${geistMono.variable} antialiased`}
		>
		<div className="w-screen h-screen flex flex-col justify-stretch items-center p-6">
			{children}
		</div>
		<PrelineScriptWrapper />
		</body>
		</html>
	);
}

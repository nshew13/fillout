import FormNavBarItem from '@/ui/FormNav/FormNavBarItem';

type TProps = Readonly<{
}>;

export default function FormNavBar({
}: TProps) {
	return (
		<nav className="flex justify-self-start gap-4">
			<FormNavBarItem name="Page 1" />
			<FormNavBarItem name="Page 2" />
			<FormNavBarItem name="Page 3" />
			<FormNavBarItem name="Page 4" />
		</nav>
	);
}

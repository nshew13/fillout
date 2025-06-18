import { faCircleCheck, faFileLines } from '@fortawesome/free-regular-svg-icons'
import { faCircleInfo  } from '@fortawesome/free-solid-svg-icons'

export const FormNavIconMap = {
	'check': faCircleCheck,
	'info': faCircleInfo,
	'page': faFileLines,
} as const;

export type TFormNavIcon = keyof typeof FormNavIconMap;

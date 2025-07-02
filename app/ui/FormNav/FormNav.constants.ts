import CircleCheckOutline from '@mui/icons-material/CheckCircleOutline';
import DescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

export const FormNavIconMap = {
	'check': CircleCheckOutline,
	'info': ErrorOutline,
	'page': DescriptionOutlined,
} as const;

export type TFormNavIcon = keyof typeof FormNavIconMap;

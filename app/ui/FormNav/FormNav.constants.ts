import MuiIconCircleCheckOutline from '@mui/icons-material/CheckCircleOutline';
import MuiIconDescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import MuiIconErrorOutline from '@mui/icons-material/ErrorOutline';

export const FormNavIconMap = {
	'check': MuiIconCircleCheckOutline,
	'info': MuiIconErrorOutline,
	'page': MuiIconDescriptionOutlined,
} as const;

export type TFormNavIcon = keyof typeof FormNavIconMap;

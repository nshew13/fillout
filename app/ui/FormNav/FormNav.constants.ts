import MuiIconAdd from '@mui/icons-material/Add';
import MuiIconCircleCheckOutline from '@mui/icons-material/CheckCircleOutline';
import MuiIconDescriptionOutlined from '@mui/icons-material/DescriptionOutlined';
import MuiIconErrorOutline from '@mui/icons-material/ErrorOutline';

export const FormNavIconMap = {
	'check': MuiIconCircleCheckOutline,
	'info': MuiIconErrorOutline,
	'page': MuiIconDescriptionOutlined,
	'plus': MuiIconAdd,
} as const;

export type TFormNavIcon = keyof typeof FormNavIconMap;

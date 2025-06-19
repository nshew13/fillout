import {type FragmentProps} from 'react';

interface IProps extends FragmentProps {
	id?: string;
}

/**
 * allows Fragment to accept (and ignore) an `id` attr
 *
 * ReactSortable adds `id` attrs to its children. On a
 * Fragment, this causes an error. Using an HTML element
 * introduces unnecessary complexity into the layout.
 *
 * (If needed, this could be extended to accept any,
 * additional attributes/props, but let's weed those out
 * deliberately, rather than a type with a blanket, string
 * index signature.
 *
 * @param props
 * @constructor
 */
export default function FragmentSortable(props: IProps) {
	const {
		children
	} = props;

	return <>{children}</>;
};

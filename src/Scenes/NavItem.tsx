import { NavLink, useLocation } from "react-router-dom";

interface Props {
	page: string;
	link: string;
	location: string;
	defaultColor: string;
}

export const NavItem = ({
	page,
	link,
	location,
	defaultColor,
	children,
}: Props) => {
	const { pathname } = useLocation();
	const url = pathname.split("/");

	return (
		<NavLink
			to={link}
			className={({ isActive }) =>
				`flex text-sm items-center gap-3 p-2 font-medium ${
					isActive && location === url[url.length - 1]
						? `text-${defaultColor} bg-white rounded-tr-[6px] rounded-bl-[6px]`
						: " text-white hover:bg-indigo-500 duration-300 ease-in-out delay-50"
				} `
			}>
			{children}
			{page}
		</NavLink>
	);
};

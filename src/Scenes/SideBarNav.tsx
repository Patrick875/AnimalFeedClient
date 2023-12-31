// import { Logo } from "../../shared/Logo";
import { navitem } from "../types";
import { NavItem } from "./NavItem";

interface SideBarNavProps {
	navlinks: navitem[];
	backgroundColor: string;
}

export const SideBarNav = ({ navlinks, backgroundColor }: SideBarNavProps) => {
	return (
		<aside
			className={`sticky top-0 self-start min-h-screen col-span-2 ${backgroundColor} `}>
			<div className=" flex flex-col min-w-[24vw]">
				<div className="p-4 text-2xl text-white basis-1/8">
					{/* <Logo textColor="text-primary-white" /> */}
					LOGO
				</div>
				<div className="w-full">
					{navlinks.map((el) => (
						<NavItem
							key={crypto.randomUUID()}
							page={el.page}
							link={el.link}
							defaultColor={backgroundColor}
							location={el.location}>
							{el.icon}
						</NavItem>
					))}
				</div>
			</div>
		</aside>
	);
};

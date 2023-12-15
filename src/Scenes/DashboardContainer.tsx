import { Outlet } from "react-router-dom";
import { SideBarNav } from "./SideBarNav";
import { useAuth } from "./Context/AuthContext";
import { FaCow } from "react-icons/fa6";
import { CiHome } from "react-icons/ci";

type Props = {};

const navlinks: navitem[] = [
	{
		page: "Dashboard",
		link: "",
		icon: <CiHome />,
		location: "admin",
	},
	{
		page: "Cattle",
		link: "cattle",
		icon: <FaCow />,
		location: "cattle",
	},
];

const DashboardContainer = (props: Props) => {
	const { user, isAuth } = useAuth();
	return (
		<div className="grid grid-cols-8 w-100 font-nunito">
			<SideBarNav navlinks={navlinks} backgroundColor="bg-teal-900" />
			<div className="col-span-6 ">
				<div className="px-6 py-1">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardContainer;

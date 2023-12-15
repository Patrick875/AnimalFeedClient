import { Outlet } from "react-router-dom";
import { SideBarNav } from "./SideBarNav";
import { useAuth } from "./Context/AuthContext";
import { FaCow } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
import { navitem } from "../types";

const navlinks: navitem[] = [
	{
		page: "Cattle",
		link: "",
		icon: <FaCow />,
		location: "",
	},
];

const DashboardContainer = () => {
	const { logoutUser } = useAuth();

	return (
		<div className="grid grid-cols-8 w-100 font-nunito">
			<SideBarNav navlinks={navlinks} backgroundColor="bg-teal-900" />
			<div className="col-span-6 ">
				<div className="flex items-center justify-between px-4 py-6 bg-slate-100">
					<p className="font-medium">Cattle Management Admin</p>
					<button
						onClick={() => logoutUser()}
						className="flex items-center gap-2 px-6 py-2 text-sm font-medium text-white rounded-full bg-sky-900">
						<p>Logout</p>
						<CiLogout className="w-5 h-5" />
					</button>
				</div>
				<div className="px-6 py-1">
					<Outlet />
				</div>
			</div>
		</div>
	);
};

export default DashboardContainer;

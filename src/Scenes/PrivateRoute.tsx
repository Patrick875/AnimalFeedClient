import { ReactElement } from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";

interface privateRoutesProps {
	element: ReactElement;
}
export const PrivateRoutes = ({ element }: privateRoutesProps) => {
	const { user } = useAuth();
	console.log(user);

	if (user) {
		<Navigate to="/admin" />;
		return element;
	} else {
		return <Navigate to="/" />;
	}
};

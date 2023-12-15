import { ReactNode, createContext, useContext, useState } from "react";
import Cookie from "js-cookie";
interface user {
	names: string;
	email: string;
	telephone: string;
}
interface authContextType {
	isAuth: boolean;
	user: user | null;
	loginUser: (user: user) => void;
	logoutUser: () => void;
}

const authContext = createContext<authContextType | null>(null);
export const useAuth = () => {
	const context = useContext(authContext);
	if (!context) {
		throw new Error("useAuth is only used inside authProvider");
	}
	return context;
};
interface providerProps {
	children: ReactNode;
}

export const AuthProvider = ({ children }: providerProps) => {
	const browserUserString = Cookie.get("user");
	const browserUser = browserUserString ? JSON.parse(browserUserString) : null;
	const authenticated =
		Cookie.get("token") &&
		Cookie.get("token") !== "" &&
		Cookie.get("token") !== null
			? true
			: false;
	const [isAuth, setIsAuth] = useState<boolean>(authenticated);
	const [user, setUser] = useState<user | null>(browserUser);

	const loginUser = (userData: user): void => {
		setIsAuth(true);
		setUser(userData);
	};

	const logoutUser = (): void => {
		Cookie.remove("token");
		Cookie.remove("user");
		setUser(null);
		setIsAuth(false);
	};

	return (
		<authContext.Provider value={{ user, isAuth, loginUser, logoutUser }}>
			{children}
		</authContext.Provider>
	);
};

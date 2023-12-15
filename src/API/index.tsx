import axios from "axios";
import Cookie from "js-cookie";
import { serverDev } from "../types/constants";

const instance = axios.create({
	baseURL: serverDev,
});

instance.interceptors.response.use(function (response) {
	if (response.data && response.data.user) {
		Cookie.set(
			"user",
			JSON.stringify({
				userId: response.data.user.id,
				username: response.data.user.username,
				email: response.data.user.email,
				role: response.data.user.role,
			})
		);
		Cookie.set("token", response.data.token);
	}
	return response;
});
instance.interceptors.request.use(function (request) {
	const user = Cookie.get("user");
	const userCookie = Cookie.get("user");
	const { names } = userCookie ? JSON.parse(userCookie) : { names: null };

	if (user) {
		request.headers.names = names;
	}
	return request;
});

export default instance;

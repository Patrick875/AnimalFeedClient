import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import loginArt from "./../assets/loginart.svg";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";

import instance from "../API";
import { useAuth } from "./Context/AuthContext";

// interface loginData {
// 	user: string;
// 	password: string;
// }
interface error {
	status: boolean;
	message: string;
}

const Login = () => {
	const { loginUser } = useAuth();
	const [success, setSuccess] = useState<boolean>(false);
	const [error, setError] = useState<error | null>(null);
	const [loading, setLoading] = useState<boolean>(false);
	const { register, handleSubmit, reset } = useForm();
	const navigate = useNavigate();
	const clearError = () => {
		setError(null);
	};
	const onSubmit = async (data: any) => {
		setLoading(true);
		await instance
			.post("/login", data)
			.then((res) => {
				setSuccess(true);
				loginUser({
					names: res.data.user.names,
					email: res.data.user.email,
					telephone: res.data.user.telephone,
				});
				navigate(`/admin`);
				reset();
			})
			.catch((err) => {
				console.log(err);
				setError({ status: true, message: err.response.data.message });
			})
			.finally(() => {
				setLoading(false);
			});
	};

	return (
		<motion.div
			initial={{ opacity: 0, x: -50 }}
			animate={{ opacity: 1, x: 0, transition: { duration: 0.8 } }}
			className="flex items-center w-full min-h-screen">
			<div className="p-8 mx-auto basis-2/5">
				<div className="flex justify-center">
					<img
						src={loginArt}
						alt="computer login"
						className="block w-40 h-40"
					/>
				</div>
				<form onSubmit={handleSubmit(onSubmit)} className="">
					<label className="block text-xs">Email/Telephone</label>
					<input
						className="w-full px-3 py-1 my-1 font-light border border-gray-300 placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
						type="text"
						placeholder="Email/Telephone"
						{...register("user")}
						onFocus={clearError}
					/>
					<label className="block text-xs">Password</label>

					<input
						className="w-full px-3 py-1 my-1 font-light border border-gray-300 placeholder:text-xs placeholder:italic focus-outline:none focus:outline-none focus:border-gray-700 focus:ring-1 focus:ring-gray-900"
						type="password"
						placeholder="Password"
						{...register("password")}
						onFocus={clearError}
					/>
					<button
						disabled={loading}
						className={`  w-full py-2 mt-3 text-sm font-semibold text-center  ${
							!loading ? " text-white bg-sky-800" : " text-sky-900 bg-[#E4F1FE]"
						}`}>
						Login
					</button>
				</form>
				<p className="mt-3 text-sm text-center">
					Forgot your password ?{" "}
					<span className="font-medium text-sky-900">
						<Link to="/reset-password">Reset password</Link>
					</span>
				</p>
				{error && error.status && (
					<div className="flex items-center justify-center w-4/5 p-2 mx-auto mt-2 bg-pink-100 border border-pink-700 ">
						<p className="text-xs font-medium text-center text-pink-800 capitalize align-middle ">
							{error.message}
						</p>
					</div>
				)}
				{success && (
					<div className="flex justify-center w-full mt-2 bg-[#D4E7DB] border border-teal-800">
						<p className="text-center text-teal-800">Login SuccessFull</p>
					</div>
				)}
			</div>
		</motion.div>
	);
};

export default Login;

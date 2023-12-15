import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../API";
import { error, animal, weightandtime } from "../types";
import { BackButton } from "./BackButton";

const Animal = () => {
	const { pathname } = useLocation();
	const urlParams = pathname.split("/");
	const id = urlParams[urlParams.length - 1];
	const [loading, setLoading] = useState<boolean>(false);
	const [errorState, setError] = useState<error | null>(null);
	const [animalData, setAnimal] = useState<animal | null>(null);

	useEffect(() => {
		const getAnimal = async () => {
			setLoading(true);

			try {
				const res = await instance.get(`/animals/${id}`);
				setAnimal(res.data.data);
			} catch (err: any) {
				setError({
					status: (err.response && err.response.data?.status) || 500,
					message:
						(err.response && err.response.data?.message) ||
						"Internal Server Error",
				});
			} finally {
				setLoading(false);
			}
		};

		getAnimal();
	}, [id]);

	return (
		<div>
			<BackButton />
			<p className="font-medium capitalize text-md">Cattle ID : {id}</p>
			<p className="mt-4 ">Cattle Data</p>
			<table className="w-full mt-3 ">
				<tr className="bg-gray-200 border-2 border-black">
					<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left border-2 border-black whitespace-nowrap">
						Date
					</th>
					<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left border-2 border-black whitespace-nowrap">
						Weight (Kg)
					</th>
					<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left border-2 border-black whitespace-nowrap">
						Feeded Time (min)
					</th>
				</tr>
				{loading ? (
					<p>Loading ...</p>
				) : (
					<tbody>
						{animalData &&
							animalData.weightandtime &&
							animalData.weightandtime.length !== 0 &&
							animalData.weightandtime.map((animalItem: weightandtime) => (
								<tr className="bg-gray-200 border-1" key={animalItem._id}>
									<td className="p-3 text-xs capitalize border-2 border-black whitespace-nowrap">
										{new Date(animalItem.date).toLocaleDateString("fr-FR")}
									</td>
									<td className="p-3 text-xs capitalize border-2 border-black whitespace-nowrap">
										{animalItem.weight}
									</td>
									<td className="p-3 text-xs capitalize border-2 border-black whitespace-nowrap">
										{parseFloat(
											(animalItem.time / 6000).toString()
										).toPrecision(3)}
									</td>
								</tr>
							))}
					</tbody>
				)}
				{errorState && errorState ? <p>{errorState.message}</p> : null}
			</table>
		</div>
	);
};

export default Animal;

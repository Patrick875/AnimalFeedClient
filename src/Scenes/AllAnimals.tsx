import { useEffect, useState } from "react";
import { animal } from "../types";
import instance from "../API";
import { useNavigate } from "react-router-dom";

const AllAnimals = () => {
	const navigate = useNavigate();
	const [loading, setLoading] = useState<boolean>(false);
	const [animals, setAnimals] = useState<animal[] | null>([]);
	useEffect(() => {
		const getAnimals = async () => {
			setLoading(true);
			await instance
				.get("/animals/all")
				.then((res) => {
					setAnimals(res.data.data);
				})
				.catch((err) => {
					console.log(err);
				})
				.finally(() => {
					setLoading(false);
				});
		};
		getAnimals();
	}, []);

	return (
		<div className="p-4">
			<p className="font-medium capitalize text-md"> Cattle Feed History </p>
			<table className="w-full mt-3 ">
				<tr className="bg-gray-200 border-2 border-black">
					<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left border-2 border-black whitespace-nowrap">
						No
					</th>
					<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left border-2 border-black whitespace-nowrap">
						ID
					</th>
					<th className="w-20 p-3 text-xs font-semibold tracking-wide text-left border-2 border-black whitespace-nowrap">
						CreatedAt
					</th>
				</tr>
				{loading ? (
					<p>Loading ...</p>
				) : (
					<tbody>
						{animals &&
							animals.length !== 0 &&
							animals.map((animal, i) => (
								<tr
									onClick={() => {
										navigate(`${animal.animalId}`);
									}}
									className="bg-gray-200 cursor-pointer border-1"
									key={crypto.randomUUID()}>
									<td className="p-3 text-xs capitalize border-2 border-black whitespace-nowrap">
										{i + 1}
									</td>
									<td className="p-3 text-xs capitalize border-2 border-black whitespace-nowrap">
										{animal.animalId}
									</td>
									<td className="p-3 text-xs capitalize border-2 border-black whitespace-nowrap">
										{new Date(animal.createdAt).toLocaleDateString("fr-FR")}
									</td>
								</tr>
							))}
					</tbody>
				)}
			</table>
		</div>
	);
};

export default AllAnimals;

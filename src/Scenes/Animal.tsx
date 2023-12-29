import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import instance from "../API";
import { error, animal, weightandtime } from "../types";
import { BackButton } from "./BackButton";
import CowDataChart from "../shared/CowDataChart";

const Animal = () => {
	const { pathname } = useLocation();
	const urlParams = pathname.split("/");
	const id = urlParams[urlParams.length - 1];
	const [loading, setLoading] = useState<boolean>(false);
	const [errorState, setError] = useState<error | null>(null);
	const [animalData, setAnimal] = useState<animal | null>(null);
	console.log("animal", animalData);

	useEffect(() => {
		const getAnimal = async () => {
			setLoading(true);

			try {
				const res = await instance.get(`/animals/${id}`);
				if (res.data.data) {
					let animal: animal = res.data.data;
					const animalWeightAndTime: weightandtime[] = animal.weightandtime.map(
						(el: weightandtime) => ({
							...el,
							time: el.time / 1000,
							name: new Date(el.date).toLocaleString("fr-FR"),
						})
					);
					animal.weightandtime = animalWeightAndTime;

					setAnimal(animal);
				}
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
			{/* <p className="font-medium capitalize text-md">Cattle ID : {id}</p> */}
			<p className="mt-4 ">Cattle Data</p>
			<div>
				<p className="py-2 my-2 text-sm font-medium">
					Graphical Data for {animalData?.animalId}
				</p>
				{loading && (
					<p className="w-full text-xs text-center text-sky-900">loading...</p>
				)}
				{animalData &&
					animalData.weightandtime &&
					animalData.weightandtime.length !== 0 && (
						<React.Fragment>
							<div className="p-4 shadow-md h-72 ">
								<CowDataChart
									data={animalData!.weightandtime}
									yKey="weight"
									yKeyName="Weight"
									strokeColor="#ab154c"
									titleText="Weight Vs Date Graph"
								/>
							</div>
							<div className="px-4 py-2 shadow-md h-72 ">
								<CowDataChart
									data={animalData!.weightandtime}
									yKey="time"
									yKeyName="Time"
									strokeColor="#1542ab"
									titleText="Feeding time  Vs Date Graph"
								/>
							</div>
						</React.Fragment>
					)}
			</div>
		</div>
	);
};

export default Animal;

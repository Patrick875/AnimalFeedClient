import { ReactElement } from "react";

export interface error {
	status: string;
	message: string;
}
export interface navitem {
	page: string;
	link: string;
	icon: ReactElement;
	location: string;
}
export interface weightandtime {
	_id: string;
	animal: string;
	weight: number;
	time: number;
	date: string;
	name?: string;
	__v: number;
}
export interface animal {
	_id: string;
	animalId: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
	weightandtime: weightandtime[] | null;
}

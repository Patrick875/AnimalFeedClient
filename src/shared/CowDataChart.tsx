import {
	LineChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer,
	Label,
} from "recharts";
import { weightandtime } from "../types";

interface chartProps {
	data: weightandtime[] | null;
	yKey: string;
	yKeyName: string;
	strokeColor: string;
	titleText: string;
}

export default function CowDataChart({
	data,
	yKey,
	yKeyName,
	strokeColor,
	titleText,
}: chartProps) {
	return (
		<ResponsiveContainer width="100%" height="100%">
			<LineChart
				width={500}
				height={300}
				data={data ? data : []}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />

				<YAxis dataKey={yKey}>
					<Label
						value={yKeyName}
						offset={-6}
						position="insideLeft"
						angle={-90}
					/>
				</YAxis>
				<Tooltip />
				<Legend
					verticalAlign="top"
					height={36}
					content={<p className="py-1 text-xs capitalize">{titleText}</p>}
				/>
				<Line
					type="monotone"
					dataKey={yKey}
					stroke={strokeColor}
					activeDot={{ r: 8 }}
				/>
			</LineChart>
		</ResponsiveContainer>
	);
}

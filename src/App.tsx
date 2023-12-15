import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Scenes/Login";
import DashboardContainer from "./Scenes/DashboardContainer";
import AllAnimals from "./Scenes/AllAnimals";
import Animals from "./Scenes/Animals";
import Animal from "./Scenes/Animal";
import { PrivateRoutes } from "./Scenes/PrivateRoute";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />

				<Route
					path="/admin"
					element={<PrivateRoutes element={<DashboardContainer />} />}>
					<Route path="" element={<Animals />}>
						<Route index element={<AllAnimals />} />
						<Route path=":animalId" element={<Animal />} />
					</Route>
				</Route>
			</Routes>
		</>
	);
}

export default App;

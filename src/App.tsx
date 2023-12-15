import { Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./Scenes/Login";
import DashboardContainer from "./Scenes/DashboardContainer";
import Dashboard from "./Scenes/Dashboard";
import Animals from "./Scenes/Animals";

function App() {
	return (
		<>
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/admin" element={<DashboardContainer />}>
					<Route index element={<Dashboard />} />
					<Route path="cattle" element={<Animals />} />
				</Route>
			</Routes>
		</>
	);
}

export default App;

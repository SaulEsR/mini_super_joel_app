import { Route, Routes } from "react-router-dom";
import routes from "./utils/router";
import NavBar from "./components/NavBar";

const App = () => {
	return (
		<>
			<NavBar />
			<Routes>
				{routes.map((route) => (
					<Route path={route.path} key={route.index}>
						<Route index element={route.element} />
					</Route>
				))}
			</Routes>
		</>
	);
};

export default App;

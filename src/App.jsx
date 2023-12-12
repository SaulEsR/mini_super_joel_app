import { Route, Routes } from "react-router-dom";
import routes from "./routes/routes";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

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
			<Footer />
		</>
	);
};

export default App;

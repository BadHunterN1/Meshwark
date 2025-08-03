import { queryClient } from "./config/query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import RoutePage from "./pages/RoutePage";
import FavouritePage from "./pages/FavouritePage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import StationInfo from "./pages/StationInfo";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootLayout />,
		errorElement: <ErrorPage />,
		children: [
			{
				index: true,
				element: <HomePage />,
			},
			{
				element: <StationInfo />,
				path: "station-info",
			},
			{
				element: <RoutePage />,
				path: "paths",
			},
			{
				element: <FavouritePage />,
				path: "favourite",
			},
		],
	},
]);
function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<RouterProvider router={router} />
		</QueryClientProvider>
	);
}

export default App;

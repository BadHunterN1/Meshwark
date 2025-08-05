import { queryClient } from "./config/query";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import HomePage from "./pages/HomePage";
import TripPage from "./pages/TripPage";
import FavouritePage from "./pages/FavouritePage";
import RootLayout from "./pages/RootLayout";
import ErrorPage from "./pages/ErrorPage";
import StationInfo from "./pages/StationInfo";
import Login from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import UserContextProvider from "./Context/UserContext";
import ContactUs from "./pages/contactUs";
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
				element: <TripPage />,
				path: "trip",
			},
			{
				element: <FavouritePage />,
				path: "favourite",
			},
			{
				element: <Login />,
				path: "login",
			},
			{
				element: <Register />,
				path: "register",
			},
			{
				element: <ContactUs/>,
				path: "contactUs",
			},
		],
	},
]);
function App() {
	return (
		<UserContextProvider>
			<QueryClientProvider client={queryClient}>
				<RouterProvider router={router} />
			</QueryClientProvider>
		</UserContextProvider>
	);
}

export default App;

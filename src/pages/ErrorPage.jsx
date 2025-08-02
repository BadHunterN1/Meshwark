import { Link } from "react-router-dom";
import { Home, AlertTriangle, ArrowLeft } from "lucide-react";

export default function ErrorPage() {
	return (
		<div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
			<div className="max-w-md w-full">
				<div className="text-center mb-8">
					<div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 rounded-full mb-4 animate-pulse">
						<AlertTriangle className="w-10 h-10 text-red-600" />
					</div>
					<h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>
					<h2 className="text-2xl font-semibold text-gray-700 mb-2">
						Oops! Page Not Found
					</h2>
				</div>

				<div className="space-y-4">
					<Link
						to="/"
						className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
						<Home className="w-5 h-5" />
						Go Home
					</Link>

					<button
						onClick={() => window.history.back()}
						className="w-full flex items-center justify-center gap-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95">
						<ArrowLeft className="w-5 h-5" />
						Go Back
					</button>
				</div>
			</div>
		</div>
	);
}

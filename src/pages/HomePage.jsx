import Hero from "../components/Home Sections/Hero";
import Login from "../components/Home Sections/Login";
import MiniMap from "../components/Home Sections/Minimap";
import Register from "../components/Home Sections/Register";

export default function HomePage() {
	return (
		<>
			<Hero />
			<MiniMap/>
			<Register/>
			<Login/>
		</>
	);
}

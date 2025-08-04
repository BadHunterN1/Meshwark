import Future from "../components/Home Sections/future";
import Hero from "../components/Home Sections/Hero";
import HeroSection from "../components/Home Sections/HeroSection/HeroSection";
import Testmonials from "../components/Home Sections/Testmonials";

export default function HomePage() {
	return (
		<>
		<HeroSection />
		<Future/>
		<Hero />
		<Testmonials />
		</>
	);
}

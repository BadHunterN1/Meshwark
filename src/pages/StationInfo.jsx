import { Star } from "lucide-react";
import busImg from "../assets/busstation.jpg";
import StationDetails from "../components/StationInfo Sections/StationDetails";
import StationComplain from "../components/StationInfo Sections/StationComplain";
import StationReview from "../components/StationInfo Sections/StationReview";
export default function StationInfo() {
	return (
		<section>
			<main className="container">
				<h1 className="text-2xl md:text-4xl text-center font-bold w-full">
					محطة الجامعة الرئيسية
				</h1>
				<div className="flex mt-3 gap-2 items-center justify-center">
					{[1, 2, 3, 4].map((star) => (
						<Star
							key={star}
							className="text-[var(--main-color)] size-5 md:size-6"
							fill="hsl(213, 98%, 60%)"
						/>
					))}
					<Star className="size-5 md:size-6" />
					<span>4.2</span>
					<span>(156تقييم)</span>
				</div>
				<img
					src={busImg}
					alt="bus"
					className="object-cover mt-3 lg:h-96 w-full rounded-xl"
				/>
				<div className="mt-5 flex gap-4 flex-wrap lg:flex-nowrap">
					<div className="flex gap-4 flex-col items-center w-full lg:w-1/2">
						<StationDetails />
						<StationComplain />
					</div>
					<div className="w-full lg:w-1/2 h-full">
						<StationReview />
					</div>
				</div>
			</main>
		</section>
	);
}

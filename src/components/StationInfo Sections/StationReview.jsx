import { Star } from "lucide-react";
import { useState } from "react";
import Button from "../UI/Button";

export default function StationReview() {
	const [rating, setRating] = useState(0);

	return (
		<div className="flex flex-col gap-2 p-6 bg-white rounded-2xl w-full">
			<h2 className="text-2xl font-bold text-gray-800 mb-6">
				التقييمات و المراجعه
			</h2>
			<form className="mb-6">
				<p className="mb-2 font-medium">اترك تقييمك:</p>
				<div className="flex gap-1 justify-end mb-2">
					<Star
						size={20}
						className={`cursor-pointer ${
							rating >= 1
								? "fill-[var(--main-color)] stroke-[var(--main-color)]"
								: "stroke-gray-400"
						}`}
						onClick={() => setRating(1)}
					/>
					<Star
						size={20}
						className={`cursor-pointer ${
							rating >= 2
								? "fill-[var(--main-color)] stroke-[var(--main-color)]"
								: "stroke-gray-400"
						}`}
						onClick={() => setRating(2)}
					/>
					<Star
						size={20}
						className={`cursor-pointer ${
							rating >= 3
								? "fill-[var(--main-color)] stroke-[var(--main-color)]"
								: "stroke-gray-400"
						}`}
						onClick={() => setRating(3)}
					/>
					<Star
						size={20}
						className={`cursor-pointer ${
							rating >= 4
								? "fill-[var(--main-color)] stroke-[var(--main-color)]"
								: "stroke-gray-400"
						}`}
						onClick={() => setRating(4)}
					/>
					<Star
						size={20}
						className={`cursor-pointer ${
							rating >= 5
								? "fill-[var(--main-color)] stroke-[var(--main-color)]"
								: "stroke-gray-400"
						}`}
						onClick={() => setRating(5)}
					/>
				</div>
				<textarea
					id="review-area"
					className="w-full border rounded-lg p-2 text-sm focus:outline-none focus:ring focus:border-blue-300"
					rows="3"
					placeholder="اكتب تعليقك هنا..."
				/>
				<Button title={"إرسال التقييم"} />
			</form>

			<div className="border-t pt-5">
				<h3 className="text-lg font-semibold mb-4">المراجعات الاخيرة:</h3>

				<div className="p-4 border rounded-lg">
					<div className="flex justify-between items-center mb-2">
						<div className="flex items-center gap-2">
							<div className="bg-gray-300 text-gray-800 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold">
								أ
							</div>
							<div className="text-sm font-medium">أحمد محمد</div>
						</div>
						<span className="text-xs text-gray-500">منذ يومين</span>
					</div>

					<div className="flex flex-row-reverse gap-1 mb-2">
						<Star
							className="text-[var(--main-color)] size-5 "
							fill="hsl(213, 98%, 60%)"
						/>
						<Star
							className="text-[var(--main-color)] size-5 "
							fill="hsl(213, 98%, 60%)"
						/>
						<Star
							className="text-[var(--main-color)] size-5 "
							fill="hsl(213, 98%, 60%)"
						/>
						<Star
							className="text-[var(--main-color)] size-5 "
							fill="hsl(213, 98%, 60%)"
						/>
						<Star
							className="text-[var(--main-color)] size-5 "
							fill="hsl(213, 98%, 60%)"
						/>
					</div>

					<p className="text-sm text-gray-700 leading-relaxed">
						محطة ممتازة ومواصلات متوفرة باستمرار
					</p>
				</div>
			</div>
		</div>
	);
}

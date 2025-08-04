import { Bus, Clock, MapPin } from "lucide-react";

export default function StationDetails() {
	return (
		<div className="p-6 bg-white rounded-2xl w-full">
			<h3 className="pb-5 flex gap-2 text-2xl">
				<MapPin className="text-[var(--main-color)]" /> تفاصيل المحطة
			</h3>
			<div>
				<h4 className="text-xl pb-2">المعالم القريبة:</h4>
				<div className="flex gap-4 pb-4">
					<span className="bg-[var(--secondary-color)] rounded-2xl px-2 text-white text-sm">
						جامعة المنصورة
					</span>
					<span className="bg-[var(--secondary-color)] rounded-2xl px-2 text-white text-sm">
						مستشفي الطوارئ
					</span>
				</div>
			</div>
			<div>
				<h4 className="text-xl pb-2">وسائل النقل المتوفرة:</h4>
				<p className="text-sm text-gray-600">
					<Bus className="text-[var(--main-color)] inline mx-2" /> باص{" "}
					<span className="rounded-2xl border px-2 text-xs">متوفرة</span>
				</p>
				<p className="text-sm text-gray-600">
					<Bus className="inline mx-2" /> باص
				</p>
				<p className="text-sm text-gray-600">
					<Clock className="text-[var(--main-color)] inline mx-2" />
					ساعات العمل: 6:00ص - 11:00م
				</p>
			</div>
		</div>
	);
}

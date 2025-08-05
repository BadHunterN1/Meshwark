import React from "react";
import { Heart, Eye, Trash2, MapPin } from "lucide-react";

function FavouritesCards() {
	return (
		<div className="text-center px-6 py-12">
			<div className="flex justify-center items-center gap-3 text-4xl font-bold text-black mb-4">
				<Heart size={32} className="text-[var(--main-color)]" />
				<span>المفضلة</span>
			</div>

			<p className="text-2xl text-gray-600 mb-10">
				محطاتك المحفوظة للوصول السريع
			</p>

			{/* الكارت الأول */}
			<div className="relative bg-white rounded-2xl hover:shadow-lg flex flex-col md:flex-row gap-6 p-8 mb-8 max-w-5xl mx-auto text-right">
				<Heart
					size={28}
					className="absolute left-6 top-6 text-[var(--main-color)] fill-[var(--main-color)]"
				/>
				<div className="flex-1 space-y-4 w-full">
					<div className="text-2xl font-semibold text-gray-800">الاستاد</div>
					<div className="text-lg text-gray-600">
						الطريق الأسرع من جامعة المنصورة إلى ميدان الجمهورية
					</div>
					<div className="space-y-2 text-base text-gray-600">
						<div className="flex items-center gap-2">
							<MapPin size={20} />
							<span className="font-medium">من:</span> جامعة المنصورة
						</div>
						<div className="flex items-center gap-2">
							<MapPin size={20} />
							<span className="font-medium">إلى:</span> ميدان الجمهورية
						</div>
					</div>
					<div className="flex gap-4 pt-4 flex-wrap justify-end mr-16">
						<button className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
							<Eye size={20} /> عرض التفاصيل
						</button>
						<button className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
							<Trash2 size={20} /> إزالة من المفضلة
						</button>
					</div>
				</div>
			</div>

			<div className="relative bg-white rounded-2xl hover:shadow-lg flex flex-col md:flex-row gap-6 p-8 mb-8 max-w-5xl mx-auto text-right">
				<Heart
					size={28}
					className="absolute left-6 top-6 text-[var(--main-color)] fill-[var(--main-color)]"
				/>
				<div className="flex-1 space-y-4 w-full">
					<div className="text-2xl font-semibold text-gray-800">الجامعة</div>
					<div className="text-lg text-gray-600">
						طريق مناسب للوصول إلى محطة القطار
					</div>
					<div className="space-y-2 text-base text-gray-600">
						<div className="flex items-center gap-2">
							<MapPin size={20} />
							<span className="font-medium">من:</span> المستشفى الجامعي
						</div>
						<div className="flex items-center gap-2">
							<MapPin size={20} />
							<span className="font-medium">إلى:</span> محطة القطار
						</div>
					</div>
					<div className="flex gap-4 pt-4 flex-wrap justify-end mr-16">
						<button className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-gray-100 text-gray-600 rounded-md hover:bg-gray-200">
							<Eye size={20} /> عرض التفاصيل
						</button>
						<button className="cursor-pointer flex items-center gap-2 px-5 py-3 bg-red-500 text-white rounded-md hover:bg-red-600">
							<Trash2 size={20} /> إزالة من المفضلة
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default FavouritesCards;

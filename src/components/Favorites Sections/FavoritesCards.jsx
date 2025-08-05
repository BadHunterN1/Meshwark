import React from "react";
import { Heart, Eye, Trash2, MapPin } from "lucide-react";

function FavouritesCards() {
	return (
		<div className="text-center container py-12">
			<div className="flex justify-center items-center gap-3 text-4xl font-bold text-black mb-4">
				<Heart size={32} className="text-[var(--main-color)]" />
				<span>المفضلة</span>
			</div>

			<p className="text-2xl text-gray-600 mb-10">
				محطاتك المحفوظة للوصول السريع
			</p>

			{/* الكارت الأول */}
			<div className="relative bg-white rounded-2xl hover:shadow-lg flex flex-col md:flex-row gap-6 p-4 md:p-8 mb-8 max-w-5xl mx-auto text-right">
				<Heart
					size={28}
					className="absolute left-6 top-6 text-[var(--main-color)] fill-[var(--main-color)]"
				/>
				<div className="flex-1 space-y-4 w-full">
					<div className="text-2xl font-semibold text-gray-800">الاستاد</div>
					<div className="md:text-lg text-gray-600">
						محطة الاستاد تُعد من أبرز محطات الميكروباص في المدينة، تقع في موقع
						استراتيجي قريب من الأسواق والمدارس. تتميز بسهولة الوصول إليها وتوفّر
						وسائل نقل متعددة. مناسبة للطلاب والموظفين والركاب اليوميين.
					</div>
					<div className="grid md:grid-cols-2 space-y-2 text-base text-gray-600">
						<div>🏷️ اسم المحطة: محطة الاستاد</div>
						<div>📍 العنوان: شارع الجيش - بجوار اولاد رجب</div>
						<div>🕒 أوقات العمل: من 6 صباحاً حتى 11 مساءً</div>
						<div>🚐 الوجهات: طلخا - جديلة - الجامعه</div>
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
					<div className="text-2xl font-semibold text-gray-800">
						بوابة البارون
					</div>
					<div className="md:text-lg text-gray-600">
						محطة الاستاد تُعد من أبرز محطات الميكروباص في المدينة، تقع في موقع
						استراتيجي قريب من الأسواق والمدارس. تتميز بسهولة الوصول إليها وتوفّر
						وسائل نقل متعددة. مناسبة للطلاب والموظفين والركاب اليوميين.
					</div>
					<div className="grid md:grid-cols-2 space-y-2 text-base text-gray-600">
						<div>🏷️ اسم المحطة: محطة بوابة البارون</div>
						<div>📍 العنوان: شارع الجيش - بجوار حلوني البارون</div>
						<div>🕒 أوقات العمل: من 6 صباحاً حتى 11 مساءً</div>
						<div>🚐 الوجهات: طلخا - جديلة - سندوب</div>
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

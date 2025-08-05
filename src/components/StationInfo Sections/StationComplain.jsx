import Button from "../UI/Button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";

export default function StationComplain() {
	return (
		<div className="flex flex-col sm:flex-row items-center justify-between gap-2 p-6 bg-white rounded-2xl w-full">
			<form className="flex w-full sm:w-1/2 flex-col gap-4">
				<h2 className="text-2xl font-bold">اكتب رأيك عننا</h2>
				<input
					id="email-address"
					name="email"
					type="email"
					required
					placeholder="أدخل بريدك الإلكتروني"
					autoComplete="email"
					className="w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-800 border border-gray-200 focus:border-blue-500 focus:outline-none transition-colors duration-200"
				/>
				<textarea
					name="message"
					id="message"
					placeholder="اكتب رسالتك هنا..."
					rows="4"
					className="w-full rounded-md bg-gray-50 px-3.5 py-2 text-base text-gray-800 border border-gray-200 focus:border-blue-500 focus:outline-none resize-none transition-colors duration-200"></textarea>
				<Button>ارسال</Button>
			</form>
			<div className="w-full sm:w-fit">
				<h2 className="text-2xl font-bold text-gray-800 mb-6">تواصل معنا</h2>
				<div className="space-y-4">
					<div className="flex items-center gap-3">
						<div className="bg-blue-100 p-2 rounded-full">
							<Phone className="w-5 h-5 text-blue-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">الهاتف</p>
							<p className="font-semibold text-gray-800">+20 123 456 7890</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="bg-green-100 p-2 rounded-full">
							<Mail className="w-5 h-5 text-green-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">البريد الإلكتروني</p>
							<p className="font-semibold text-gray-800">info@meshwar.com</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="bg-purple-100 p-2 rounded-full">
							<MapPin className="w-5 h-5 text-purple-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">العنوان</p>
							<p className="font-semibold text-gray-800">جامعة المنصورة مصر</p>
						</div>
					</div>

					<div className="flex items-center gap-3">
						<div className="bg-orange-100 p-2 rounded-full">
							<Clock className="w-5 h-5 text-orange-600" />
						</div>
						<div>
							<p className="text-sm text-gray-600">ساعات العمل</p>
							<p className="font-semibold text-gray-800">
								الأحد - الخميس: 8:00 ص - 6:00 م
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

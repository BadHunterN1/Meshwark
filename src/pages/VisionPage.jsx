import React from "react";
import { Star, Lightbulb, Users, Eye, Zap } from "lucide-react";

export default function Vision() {
	const values = [
		{
			title: "التميّز",
			description:
				"نسعى لتقديم أفضل الخدمات وتحقيق معايير الجودة العالية في كل ما نقوم به",
			icon: <Star className="w-10 h-10 text-white" />,
		},
		{
			title: "الإبداع",
			description:
				"نؤمن بقوة الأفكار المبتكرة والحلول الإبداعية لمواجهة التحديات",
			icon: <Lightbulb className="w-10 h-10 text-white" />,
		},
		{
			title: "التطوير",
			description: "نعمل باستمرار على تطوير خدماتنا وتحسين تجربة المستخدمين",
			icon: <Zap className="w-10 h-10 text-white" />,
		},
		{
			title: "التعاون",
			description: "نبني شراكات قوية ونعمل معاً لتحقيق أهدافنا المشتركة",
			icon: <Users className="w-10 h-10 text-white" />,
		},
	];

	return (
		<>
			<div className="bg-gradient-to-tr from-blue-100 to-green-100 px-4 py-16">
				<div className="container flex flex-col items-center justify-start">
					<h2 className="text-6xl text-blue-400 font-bold mb-20 mt-4">
						رؤيتنا
					</h2>

					<div className="max-w-4xl w-full bg-white shadow-md rounded-xl p-4 md:p-8 flex flex-col-reverse md:flex-row-reverse items-center justify-between gap-4 md:gap-8">
						<div className="text-center md:text-right md:flex-1">
							<p className="text-gray-700 md:text-lg leading-loose">
								نتطلع إلى أن نكون الرائدين في مجال النقل الذكي والمستدام، حيث
								نوفر حلولًا مبتكرة تسهل حياة الناس وتربط المجتمعات ببعضها البعض.
								نسعى لبناء مستقبل أفضل من خلال التكنولوجيا والخدمات المتطورة
								التي تلبي احتياجات عصرنا الحديث.
							</p>
						</div>

						<div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-blue-500 to-green-400 rounded-full mb-4">
							<Eye className="w-10 h-10 text-white" />
						</div>
					</div>
				</div>
			</div>

			<section className="bg-gradient-to-tr from-blue-50 to-green-50 py-20 px-4 text-center">
				<div className="container">
					<h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
						قيمنا الأساسية
					</h2>
					<p className="text-gray-600 text-lg mb-12">
						المبادئ التي نؤمن بها ونسير عليها في رحلتنا نحو التميز
					</p>

					<div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 max-w-7xl mx-auto">
						{values.map((value, index) => (
							<div
								key={index}
								className="bg-white shadow-md rounded-xl flex flex-col items-center text-center p-4 sm:p-5 md:p-6 lg:p-8 xl:p-10
  transition-all duration-300 hover:-translate-y-2 hover:shadow-lg group">
								<div className="inline-flex items-center justify-center w-15 h-15 bg-gradient-to-tr from-blue-500 to-green-400 rounded-full mb-4 transition-transform duration-300 group-hover:scale-110">
									{value.icon}
								</div>
								<h3 className="text-xl font-bold text-blue-400 mb-2">
									{value.title}
								</h3>
								<p className="text-gray-600">{value.description}</p>
							</div>
						))}
					</div>
				</div>
			</section>
			<div className="py-20 px-4 flex flex-col items-center justify-start bg-gradient-to-tr from-blue-100 to-green-100">
				<div className="inline-flex items-center justify-center w-25 h-25 bg-gradient-to-tr from-blue-500 to-green-400 rounded-full mb-4">
					<Star className="w-15 h-15 text-white" />
				</div>
				<h2 className="text-3xl md:text-4xl font-bold text-blue-400 mb-4">
					انضم إلينا في رحلة التميز
				</h2>
				<p className="text-gray-600 text-lg mb-12">
					كن جزءاً من مستقبل النقل الذكي واستمتع بتجربة فريدة تجمع بين الابتكار
					والجودة
				</p>
			</div>
		</>
	);
}

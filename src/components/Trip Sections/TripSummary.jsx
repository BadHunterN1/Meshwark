import React from "react";
import {
  Clock,
  MapPin,
  DollarSign,
  Bookmark,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const TripSummary = () => {
  return (
    <div className="p-4 md:p-6 space-y-6">
      {/* ملخص المسار */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
        <div className="flex justify-between items-start flex-row-reverse">
          <div className="text-end space-y-2">
            <div className="text-gray-800 font-semibold text-lg">مسار الرحلة</div>
            <div className="text-sm text-gray-600 flex items-center justify-end gap-1">
              <span className="cursor-pointer">الجامعة - جيهان</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span>محطة الجامعة الرئيسية</span>
              <MapPin className="w-5 h-5 text-[var(--main-color)] justify-end" />
            </div>
          </div>
          <div className="self-start">
            <button className="text-sm text-gray-600 border px-3 py-1 rounded-md hover:bg-gray-100 flex items-center gap-1">
              <Bookmark className="w-4 h-4" />
              حفظ المسار
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          <div className="flex flex-row-reverse items-center justify-center gap-3 text-end">
            <DollarSign className="w-5 h-5 text-[var(--main-color)]" />
            <div>
              <div className="text-gray-800 font-medium">
                5 <span>جنيه</span>
              </div>
              <div className="text-sm text-gray-500">إجمالي التكلفة</div>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center justify-center gap-3 text-end">
            <MapPin className="w-5 h-5 text-[var(--main-color)]" />
            <div>
              <div className="text-gray-800 font-medium">
                8.5 <span>كم</span>
              </div>
              <div className="text-sm text-gray-500">إجمالي المسافة</div>
            </div>
          </div>

          <div className="flex flex-row-reverse items-center justify-center gap-3 text-end">
            <Clock className="w-5 h-5 text-[var(--main-color)]" />
            <div>
              <div className="text-gray-800 font-medium">
                25 <span>دقيقة</span>
              </div>
              <div className="text-sm text-gray-500">إجمالي الوقت</div>
            </div>
          </div>
        </div>
      </div>

      {/* تنبيه الازدحام */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 flex flex-row-reverse justify-between items-center text-sm">
        <span className="text-end">ازدحام مروري متوقع في منطقة وسط البلد</span>
        <AlertTriangle className="w-4 h-4" />
      </div>

      {/* تفاصيل المحطات */}
      <section className="details space-y-4">
        <h3 className="font-semibold text-2xl leading-none text-end">تفاصيل المسار خطوة بخطوة</h3>

        <div className="max-w-sm rounded overflow-hidden shadow-lg border-2 p-4 bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]">
          <div className="px-6 py-4 text-end">
            <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
            <p className="text-gray-700 text-base">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus
              quia, nulla! Maiores et perferendis eaque, exercitationem praesentium
              nihil.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TripSummary;

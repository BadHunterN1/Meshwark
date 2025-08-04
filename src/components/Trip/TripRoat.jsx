import React from "react";
import {
  Clock,
  MapPin,
  DollarSign,
  Bookmark,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";

const TripRoat = () => {
  return (
    <div className="p-4 md:p-6 space-y-4">
      {/* الكارت الرئيسي */}
      <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
        {/* العنوان + المسار + زر الحفظ */}
        <div className="flex justify-between items-start flex-row-reverse">
          {/* العنوان والمسار */}
          <div className="text-end space-y-2">
            <div className="text-gray-800 font-semibold text-lg">مسار الرحلة</div>

            <div className="text-sm text-gray-600 flex items-center justify-end gap-1">
              <span className="cursor-pointer">الجامعة - جيهان</span>
              <ArrowRight className="w-4 h-4 text-gray-400" />
              <span>محطة الجامعة الرئيسية</span>
              <MapPin className="w-5 h-5 text-[var(--main-color)] justify-end" />
            </div>
          </div>

          {/* زر حفظ المسار */}
          <div className="self-start">
            <button className="text-sm text-gray-600 border px-3 py-1 rounded-md hover:bg-gray-100 flex items-center gap-1">
              <Bookmark className="w-4 h-4" />
              حفظ المسار
            </button>
          </div>
        </div>

        {/* المعلومات الثلاثية: تكلفة - مسافة - وقت */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
          {/* 💰 التكلفة */}
          <div className="flex flex-row-reverse items-center justify-center gap-3 text-end">
            <DollarSign className="w-5 h-5 text-[var(--main-color)]" />
            <div>
              <div className="text-gray-800 font-medium">
                5 <span>جنيه</span>
              </div>
              <div className="text-sm text-gray-500">إجمالي التكلفة</div>
            </div>
          </div>

          {/* 📍 المسافة */}
          <div className="flex flex-row-reverse items-center justify-center gap-3 text-end">
            <MapPin className="w-5 h-5 text-[var(--main-color)]" />
            <div>
              <div className="text-gray-800 font-medium">

               <span>8.5</span>
                 <span>كم</span>
              </div>
              <div className="text-sm text-gray-500">إجمالي المسافة</div>
            </div>
          </div>

          {/* ⏰ الوقت */}
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

      {/* التحذير */}
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 flex flex-row-reverse justify-between items-center text-sm">
        <span className="text-end">ازدحام مروري متوقع في منطقة وسط البلد</span>
        <AlertTriangle className="w-4 h-4" />
      </div>
    </div>
  );
};

export default TripRoat;

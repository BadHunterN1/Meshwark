import React from "react";
import { Clock, MapPin, DollarSign, Bookmark, AlertTriangle, MoveLeft,} from "lucide-react";

const TripSummary = () => {
  return (
    <div  className="p-4 md:p-6 space-y-4">
        <div className="bg-white rounded-xl shadow-sm p-4 space-y-8">
            <div className="flex justify-between items-start flex-wrap gap-3">
                <div className=" space-y-2">
                    <div className="text-gray-800 font-semibold text-lg">مسار الرحلة</div>
                         <div className="text-sm text-gray-600 flex items-center flex-row-reverse gap-1">
                        <span>محطة الجامعة الرئيسية</span>
                        <MoveLeft className="w-4 h-4 text-gray-400"/>
                        <span className="cursor-pointer">الجامعة - جيهان</span>
                        <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                    </div>
                </div>

                <button className="px-3 py-1">
                    <Bookmark className="w-6 h-6" />
                </button>
            </div>
            <div className="flex flex-col  md:flex-row justify-between  ">
                <div className="flex lg:justify-between gap-4 items-center">
                    <Clock className="w-5 h-5 text-[var(--main-color)]" />
                    <div>
                        <div className="text-gray-800 font-medium">
                            <span >٢٥ دقيقة</span>
                        </div>
                        <div className="text-sm text-gray-500">إجمالي الوقت</div>
                    </div>
                </div>

                <div className=" flex lg:justify-between gap-4 items-center ">
                    <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                    <div>
                        <div className="text-gray-800 font-medium">
                            <span >٨٫٥ كم</span>
                        </div>
                        <div className="text-sm text-gray-500">إجمالي المسافة</div>
                    </div>
                </div>
          
                <div className=" flex lg:justify-between gap-4 items-center">
                     <DollarSign  className="w-5 h-5 text-[var(--main-color)]" />
                    <div>
                        <div className="text-gray-800 font-medium">
                            <span>٥ جنيه</span>
                        </div>
                        <div className="text-sm text-gray-500">إجمالي التكلفة</div>
                    </div>
                </div>
            </div>
        </div>
        <div className=" bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 flex flex-row-reverse  justify-between items-center text-sm mt-6">
            <AlertTriangle className="w-4 h-4" />
            <span>ازدحام مروري متوقع في منطقة وسط البلد</span>
        </div>
    </div>
  );
};

export default TripSummary;
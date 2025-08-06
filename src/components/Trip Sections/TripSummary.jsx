import {
    Clock,
    MapPin,
    DollarSign,
    Bookmark,
    AlertTriangle,
    MoveLeft,
} from 'lucide-react';

import React, { useState } from 'react';
const TripSummary = () => {
    const [isFilled, setIsFilled] = useState(false);
    const handleIconClick = () => {
        setIsFilled(!isFilled);
    };

    const BookmarkIconProps = {
        size: 24,
        strokeWidth: 1,
        onClick: handleIconClick,
        style: {
            cursor: 'pointer',
            transition: 'fill 0.2s ease-in-out',
        },
    };
    const defaultColor = 'hsl(213, 98%, 60%)';
    const filledColor = 'hsl(213, 98%, 60%)';

    return (
        <div className="container">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4 mt-5">
                <div className="flex justify-between items-start flex-wrap gap-3">
                    <div className="space-y-2">
                        <div className="text-gray-800 font-semibold text-lg">
                            مسار الرحلة
                        </div>
                        <div className="text-sm text-gray-600 flex items-center flex-row-reverse gap-1">
                            <span>{from?.name}</span>
                            <MoveLeft className="w-4 h-4 text-gray-400" />
                            <span className="cursor-pointer">{to?.name}</span>
                            <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                        </div>
                    </div>

                    <button className="text-gray-500 ">
                        <Bookmark
                            style={{
                                color: isFilled ? 'hsl(213, 98%, 60%)' : 'gray',
                            }}
                            {...BookmarkIconProps}
                            fill={isFilled ? filledColor : 'none'}
                            stroke={isFilled ? 'none' : defaultColor}
                        />
                    </button>
                </div>

                <div className="flex justify-between flex-col md:flex-row">
                    <div className="flex lg:justify-between gap-4 items-center">
                        <Clock className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                <span>٢٥ دقيقة</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                إجمالي الوقت
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:justify-between gap-4 items-center">
                        <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                <span>٨٫٥ كم</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                إجمالي المسافة
                            </div>
                        </div>
                    </div>

                    <div className="flex lg:justify-between gap-4 items-center">
                        <DollarSign className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                <span>٥ جنيه</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                إجمالي التكلفة
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-4 bg-yellow-50 border border-yellow-200 text-yellow-800 rounded-lg p-3 flex gap-4 items-center text-sm">
                <AlertTriangle className="w-4 h-4" />
                <span>ازدحام مروري متوقع في منطقة وسط البلد</span>
            </div>
        </div>
    );
};

export default TripSummary;

import React, { useState } from 'react';
import TrafficAlert from './TraficAlert';
import {
    Clock,
    MapPin,
    DollarSign,
    Bookmark,
    AlertTriangle,
    MoveLeft,
} from 'lucide-react';

const TripSummary = ({ from, to, duration, distance, fee, stops, category }) => {
    console.log("cat: ",category)
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
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-3">
                    <div className=" space-y-2">
                        <div className="text-gray-800 font-semibold text-lg">
                            مسار الرحلة
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                            {stops.map((ele, index) => (
                                <React.Fragment key={index}>
                                    <span className={ele === from.name || ele === to.name ? 'destination-highlight' : ''}>
                                        {ele}
                                    </span>
                                    <MoveLeft className="w-4 h-4 text-gray-400" />
                                </React.Fragment>
                            ))}
                            <span className="cursor-pointer">{to?.name}</span>
                        </div>
                    </div>
                    <button onClick={handleIconClick} className="text-gray-500">
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
                <div className="flex justify-around flex-col md:flex-row">
                    <div className="flex lg:justify-between gap-4 items-center">
                        <Clock className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                <span>{duration} دقيقة</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                إجمالي الوقت
                            </div>
                        </div>
                    </div>

                    <div className=" flex lg:justify-between gap-4 items-center ">
                        <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                <span>{distance} كم</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                إجمالي المسافة
                            </div>
                        </div>
                    </div>

                    <div className=" flex lg:justify-between gap-4 items-center">
                        <DollarSign className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                <span>{fee} جنيه</span>
                            </div>
                            <div className="text-sm text-gray-500">
                                إجمالي التكلفة
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <TrafficAlert category={category} />
        </div>
    );
};

export default TripSummary;

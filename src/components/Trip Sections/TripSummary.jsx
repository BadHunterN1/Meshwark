import React, { useState, useEffect } from 'react';
import {Clock,MapPin,DollarSign,Bookmark, AlertTriangle,MoveLeft,} from 'lucide-react';

const TripSummary = ({ id, from, to, duration, distance, fee, description }) => {
    const [isFilled, setIsFilled] = useState(false);


    useEffect(() => {
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];
        const exists = saved.some(route => route.id === id);
        setIsFilled(exists);
    }, [id]);

    
    const handleIconClick = () => {
        const saved = JSON.parse(localStorage.getItem("favourites")) || [];

        if (isFilled) {
           
            const updated = saved.filter(route => route.id !== id);
            localStorage.setItem("favourites", JSON.stringify(updated));
            setIsFilled(false);
        } else {
           
            const newCard = { id, from, to, duration, distance, fee, description };
            const updated = [...saved, newCard];
            localStorage.setItem("favourites", JSON.stringify(updated));
            setIsFilled(true);
        }
    };

    const defaultColor = 'hsl(213, 98%, 60%)';
    const filledColor = 'hsl(213, 98%, 60%)';

    return (
        <div className="container">
            <div className="bg-white rounded-xl shadow-sm p-4 space-y-4">
                <div className="flex justify-between items-start flex-wrap gap-3">
                    <div className="space-y-2">
                        <div className="text-gray-800 font-semibold text-lg">
                            مسار الرحلة
                        </div>
                        <div className="text-sm text-gray-600 flex items-center gap-1">
                            <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                            <span>{from?.name}</span>
                            <MoveLeft className="w-4 h-4 text-gray-400" />
                            <span className="cursor-pointer">{to?.name}</span>
                        </div>
                    </div>
                    <button onClick={handleIconClick} 
                  className="transition-all duration-300 transform hover:scale-110 hover:rotate-1">
                        <Bookmark
                            style={{
                                color: isFilled ? filledColor : 'gray',
                            }}
                            size={26}
                            strokeWidth={1}
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
                                {duration}
                            </div>
                            <div className="text-sm text-gray-500">إجمالي الوقت</div>
                        </div>
                    </div>

                    <div className="flex lg:justify-between gap-4 items-center">
                        <MapPin className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                {distance} كم
                            </div>
                            <div className="text-sm text-gray-500">إجمالي المسافة</div>
                        </div>
                    </div>

                    <div className="flex lg:justify-between gap-4 items-center">
                        <DollarSign className="w-5 h-5 text-[var(--main-color)]" />
                        <div>
                            <div className="text-gray-800 font-medium">
                                {fee} جنيه
                            </div>
                            <div className="text-sm text-gray-500">إجمالي التكلفة</div>
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

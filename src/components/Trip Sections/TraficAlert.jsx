import { AlertTriangle } from 'lucide-react';

function TrafficAlert({ category }) {
    let message = '';
    let bgColor = '';
    let borderColor = '';
    let textColor = '';

    switch (category) {
        case 'سريعة':
            message = 'الطريق سريعة ومن المتوقع أن تكون الحركة سلسة';
            bgColor = 'bg-green-50';
            borderColor = 'border-green-200';
            textColor = 'text-green-800';
            break;

        case 'داخلية':
            message = 'قد يكون هناك بعض الازدحام المروري في المناطق الداخلية';
            bgColor = 'bg-yellow-50';
            borderColor = 'border-yellow-200';
            textColor = 'text-yellow-800';
            break;

        case 'ريفية':
            message = 'الطريق ريفية وقد تكون بطيئة بسبب تضاريس الطريق';
            bgColor = 'bg-red-50';
            borderColor = 'border-red-200';
            textColor = 'text-red-800';
            break;

        default:
            message = 'معلومات عن حالة المرور غير متوفرة';
            bgColor = 'bg-gray-50';
            borderColor = 'border-gray-200';
            textColor = 'text-gray-800';
    }

    return (
        <div
            className={`${bgColor} ${borderColor} ${textColor} rounded-lg p-3 flex gap-4 items-center text-sm border mt-6`}
        >
            <AlertTriangle className="w-5 h-5" />
            <span>{message}</span>
        </div>
    );
}

export default TrafficAlert;
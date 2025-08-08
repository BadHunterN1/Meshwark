import { Footprints, MapPin, Bus } from 'lucide-react';
import Button from '../UI/Button';
// import { useNavigate } from 'react-router-dom';

export default function TripDetails(props) {
    const { from, to, crossStations } = props;
    // const navigate = useNavigate();

    // const handleNavigateMap = () => {
    //     navigate(`/trip/${from}/${to}/map`);
    // };

    return (
        <section className="container p-2">
            <div className="shadow-2xl p-2 rounded-2xl">
                <h3 className="font-semibold text-xl md:text-2xl leading-none p-6">
                    تفاصيل المسار خطوة بخطوة
                </h3>
                <div className="flex flex-row gap-4">
                    {/* Uncomment to enable map button */}
                    {/* <Button onClick={handleNavigateMap}>
                        <MapPin />
                        عرض على الخريطة
                    </Button> */}
                </div>

                <Box from={from} active num={1} />
                <Box to={to} crossStations={crossStations} num={2} />
                <Box to={to} active num={3} />
            </div>
        </section>
    );
}

const Box = ({ from, to, crossStations, active, num }) => {
    return (
        <div
            className={`box my-4 overflow-hidden border-2 rounded-2xl p-2 ${active
                    ? 'bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]'
                    : 'border-[#eaeef6] bg-[#eaeef6]/20'
                }`}
        >
            <div className="sm:m-auto px-4 py-4 flex flex-col sm:flex-row items-start gap-4">
                <div
                    className={`sm:flex-row w-12 h-12 rounded-full bg-white border-2 border-[var(--main-color)] flex items-center justify-center text-[var(--main-color)]`}
                >
                    {active ? <Footprints className="w-20" /> : <Bus className="w-20" />}
                </div>
                <div>
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="inline-flex items-center rounded-full border border-gray-300 px-2.5 py-0.5 text-xs font-semibold">
                            {active ? 'مشي' : 'ميكروباص'}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-0.5 text-sm text-gray-400">
                            الخطوة {num}
                        </span>
                    </div>
                    <h3 className="font-bold flex flex-wrap items-center gap-2 mb-2">
                        {num === 1 && active && 'اذهب إلى موقف '}
                        {num === 2 && !active && 'اركب ميكروباص إلى '}
                        {num === 3 && 'انزل عند '}
                        {num === 3 ? to : num === 1 ? from : to}
                    </h3>


                    {!active && crossStations?.length > 0 && (
                        <>
                            <h3 className="font-semibold flex flex-wrap items-center gap-2 py-2">
                                المحطات في الطريق:
                            </h3>
                            <div className="flex gap-2 flex-wrap">
                                {crossStations.map((stationName, index) => (
                                    <span
                                        key={index}
                                        className="text-xs inline-flex items-center rounded-full text-white px-2.5 py-0.5 font-semibold bg-[var(--secondary-color)]"
                                    >
                                        {typeof stationName === 'string'
                                            ? stationName
                                            : stationName.station?.name || stationName.name}
                                    </span>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

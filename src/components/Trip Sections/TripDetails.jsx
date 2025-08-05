import { Footprints, MapPin, Bus, Star } from 'lucide-react';
import Button from '../UI/Button';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../../utils/http';

export default function TripDetails({ from, to }) {
    const {
        data: destinationsData,
        // isLoading: governoratesLoading,
        // error: destinationsDataError,
    } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => fetchDocument('destinations', 'mansoura'),
    });

    const stations = destinationsData?.microbuses?.destinations;

    const selectedStation = (stations || []).find(
        stationObj =>
            stationObj?.station?.fromTo?.from?.name === from &&
            stationObj?.station?.fromTo?.to?.name === to
    )?.station;
    return (
        <section className="p-4">
            <div className="container  p-4 shadow-2xl rounded-2xl ">
                <h3 className="font-semibold  text-xl md:text-2xl leading-none p-6 ">
                    تفاصيل المسار خطوة بخطوة
                </h3>
                <Box from={from} active num={1} />
                <Box
                    to={to}
                    crossStations={selectedStation.crossStations}
                    num={2}
                    stations={stations}
                />
                <Box active num={3} />
            </div>
            <div className="container ">
                <div className="mt-8 flex flex-row gap-4 ">
                    <Button>
                        <MapPin />
                        عرض على الخريطة
                    </Button>
                </div>
            </div>
        </section>
    );
}

const Box = ({ from, to, crossStations, active, num }) => {
    return (
        <>
            <div
                className={`box my-4   overflow-hidden  border-2 rounded-2xl  p-2  ${
                    active
                        ? 'bg-[var(--secondary-color)]/20 border-[var(--secondary-color)]'
                        : 'border-[#eaeef6] bg-[#eaeef6]/20'
                } `}
            >
                <div className="sm:m-auto px-4 py-4 flex flex-col sm:flex-row items-start gap-4  ">
                    <div
                        className={`sm:flex-row  w-12 h-12 rounded-full bg-white border-2 border-[var(--main-color)] flex items-center justify-center text-[var(--main-color)]  `}
                    >
                        {active ? (
                            <Footprints className=" w-20" />
                        ) : (
                            <Bus className="w-20" />
                        )}
                    </div>
                    <div className="">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center rounded-full border border-gray-300  px-2.5 py-0.5 text-xs font-semibold">
                                {active ? 'مشي' : 'ميكروباص'}
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 text-sm text-gray-400">
                                الخطوة {num}
                            </span>
                        </div>
                        <h3 className="font-bold flex flex-wrap items-center gap-2 mb-2">
                            {active ? 'امشِ' : 'اركب ميكروباص'} إلى{' '}
                            {num === 3
                                ? 'الوجهة النهائية'
                                : num === 1
                                  ? `محطة ${from}`
                                  : `محطة ${to}`}
                        </h3>

                        <div>
                            {active ? null : (
                                <>
                                    <h3 className="font-semibold flex flex-wrap items-center gap-2  py-2   ">
                                        المحطات في الطريق:
                                    </h3>
                                    <div className="flex  gap-2 flex-wrap">
                                        {crossStations?.map(
                                            (stationObj, index) => (
                                                <span
                                                    key={index}
                                                    className="text-xs inline-flex items-center rounded-full text-white px-2.5 py-0.5 font-semibold bg-[var(--secondary-color)]"
                                                >
                                                    {stationObj.station.name}
                                                </span>
                                            )
                                        )}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

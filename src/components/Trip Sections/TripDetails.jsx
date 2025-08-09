import { MapPin, Bus, ArrowDown, ArrowDownCircleIcon } from 'lucide-react';
import Button from '../UI/Button';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../../utils/http';
import { useNavigate } from 'react-router-dom';

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
            stationObj?.from?.name === from && stationObj?.to?.name === to
    );

    return (
        <section className="container p-2">
            <div className="shadow-2xl p-2 rounded-2xl ">
                <h3 className="font-semibold  text-xl md:text-2xl leading-none p-6 ">
                    تفاصيل المسار خطوة بخطوة
                </h3>
                {selectedStation.crossStations?.map((station, index, arr) => {
                    const nextStation =
                        index < arr.length - 1 ? arr[index + 1]?.station : null;
                    return (
                        <Box
                            key={index}
                            fromTo={{ from, to }}
                            station={station?.station}
                            nextStation={nextStation}
                            num={index + 1}
                            lastStep={arr.length}
                        />
                    );
                })}
            </div>
        </section>
    );
}

const Box = ({ station, fromTo, num, lastStep, nextStation }) => {
    const navigate = useNavigate();

    const handleNavigateMap = () => {
        const baseUrl = `/trip/${fromTo.from}/${fromTo.to}/map/${station.coords?.latitude}/${station.coords?.longitude}`;
        const nextStationUrl = nextStation
            ? `/${nextStation.coords?.latitude}/${nextStation.coords?.longitude}`
            : '';
        navigate(`${baseUrl}${nextStationUrl}/${num}`);
    };
    return (
        <>
            <div
                className={`box my-4 overflow-hidden  border-2 rounded-2xl  p-2 
                        border-[#eaeef6] bg-[#eaeef6]/20`}
            >
                <div className="sm:m-auto px-4 py-4 flex flex-col sm:flex-row items-start gap-4  ">
                    <div
                        className={`sm:flex-row w-12 h-12 rounded-full bg-white border-2 border-[var(--main-color)] flex items-center justify-center text-[var(--main-color)]`}
                    >
                        <Bus className="w-20" />
                    </div>
                    <div>
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="inline-flex items-center rounded-full border border-gray-300  px-2.5 py-0.5 text-xs font-semibold">
                                مواصلات
                            </span>
                            <span className="inline-flex items-center px-2.5 py-0.5 text-sm text-gray-400">
                                الخطوة {num}
                            </span>
                        </div>
                        <h3 className="font-bold flex flex-wrap items-center gap-2 mb-2">
                            {num === lastStep
                                ? `انت الان في ${station.name} لقد وصلت وجهتك النهائيه`
                                : num > 1
                                  ? `انت الان في ${station.name} اركب منه للموقف القادم (${nextStation.name})`
                                  : `اذهب الي ${station.name} و اركب منه للموقف القادم (${nextStation.name})`}
                        </h3>
                        {num === lastStep ? null : (
                            <p className="bg-[var(--secondary-color)] text-sm w-fit p-2 rounded-2xl">
                                افتح الخريطة للمزيد من التفاصيل{' '}
                                <ArrowDownCircleIcon
                                    className="inline text-[var(--main-color)]"
                                    size={20}
                                />
                            </p>
                        )}
                    </div>
                </div>
                {/* {num === lastStep ? null : (
                    // <Button onClick={handleNavigateMap}>
                    //     <MapPin />
                    //     عرض على الخريطة
                    // </Button>
                )} */}
            </div>
        </>
    );
};

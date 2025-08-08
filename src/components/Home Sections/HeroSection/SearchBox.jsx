import { useMemo, useState } from 'react';
import { SearchIcon } from '../../../assets/Images/Icons';
import InputField from './InputField';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../../../utils/http';
import { useNavigate } from 'react-router-dom';
function SearchBox() {
    const navigate = useNavigate();
    const [selectedOptions, setSelectedOptions] = useState({
        from: null,
        to: null,
    });

    console.log(selectedOptions);

    const handleNavigation = () => {
        navigate(`/trip/${selectedOptions.from}/${selectedOptions.to}`);
    };

    const handleChange = (value, type) => {
        setSelectedOptions(prev => ({
            ...prev,
            [type]: value || null,
        }));
    };

    const {
        data: destinationsData,
        isLoading: destinationsLoading,
        error: destinationsError,
    } = useQuery({
        queryKey: ['destinations'],
        queryFn: () => fetchDocument('destinations', 'mansoura'),
    });

    const uniqueDestinations = useMemo(() => {
        if (!destinationsData) {
            return { uniqueFrom: [], uniqueTo: [] };
        }

        const stations = destinationsData?.microbuses?.destinations;

        if (!stations || !Array.isArray(stations)) {
            return { uniqueFrom: [], uniqueTo: [] };
        }

        const uniqueFrom = new Map();
        const uniqueTo = new Map();

        stations.forEach(stationObj => {
            if (stationObj.from?.name && stationObj.to?.name) {
                if (!uniqueFrom.has(stationObj.from.name)) {
                    uniqueFrom.set(stationObj.from.name, {
                        ...stationObj.from,
                    });
                }
                if (!uniqueTo.has(stationObj.to.name)) {
                    uniqueTo.set(stationObj.to.name, { ...stationObj.to });
                }
            }
        });

        return {
            uniqueFrom: Array.from(uniqueFrom.values()),
            uniqueTo: Array.from(uniqueTo.values()),
        };
    }, [destinationsData]);

    const isFromValid = selectedOptions.from;
    const isToValid = selectedOptions.to;
    const isFormValid = isFromValid && isToValid;

    console.log(uniqueDestinations);

    return (
        <div className="search-box p-5 bg-(--glass-bg) rounded-2xl max-lg:w-[80%]">
            <form>
                <div className="search-inputs mb-6 flex flex-col md:flex-row gap-4">
                    <InputField
                        station={selectedOptions.from}
                        setStation={handleChange}
                        p="من؟"
                        name="from"
                        placeHolder="المنصورة"
                        destination={uniqueDestinations.uniqueFrom}
                        isDisabled={destinationsLoading || destinationsError}
                    />
                    <InputField
                        station={selectedOptions.to}
                        setStation={handleChange}
                        p="الي؟"
                        placeHolder="طنطا"
                        name="to"
                        destination={uniqueDestinations.uniqueTo}
                        isDisabled={destinationsLoading || destinationsError}
                    />
                </div>
                <button
                    onClick={handleNavigation}
                    disabled={!isFormValid}
                    className="search disabled:opacity-50 disabled:cursor-not-allowed w-full disabled:opacity-30 flex items-center justify-center bg-[var(--hero-button-main-color)] rounded-md px-[5px] py-[10px] font-bold cursor-pointer transition duration-500 hover:scale-[1.05] hover:bg-[var(--hero-button-glow-color)]"
                >
                    <SearchIcon className="search-icon" />
                    <span>ابحث عن افضل طريق</span>
                </button>
                <p
                    className={`text-center font-bold text-lg pt-2 ${destinationsError ? 'text-red-700' : null}`}
                >
                    {destinationsLoading
                        ? 'جاري تحميل المحطات'
                        : destinationsError
                          ? 'لم نستطع تحميل المحطات الرجاء المحاولة مره اخري'
                          : !isFromValid && !isToValid
                            ? 'الرجاء اختيار المحطات من قائمة الاختيارات'
                            : !isFromValid
                              ? 'الرجاء اختيار محطة من'
                              : !isToValid
                                ? 'الرجاء اختيار محطة الي'
                                : null}
                </p>
            </form>
        </div>
    );
}

export default SearchBox;

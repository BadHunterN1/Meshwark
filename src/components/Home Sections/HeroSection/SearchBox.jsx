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
            const fromTo = stationObj?.station?.fromTo;

            if (
                fromTo &&
                typeof fromTo === 'object' &&
                fromTo.from?.name &&
                fromTo.to?.name
            ) {
                if (!uniqueFrom.has(fromTo.from.name)) {
                    uniqueFrom.set(fromTo.from.name, { ...fromTo.from });
                }
                if (!uniqueTo.has(fromTo.to.name)) {
                    uniqueTo.set(fromTo.to.name, { ...fromTo.to });
                }
            }
        });

        return {
            uniqueFrom: Array.from(uniqueFrom.values()),
            uniqueTo: Array.from(uniqueTo.values()),
        };
    }, [destinationsData]);

    const isFromValid =
        selectedOptions.from &&
        uniqueDestinations.uniqueFrom.some(
            dest => dest.name === selectedOptions.from
        );
    const isToValid =
        selectedOptions.to &&
        uniqueDestinations.uniqueTo.some(
            dest => dest.name === selectedOptions.to
        );
    const isFormValid = isFromValid && isToValid;

    console.log(uniqueDestinations);

    return (
        <div className="search-box">
            <form>
                <div className="search-inputs">
                    <InputField
                        station={selectedOptions.from}
                        setStation={handleChange}
                        p="من؟"
                        name="from"
                        destination={uniqueDestinations.uniqueFrom}
                        isDisabled={destinationsLoading || destinationsError}
                    />
                    <InputField
                        station={selectedOptions.to}
                        setStation={handleChange}
                        p="الي؟"
                        name="to"
                        destination={uniqueDestinations.uniqueTo}
                        isDisabled={destinationsLoading || destinationsError}
                    />
                </div>
                <button
                    onClick={handleNavigation}
                    disabled={!isFormValid}
                    className="search disabled:opacity-50 disabled:cursor-not-allowed"
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
                          : null}
                </p>
            </form>
        </div>
    );
}

export default SearchBox;

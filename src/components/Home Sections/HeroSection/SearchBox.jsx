import { useState } from 'react';
import { SearchIcon } from '../../../assets/Images/Icons';
import InputField from './InputField';
function SearchBox() {
    const [fromStation, setFromStation] = useState();
    const [toStation, setToStation] = useState();
    console.log(fromStation);
    console.log(toStation);

    return (
        <div className="search-box p-5 bg-(--glass-bg) rounded-2xl max-lg:w-[80%]">
            <form>
                <div className="search-inputs mb-6 max-lg:flex-col">
                    <InputField
                        staion={fromStation}
                        setStation={setFromStation}
                        p="من؟"
                        name="from"
                    />
                    <InputField
                        staion={toStation}
                        setStation={setToStation}
                        p="الي؟"
                        name="to"
                    />
                </div>
                <button className="w-full flex items-center justify-center bg-[var(--hero-button-main-color)] rounded-md px-[5px] py-[10px] font-bold cursor-pointer transition duration-500 hover:scale-[1.05] hover:bg-[var(--hero-button-glow-color)]">
                    <SearchIcon className="search-icon" />
                    <span>ابحث عن افضل طريق</span>
                </button>
            </form>
        </div>
    );
}

export default SearchBox;

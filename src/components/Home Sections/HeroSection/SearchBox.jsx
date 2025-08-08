import { useEffect, useState, useContext } from 'react';
import { SearchIcon } from '../../../assets/Images/Icons';
import InputField from './InputField';
import { useQuery } from '@tanstack/react-query';
import { fetchDocument } from '../../../utils/http';
import { useNavigate } from 'react-router-dom';
function SearchBox() {
    function handleClick(e) {
        e.preventDefault()
    }
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/trip`);
    };
    return (
        <div className="search-box p-5 bg-(--glass-bg) rounded-2xl max-lg:w-[80%]">
            <form>
                <div className="search-inputs mb-6 flex flex-col md:flex-row gap-4">
                    <InputField
                        p="من؟"
                        name="from"
                        placeHolder="المنصورة"
                    />
                    <InputField
                        p="الي؟"
                        placeHolder="طنطا"
                        name="to"
                    />
                </div>
                <button
                    onClick={handleClick}
                    className="search w-full flex items-center justify-center bg-[var(--hero-button-main-color)] rounded-md px-[5px] py-[10px] font-bold cursor-pointer transition duration-500 hover:scale-[1.05] hover:bg-[var(--hero-button-glow-color)]"
                >
                    <SearchIcon className="search-icon" />
                    <span>ابحث عن افضل طريق</span>
                </button>
                <p
                    className={`text - center font-bold text-lg pt-2 text-red-700`}
                >
            </p>
        </form>
        </div >
    );
}

export default SearchBox;
import { useEffect, useState } from 'react';
import { SearchIcon } from '../../../assets/Images/Icons';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../assets/data/paths';

function SearchBox() {
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [warning, setWarning] = useState('');
    const [pathsData, setPathsData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);
    const [activeField, setActiveField] = useState('');

    useEffect(() => {
        setPathsData(paths.mansoura);
    }, []);

    function handleClick(e) {
        e.preventDefault();
        formValidation();
    }

    function formValidation() {
        if (from.length < 2 || to.length < 2) {
            setWarning('من فصلك اكتب اكثر من حرفين');
        } else {
            setWarning('جاري البحث عن المسار...');
            searchForPath();
        }
    }

    function searchForPath() {
        let found = false;
        for (let i = 0; i < pathsData.length; i++) {
            if (pathsData[i].from === from && pathsData[i].to === to) {
                console.log(pathsData[i]);
                found = true;
                break;
            } else if (pathsData[i].from === to && pathsData[i].to === from) {
                console.log('reverse', pathsData[i]);
                found = true;
                break;
            } else if (from === pathsData[i].from || from === pathsData[i].to) {
                let otherStops = pathsData[i].stops;
                for(let j = 0; j < otherStops.length; j++) {
                    if (otherStops[j] === pathsData[i].from) {
                        found = true;
                        console.log("(to) founded in other stops");
                        console.log(pathsData[i]);
                        break;
                    } else if (otherStops[j] === pathsData[i].to) {
                        found = true;
                        console.log("(to) founded in other stops reverse");
                        console.log(pathsData[i]);
                        break;
                    }
                }
                if(found) {
                    break;
                }
            }
        }
        if (!found) {
            setWarning('المسار الذي تبحث عنه غير موجود حاليا');
        }
    }

    // Filtering suggestions
    function handleInputChange(value, setValue) {
        setValue(value);
        if (value.length > 0) {
            const matches = [
                ...new Set(
                    pathsData
                        .flatMap(p => [p.from, p.to])
                        .filter(name => name.includes(value))
                )
            ];
            setSuggestions(matches);
        } else {
            setSuggestions([]);
        }
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
                        value={from}
                        onChange={(e) => handleInputChange(e.target.value, setFrom)}
                        onFocus={() => setActiveField('from')}
                        suggestions={activeField === 'from' ? suggestions : []}
                        onSuggestionClick={(s) => {
                            setFrom(s);
                            setSuggestions([]);
                        }}
                    />

                    <InputField
                        p="الي؟"
                        name="to"
                        placeHolder="طنطا"
                        value={to}
                        onChange={(e) => handleInputChange(e.target.value, setTo)}
                        onFocus={() => setActiveField('to')}
                        suggestions={activeField === 'to' ? suggestions : []}
                        onSuggestionClick={(s) => {
                            setTo(s);
                            setSuggestions([]);
                        }}
                    />
                </div>

                <button
                    onClick={handleClick}
                    className="search w-full flex items-center justify-center bg-[var(--hero-button-main-color)] rounded-md px-[5px] py-[10px] font-bold cursor-pointer transition duration-500 hover:scale-[1.05] hover:bg-[var(--hero-button-glow-color)]"
                >
                    <SearchIcon className="search-icon" />
                    <span>ابحث عن افضل طريق</span>
                </button>

                <p className="warn text-center font-bold text-lg pt-2 text-red-700">
                    {warning}
                </p>
            </form>
        </div>
    );
}

export default SearchBox;

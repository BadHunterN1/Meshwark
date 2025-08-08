import { useEffect, useState, useContext } from 'react';
import { SearchIcon } from '../../../assets/Images/Icons';
import InputField from './InputField';
import { useNavigate } from 'react-router-dom';
import { paths } from '../../../assets/data/paths';
function SearchBox() {
    // Define Variables 
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [warning, setWarning] = useState('');
    const [pathsData, setPathsData] = useState([]);
    const [suggestions, setSuggestions] = useState([]);

    // Load Paths
    useEffect(function() {
        setPathsData(paths.mansoura);
    },[])

    function handleClick(e) {
        e.preventDefault()
        formValidation();
    }
    
    function formValidation() {
        console.log(from, to)
        if(from.length < 2 || to.length < 2) {
            setWarning("من فصلك اكتب اكثر من حرفين");
        }else {
            setWarning("جاري البحث عن المسار...");
            searchForPath();
        }
    }
    function searchForPath() {
        for(let i = 0; i< pathsData.length; i++) {
            if(pathsData[i].from === from && pathsData[i].to === to) {
                console.log(pathsData[i]);
                break;
            } else if (pathsData[i].from === to && pathsData[i].to === from) {
                console.log("reverse", pathsData[i]);
                break;
            }else {
                setWarning("المسار الذي تبحث عنه غير موجود حاليا");
            }
        }
    }
    function showSuggestions() {

    }
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate(`/trip`);
    };
    return (
        <div className="search-box p-5 bg-(--glass-bg) rounded-2xl max-lg:w-[80%]">
            <form>
                <div className="search-inputs mb-6 flex flex-col md:flex-row gap-4">
                    <label>
                        <InputField
                            p="من؟"
                            name="from"
                            placeHolder="المنصورة"
                            value={from}
                            onChange={(e) => setFrom(e.target.value)}
                        />
                    </label>
                    <label>
                        <InputField
                            p="الي؟"
                            placeHolder="طنطا"
                            name="to"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                        />
                        
                    </label>
                </div>
                <button
                    onClick={handleClick}
                    className="search w-full flex items-center justify-center bg-[var(--hero-button-main-color)] rounded-md px-[5px] py-[10px] font-bold cursor-pointer transition duration-500 hover:scale-[1.05] hover:bg-[var(--hero-button-glow-color)]"
                >
                    <SearchIcon className="search-icon" />
                    <span>ابحث عن افضل طريق</span>
                </button>
                <p
                    className={`warn text-center font-bold text-lg pt-2 text-red-700`}
                >
                    {warning}
            </p>
        </form>
        </div >
    );
}

export default SearchBox;
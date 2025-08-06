import { SearchIcon } from "../../../assets/Images/Icons";
import InputField from "./InputField";
function SearchBox() {
    return (
        <div className="search-box">
            <form>
                <div className="search-inputs">
                    <InputField p="من؟" name="from" />
                    <InputField p="الي؟" name="to" />
                </div>
                        <button>
                            <SearchIcon className="search-icon" />
                            <span>
                                ابحث عن افضل طريق
                            </span>
                        </button>
            </form>
        </div>
    )
}

export default SearchBox;